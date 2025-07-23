// Event Handler Types
export type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type InputBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => void;
export type TextAreaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type FormSubmitHandler = (e: React.FormEvent) => void;
export type ClickHandler = () => void;