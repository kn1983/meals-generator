import { RefObject } from "react";

interface InputProps {
  name: string;
  id: string;
  placeholder?: string;
  reference?: RefObject<HTMLInputElement>;
}
const Input = ({ name, id, placeholder, reference }: InputProps) => {
  return (
    <input
      type="text"
      name={name}
      id={id}
      className="block w-full p-2 text-black leading-none border-1"
      ref={reference}
      placeholder={placeholder}
    />
  );
};

export { Input };
