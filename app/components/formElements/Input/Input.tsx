import { RefObject } from "react";

export enum InputType {
  TEXT = "text",
  NUMBER = "number",
}

interface InputProps {
  type: InputType;
  name: string;
  id: string;
  placeholder?: string;
  reference?: RefObject<HTMLInputElement>;
  defaultValue?: string | number;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;

  // Input number props
  minValue?: number;
}
const Input = ({
  type,
  name,
  id,
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
      id={id}
      className="block w-full p-2 text-black leading-none border-1"
      ref={reference}
      placeholder={placeholder}
      min={minValue}
      defaultValue={defaultValue}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export { Input };
