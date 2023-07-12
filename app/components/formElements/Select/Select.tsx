import { RefObject } from "react";

export interface SelectListItemProps {
  value: string;
  key: string;
  text: string;
  selected?: boolean;
}

interface SelectProps {
  items: SelectListItemProps[];
  id: string;
  name: string;
  reference?: RefObject<HTMLSelectElement>;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
const Select = ({ items, id, name, reference, onChange }: SelectProps) => {
  {
    items.length == 0 && null;
  }
  return (
    <select
      id={id}
      name={name}
      className="bg-blue-800 block p-2 leading-none"
      ref={reference}
      onChange={onChange}
    >
      {items.map((item) => {
        return (
          <option value={item.value} key={item.key} selected={item.selected}>
            {item.text}
          </option>
        );
      })}
    </select>
  );
};

export { Select };
