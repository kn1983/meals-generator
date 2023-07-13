import { RefObject } from "react";

export interface SelectListItemProps {
  value: string;
  key: string;
  text: string;
}

interface SelectProps {
  items: SelectListItemProps[];
  id: string;
  name: string;
  reference?: RefObject<HTMLSelectElement>;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select = ({
  items,
  id,
  name,
  reference,
  defaultValue,
  onChange,
}: SelectProps) => {
  {
    items.length == 0 && null;
  }
  return (
    <select
      id={id}
      name={name}
      className="bg-blue-800 block p-2 leading-none"
      ref={reference}
      defaultValue={defaultValue}
      onChange={onChange}
    >
      {items.map((item) => {
        return (
          <option value={item.value} key={item.key}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
};

export { Select };
