import { Tag } from "@/app/randomizeMeals/page";
import { Input, InputType } from "../formElements/Input/Input";
import { Label } from "../formElements/Label/Label";
import React, { RefObject, useRef, useState } from "react";
import { AddTagToMealItemArgs } from "../RandomizedMealsForm/RandomizedMealsForm";

const tagWrapperStyles =
  "mr-2 mb-2 flex text-xs rounded tracking-wide leading-none";

const TagItem = ({ tag }: { tag: Tag }) => {
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

const TagSuggestion = ({
  tag,
  tagSuggestionOnClick,
}: {
  tag: Tag;
  tagSuggestionOnClick: (tagId: string) => void;
}) => {
  return (
    <button
      className={`${tagWrapperStyles} pr-2 bg-blue-800 hover:bg-blue-900 text-white`}
      onClick={() => tagSuggestionOnClick(tag._id)}
    >
      <span className="pl-2 py-2">{tag.tagName}</span>
    </button>
  );
};

const ManageTags = ({
  itemTags,
  mealId,
  allTags,
  addTagToMealItem,
}: {
  itemTags: string[];
  allTags: Tag[];
  mealId: string;
  addTagToMealItem: (args: AddTagToMealItemArgs) => void;
}) => {
  const [matchingTags, setMatchingTags] = useState<Tag[]>([]);
  const tagsInputRef: RefObject<HTMLInputElement> = useRef(null);
  const checkMatchingTags = (tagString: string): Tag[] =>
    allTags.filter(
      (tag) =>
        tag.tagName.toLowerCase().includes(tagString.toLowerCase()) &&
        !itemTags.find((itemTag) => itemTag === tag._id)
    );

  const addTag = (tagId: string) => {
    addTagToMealItem({ tagId: tagId, mealId });
    if (tagsInputRef?.current) {
      tagsInputRef.current.value = "";
      setMatchingTags([]);
    }
  };

  const addTagByTypeComma = async (inputValue: string) => {
    const tagToAdd = inputValue.split(",")[0];
    if (tagToAdd === "") {
      return;
    }
    const matchingTags = checkMatchingTags(tagToAdd.toLocaleLowerCase());
    if (
      matchingTags.length === 1 &&
      matchingTags[0].tagName.toLocaleLowerCase() ==
        tagToAdd.toLocaleLowerCase()
    ) {
      addTagToMealItem({ tagId: matchingTags[0]._id, mealId });
      resetTagInputAndSuggestions();
    } else {
      console.log("No suggestion or more than one");
      const response = await fetch("http://localhost:3000/api/addTag", {
        method: "POST",
        body: JSON.stringify({ tagName: tagToAdd }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to post tag");
      }
      const jsonResponse: { tagId: string } = await response.json();
      addTagToMealItem({ tagId: jsonResponse.tagId, mealId });
      resetTagInputAndSuggestions();
    }
  };

  const tagOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const lastCharacter = inputValue.slice(-1);

    if (lastCharacter === ",") {
      return addTagByTypeComma(inputValue);
    }

    if (inputValue === "") {
      return setMatchingTags([]);
    }
    const matchingTags = checkMatchingTags(inputValue.toLowerCase());
    setMatchingTags(matchingTags);
  };

  const resetTagInputAndSuggestions = () => {
    if (tagsInputRef?.current) {
      tagsInputRef.current.value = "";
      setMatchingTags([]);
    }
  };

  const tagSuggestionOnClick = (tagId: string) => {
    addTagToMealItem({ tagId: tagId, mealId });
    resetTagInputAndSuggestions();
  };

  return (
    <div>
      <div className="mb-3">
        <Label htmlFor="tags" labelText="Tags" />
        <div className="text-black flex flex-wrap mb-1">
          {itemTags.map((tagId) => {
            const tagItem: Tag | undefined = allTags.find(
              (tag) => tag._id === tagId
            );

            return tagItem && <TagItem tag={tagItem} key={tagItem._id} />;
          })}
        </div>
        <Input
          type={InputType.TEXT}
          name="tags"
          placeholder="Tags"
          onChange={tagOnChange}
          reference={tagsInputRef}
        />
      </div>
      <div className="text-black flex flex-wrap mb-1">
        {matchingTags.map((tagSuggestion) => {
          return (
            <TagSuggestion
              tag={tagSuggestion}
              key={tagSuggestion._id}
              tagSuggestionOnClick={tagSuggestionOnClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export { ManageTags };
