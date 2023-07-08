interface LabelProps {
  htmlFor: string;
  labelText: string;
}
const Label = ({ htmlFor, labelText }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="pb-2 block">
      {labelText}
    </label>
  );
};

export { Label };
