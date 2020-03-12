import { useCallback, useEffect, useRef, useState } from 'react';
const defaultDelay = 800;
export const useInputDebounce = (debouncedCallback, { delay = defaultDelay, handleChange, initialValue = '', trim = true, requireUnique = false, requireValue = false, } = {}) => {
    const [isChanging, setIsChanging] = useState(false);
    const [value, setValue] = useState(initialValue);
    const previousValueRef = useRef(initialValue);
    const timerIdRef = useRef(0);
    const onChange = useCallback(ev => {
        setIsChanging(true);
        const { target: { value: rawValue } } = ev;
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
        handleChange,
        requireUnique,
        requireValue,
        trim,
    ]);
    useEffect(() => () => clearTimeout(timerIdRef.current), []);
    return [value, onChange, isChanging, setValue];
};
export default useInputDebounce;
