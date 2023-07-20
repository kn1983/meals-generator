"use client";

import { User } from "@/app/addMeal/page";
import { FormEvent, RefObject, useRef, useState } from "react";
import { Label } from "../formElements/Label/Label";
import { Input, InputType } from "../formElements/Input/Input";
import { Select, SelectListItemProps } from "../formElements/Select/Select";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { FormWrapper } from "../formElements/FormWrapper/FormWrapper";
import { DifficultyLevel, Tag } from "@/app/randomizeMeals/page";
import { ManageTags } from "../ManageTags/ManageTags";

interface AddMealsFormProps {
  users: User[];
  initialTags: Tag[];
  difficultyLevels: DifficultyLevel[];
}

const AddMealsForm = ({
  users,
  initialTags,
  difficultyLevels,
}: AddMealsFormProps) => {
  const mealRef: RefObject<HTMLInputElement> = useRef(null);
  const authorRef: RefObject<HTMLSelectElement> = useRef(null);
  const difficultyLevelRef: RefObject<HTMLSelectElement> = useRef(null);
  const [currentMealTags, setCurrentMealTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>(initialTags);

  const handleSubmitMeal = async (e: FormEvent) => {
    e.preventDefault();

    const meal = mealRef.current?.value;
    const author = authorRef.current?.value;
    const difficulityLevel = difficultyLevelRef.current?.value;

    if (meal && author && difficulityLevel && currentMealTags.length > 0) {
      try {
        const response = await fetch("http://localhost:3000/api/addMeal", {
          method: "POST",
          body: JSON.stringify({
            author,
            meal,
            difficulityLevel,
            tags: currentMealTags,
          }),
          headers: {
            "content-type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log("SUCCESS");
          mealRef.current.value = "";
          authorRef.current.value = "";
          difficultyLevelRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getUserSelectListItems = (users: User[]): SelectListItemProps[] => {
    if (users.length === 0) {
      return [];
    }

    const listItems = users.map((user) => {
      return {
        value: user._id,
        key: user._id,
        text: user.userName,
      };
    });
    return [
      { value: "", key: "selectItem", text: "Select Author" },
      ...listItems,
    ];
  };

  const getDifficultyLevelsSelectListItems = (
    difficulityLevel: DifficultyLevel[]
  ): SelectListItemProps[] => {
    if (users.length === 0) {
      return [];
    }

    const listItems = difficulityLevel.map((difficulityLevel) => {
      return {
        value: difficulityLevel._id,
        key: difficulityLevel._id,
        text: difficulityLevel.level,
      };
    });
    return [
      {
        value: "",
        key: "selectDifficultyLevel",
        text: "Select Difficulty level",
      },
      ...listItems,
    ];
  };

  const fetchTags = async (): Promise<Tag[]> => {
    const res = await fetch("http://localhost:3000/api/tags");
    if (!res.ok) {
      throw new Error("Failed to fetch tags");
    }
    return res.json();
  };

  const handleRemoveTag = (tagId: string) => {
    const newTags = [...currentMealTags];
    newTags.splice(newTags.indexOf(tagId), 1);
    setCurrentMealTags(newTags);
  };

  const handleAddTag = async (tagId: string) => {
    setCurrentMealTags([...currentMealTags, tagId]);
    const allTags = await fetchTags();
    setAllTags(allTags);
  };

  const tagsInputRef: RefObject<HTMLInputElement> = useRef(null);

  return (
    <div className="flex">
      <FormWrapper>
        <form className="w-full" onSubmit={handleSubmitMeal}>
          <FormElementWrapper>
            <Label htmlFor="meal" labelText="Meal" />
            <Input
              type={InputType.TEXT}
              name="meal"
              reference={mealRef}
              placeholder="Meal"
            />
          </FormElementWrapper>
          <FormElementWrapper>
            <Label htmlFor="author" labelText="Author" />
            {users?.length > 0 && (
              <Select
                items={getUserSelectListItems(users)}
                name="author"
                reference={authorRef}
              />
            )}
          </FormElementWrapper>
          <FormElementWrapper>
            <Label htmlFor="difficultyLevel" labelText="Difficulty level" />
            {difficultyLevels?.length > 0 && (
              <Select
                items={getDifficultyLevelsSelectListItems(difficultyLevels)}
                name="difficultyLevel"
                reference={difficultyLevelRef}
              />
            )}
          </FormElementWrapper>
          <FormElementWrapper>
            <ManageTags
              allTags={allTags}
              currentTags={currentMealTags}
              addTag={handleAddTag}
              removeTag={handleRemoveTag}
              tagsInputRef={tagsInputRef}
              tagFieldId="tags"
              labelText="Tags"
            />
          </FormElementWrapper>
          <PrimaryButton type="submit" text="Add meal" />
        </form>
      </FormWrapper>
    </div>
  );
};

export { AddMealsForm };
