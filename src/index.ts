import {useCallback, useEffect, useRef, useState} from 'react';

export type ChangeEvent =
  React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;

export type ChangeEventHandler = (ev: ChangeEvent) => void;

export type DebouncedCallback = (
  value: string,
  setValue: React.Dispatch<React.SetStateAction<string>>,
) => void | Promise<void>;

export type InputDebounceOptions = {
  delay?: number;
  handleChange?: (ev: ChangeEvent) => void | Promise<void>;
  initialValue?: string;
  trim?: boolean;
  requireUnique?: boolean;
  requireValue?: boolean;
};

const defaultDelay = 800;

export const useInputDebounce = (
  debouncedCallback: DebouncedCallback,
  {
    delay = defaultDelay,
    handleChange,
    initialValue = '',
    trim = true,
    requireUnique = false,
    requireValue = false,
  }: InputDebounceOptions = {} as InputDebounceOptions,
): [
  string,
  ChangeEventHandler,
  boolean,
  React.Dispatch<React.SetStateAction<string>>,
] => {
  const [isChanging, setIsChanging] = useState(false);
  const [value, setValue] = useState(initialValue);
  const previousValueRef = useRef(initialValue);
  const timerIdRef = useRef(0);

  const onChange: ChangeEventHandler = useCallback(ev => {
    setIsChanging(true);
    const {target: {value: rawValue}} = ev;
    const value = trim ? rawValue.trim() : rawValue;
    setValue(rawValue);
    if (typeof handleChange === 'function') {
      ev.persist();
      handleChange(ev);
    }
    if (typeof debouncedCallback === 'function') {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = setTimeout(() => {
        setIsChanging(false);
        if (
          (!requireUnique || value !== previousValueRef.current)
          && (!requireValue || value !== '')
        ) debouncedCallback(value, setValue);
        if (!requireValue || value !== '') previousValueRef.current = value;
      }, delay);
    }
  }, [
    debouncedCallback,
    delay,
    handleChange,
    requireUnique,
    requireValue,
    trim,
  ]);

  useEffect(() => (): void => clearTimeout(timerIdRef.current), []);

  return [value, onChange, isChanging, setValue];
};

export default useInputDebounce;
