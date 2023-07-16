import { RefObject } from "react";

export interface SelectListItemProps {
  value: string;
  key: string;
  text: string;
}

interface SelectProps {
  items: SelectListItemProps[];
  name: string;
  reference?: RefObject<HTMLSelectElement>;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
}
const Select = ({
  items,
  name,
  reference,
  defaultValue,
  onChange,
  value,
}: SelectProps) => {
  {
    items.length == 0 && null;
  }
  return (
    <select
      name={name}
      className="bg-pink-600 block p-2 leading-none rounded"
      ref={reference}
      defaultValue={defaultValue}
      onChange={onChange}
      value={value}
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
