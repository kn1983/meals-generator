import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Input, InputType } from "../formElements/Input/Input";
import { Label } from "../formElements/Label/Label";

interface TagItem {
  tagId: string;
  tagName: string;
}

const tagWrapperStyles =
  "mr-2 mb-2 flex text-xs rounded tracking-wide leading-none";

const Tag = ({ tag }: { tag: TagItem }) => {
  return (
    <span className={`${tagWrapperStyles} pr-0 bg-slate-300 flex`}>
      <span className="pl-2 py-2">{tag.tagName}</span>
      <button
        type="button"
        className="relative px-2 block after:content-['x'] after:text-blue-600 after:absolute after:top-2 after:left-1 leading-none text-xs"
      >
        <span className="sr-only">Remove tag</span>
      </button>
    </span>
  );
};

const AddTags = ({ tags }: { tags: TagItem[] }) => {
  return (
    <div>
      <div className="mb-3">
        <Label htmlFor="tags" labelText="Tags" />
        <div className="text-black flex flex-wrap mb-1">
          {tags.map((tag) => {
            return <Tag tag={tag} />;
          })}
        </div>
        <Input type={InputType.TEXT} name="tags" id="tags" placeholder="Tags" />
      </div>
      <div className="text-black flex flex-wrap mb-1">
        <button
          className={`${tagWrapperStyles} pr-2 bg-blue-800 hover:bg-blue-900 text-white`}
        >
          <span className="pl-2 py-2">Tag suggestion</span>
        </button>
        <button
          className={`${tagWrapperStyles} pr-2 bg-blue-800 hover:bg-blue-900 text-white`}
        >
          <span className="pl-2 py-2">Tag suggestion</span>
        </button>
      </div>
    </div>
  );
};

export { AddTags };
