import { Input, InputType } from "../formElements/Input/Input";
import { Label } from "../formElements/Label/Label";

const Tag = ({ tag }: { tag: string }) => {
  return (
    <span className="bg-slate-300 m-1 flex pr-4">
      {tag}
      <button
        type="button"
        className="relative after:content-['x'] after:text-blue-500 after:absolute after:top-0 after:left-0 after:p-1 leading-none"
      >
        <span className="sr-only">Remove tag</span>
      </button>
    </span>
  );
};

const AddTags = () => {
  return (
    <div>
      <Label htmlFor="tags" labelText="Tags" />
      <div className="bg-white text-black sm:flex">
        <div className="bg-white p-1 flex items-center">
          <Tag tag="Vegetariskt" />
          <Tag tag="Vegetariskt" />
          <Tag tag="Helg" />
          <Tag tag="Kött" />
        </div>
        <Input type={InputType.TEXT} name="tags" id="tags" placeholder="Tags" />
      </div>
    </div>
  );
};

export { AddTags };
