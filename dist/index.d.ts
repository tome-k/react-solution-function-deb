/// <reference types="react" />
export declare type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
declare type ChangeEventHandler = (ev: ChangeEvent) => void;
declare type DebouncedCallback = (value?: string, setValue?: React.Dispatch<React.SetStateAction<string>>) => void | Promise<void>;
export declare type InputDebounceOptions = {
    delay?: number;
    handleChange?: (ev: ChangeEvent) => void | Promise<void>;
    initialValue?: string;
    trim?: boolean;
    requireUnique?: boolean;
    requireValue?: boolean;
};
export declare const useInputDebounce: (debouncedCallback: DebouncedCallback, { delay, handleChange, initialValue, trim, requireUnique, requireValue, }?: InputDebounceOptions) => [string, ChangeEventHandler, boolean, import("react").Dispatch<import("react").SetStateAction<string>>];
export default useInputDebounce;
