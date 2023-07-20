interface LabelProps {
  labelText: string;
  htmlFor: string;
}
const Label = ({ labelText, htmlFor }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className="pb-2 block">
      {labelText}
    </label>
  );
};

export { Label };
