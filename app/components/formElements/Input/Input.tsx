import { KeyboardEventHandler, RefObject } from "react";

export enum InputType {
  TEXT = "text",
  NUMBER = "number",
}

interface InputProps {
  type: InputType;
  name: string;
  placeholder?: string;
  reference?: RefObject<HTMLInputElement>;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined;

  // Input number props
  minValue?: number;
}
const Input = ({
  type,
  name,
  placeholder,
  reference,
  minValue,
  defaultValue,
  onKeyDown,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      name={name}
      id={name}
      className="block w-full p-2 text-black leading-none border-1 rounded"
      ref={reference}
      placeholder={placeholder}
      min={minValue}
      defaultValue={defaultValue}
      onKeyDown={onKeyDown}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export { Input };
