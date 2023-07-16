"use client";

import { User } from "@/app/addMeal/page";
import { FormEvent, RefObject, useRef } from "react";
import { Label } from "../formElements/Label/Label";
import { Input, InputType } from "../formElements/Input/Input";
import { Select, SelectListItemProps } from "../formElements/Select/Select";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { FormWrapper } from "../formElements/FormWrapper/FormWrapper";
import { DifficultyLevel } from "@/app/randomizeMeals/page";

interface AddMealsFormProps {
  users: User[];
  difficultyLevels: DifficultyLevel[];
}

const AddMealsForm = ({ users, difficultyLevels }: AddMealsFormProps) => {
  const mealRef: RefObject<HTMLInputElement> = useRef(null);
  const authorRef: RefObject<HTMLSelectElement> = useRef(null);
  const difficultyLevelRef: RefObject<HTMLSelectElement> = useRef(null);

  const handleSubmitMeal = async (e: FormEvent) => {
    e.preventDefault();

    const meal = mealRef.current?.value;
    const author = authorRef.current?.value;
    const difficulityLevel = difficultyLevelRef.current?.value;

    if (meal && author && difficulityLevel) {
      try {
        const response = await fetch("http://localhost:3000/api/addMeal", {
          method: "POST",
          body: JSON.stringify({ author, meal, difficulityLevel }),
          headers: {
            "content-type": "application/json",
          },
        });

        if (response.status === 200) {
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
          <PrimaryButton type="submit" text="Add meal" />
        </form>
      </FormWrapper>
    </div>
  );
};

export { AddMealsForm };
