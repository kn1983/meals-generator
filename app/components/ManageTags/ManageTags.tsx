import { Tag } from "@/app/randomizeMeals/page";
import { Input, InputType } from "../formElements/Input/Input";
import { Label } from "../formElements/Label/Label";
import React, { RefObject, useRef, useState } from "react";

const tagWrapperStyles =
  "mr-2 mb-2 flex text-xs rounded tracking-wide leading-none";

const TagItem = ({
  tag,
  removeTag,
}: {
  tag: Tag;
  removeTag: (tagId: string) => void;
}) => {
  const removeOnClick = () => {
    removeTag(tag._id);
  };
  return (
    <span className={`${tagWrapperStyles} pr-0 bg-slate-300 flex`}>
      <span className="pl-2 py-2">{tag.tagName}</span>
      <button
        type="button"
        className="relative px-2 block after:content-['x'] after:text-blue-600 after:absolute after:top-2 after:left-1 leading-none text-xs"
        onClick={removeOnClick}
      >
        <span className="sr-only">Remove tag</span>
      </button>
    </span>
  );
};

const TagSuggestion = ({
  tag,
  tagSuggestionOnClick,
  isFirst,
}: {
  tag: Tag;
  tagSuggestionOnClick: (tagId: string) => void;
  isFirst: boolean;
}) => {
  return (
    <button
      className={`${tagWrapperStyles} ${
        isFirst
          ? "bg-blue-500 hover:bg-blue-500"
          : "bg-blue-800 hover:bg-blue-900"
      } pr-2 text-white`}
      onClick={() => tagSuggestionOnClick(tag._id)}
    >
      <span className="pl-2 py-2">{tag.tagName}</span>
    </button>
  );
};

const ManageTags = ({
  currentTags,
  allTags,
  addTag,
  removeTag,
  tagsInputRef,
  labelText,
  tagFieldId,
}: {
  currentTags: string[];
  allTags: Tag[];
  addTag: (tagId: string) => void;
  removeTag: (tagId: string) => void;
  tagsInputRef: RefObject<HTMLInputElement>;
  labelText: string;
  tagFieldId: string;
}) => {
  const [matchingTags, setMatchingTags] = useState<Tag[]>([]);
  const checkMatchingTags = (tagString: string): Tag[] =>
    allTags.filter(
      (tag) =>
        tag.tagName.toLowerCase().includes(tagString.toLowerCase()) &&
        !currentTags.find((itemTag) => itemTag === tag._id)
    );

  const saveNewTag = async (tagToAdd: string): Promise<string> => {
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
    return jsonResponse.tagId;
  };

  const addTagByTypeComma = async (inputValue: string) => {
    const tagToAdd = inputValue.split(",")[0];
    if (tagToAdd === "") {
      return;
    }
    const matchingTags = checkMatchingTags(tagToAdd.toLocaleLowerCase());
    resetTagInputAndSuggestions();
    if (
      matchingTags.length === 1 &&
      matchingTags[0].tagName.toLocaleLowerCase() ==
        tagToAdd.toLocaleLowerCase()
    ) {
      addTag(matchingTags[0]._id);
    } else {
      const addedTagId = await saveNewTag(tagToAdd);
      addTag(addedTagId);
    }
  };

  const tagsOnKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const tagToAdd = tagsInputRef.current?.value;
    if (event.key === "Enter" && tagToAdd) {
      event.preventDefault();
      const matchingTags = checkMatchingTags(tagToAdd.toLocaleLowerCase());
      resetTagInputAndSuggestions();
      if (matchingTags.length > 0) {
        addTag(matchingTags[0]._id);
      } else {
        const addedTagId = await saveNewTag(tagToAdd);
        addTag(addedTagId);
      }
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
    addTag(tagId);
    resetTagInputAndSuggestions();
  };

  return (
    <div>
      <div className="mb-3">
        <Label htmlFor={tagFieldId} labelText={labelText} />
        <div className="text-black flex flex-wrap mb-1">
          {currentTags.map((tagId) => {
            const tagItem: Tag | undefined = allTags.find(
              (tag) => tag._id === tagId
            );

            return (
              tagItem && (
                <TagItem
                  tag={tagItem}
                  key={tagItem._id}
                  removeTag={removeTag}
                />
              )
            );
          })}
        </div>
        <Input
          type={InputType.TEXT}
          name={tagFieldId}
          placeholder="Tags"
          onChange={tagOnChange}
          reference={tagsInputRef}
          onKeyDown={tagsOnKeyDown}
        />
      </div>
      <div className="text-black flex flex-wrap mb-1">
        {matchingTags.map((tagSuggestion, index) => {
          return (
            <TagSuggestion
              tag={tagSuggestion}
              key={tagSuggestion._id}
              tagSuggestionOnClick={tagSuggestionOnClick}
              isFirst={index === 0}
            />
          );
        })}
      </div>
    </div>
  );
};

export { ManageTags };
