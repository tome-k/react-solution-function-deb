import { useCallback, useEffect, useRef, useState } from 'react';
const defaultDelay = 800;
export const useInputDebounce = (debouncedCallback, { delay = defaultDelay, handleInput, initialValue = '', trim = true, requireUnique = false, requireValue = false, } = {}) => {
    const [isChanging, setIsChanging] = useState(false);
    const [value, setValue] = useState(initialValue);
    const previousValueRef = useRef(initialValue);
    const timerIdRef = useRef(0);
    const onInput = useCallback(ev => {
        setIsChanging(true);
        const { target: { value: rawValue } } = ev;
        const value = trim ? rawValue.trim() : rawValue;
        setValue(rawValue);
        if (typeof handleInput === 'function') {
            ev.persist();
            handleInput(ev);
        }
        if (typeof debouncedCallback === 'function') {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = setTimeout(() => {
                setIsChanging(false);
                if ((!requireUnique || value !== previousValueRef.current)
                    && (!requireValue || value !== ''))
                    debouncedCallback(value, setValue);
                if (!requireValue || value !== '')
                    previousValueRef.current = value;
            }, delay);
        }
    }, [
        debouncedCallback,
        delay,
        handleInput,
        requireUnique,
        requireValue,
        trim,
    ]);
    useEffect(() => () => clearTimeout(timerIdRef.current), []);
    return [value, onInput, isChanging, setValue];
};
export default useInputDebounce;
