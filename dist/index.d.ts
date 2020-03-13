/// <reference types="react" />
export declare type InputEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>;
export declare type InputEventHandler = (ev: InputEvent) => void;
export declare type DebouncedCallback = (value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => void | Promise<void>;
export declare type InputDebounceOptions = {
    delay?: number;
    handleInput?: (ev: InputEvent) => void | Promise<void>;
    initialValue?: string;
    trim?: boolean;
    requireUnique?: boolean;
    requireValue?: boolean;
};
export declare const useInputDebounce: (debouncedCallback: DebouncedCallback, { delay, handleInput, initialValue, trim, requireUnique, requireValue, }?: InputDebounceOptions) => [string, InputEventHandler, boolean, import("react").Dispatch<import("react").SetStateAction<string>>];
export default useInputDebounce;
