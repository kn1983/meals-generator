"use client";
import React, { FormEvent, RefObject, useRef, useState } from "react";
import { MainTitle } from "../MainTitle/MainTitle";
import { FormWrapper } from "../formElements/FormWrapper/FormWrapper";
import { Input, InputType } from "../formElements/Input/Input";
import { Label } from "../formElements/Label/Label";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { Meal } from "@/app/meals/page";

const SimpleRandomizeMealsForm = () => {
  const mealsCountRef: RefObject<HTMLInputElement> = useRef(null);
  const [meals, setMeals] = useState<Meal[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (mealsCountRef.current?.value) {
      const response = await fetch(
        `/api/randomizeMeals?mealsCount=${mealsCountRef.current.value}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }
      const result = await response.json();
      setMeals(result);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (meals?.length > 0) {
      setMeals([]);
    }
  };

  return (
    <div>
      <FormWrapper>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex place-items-end gap-4">
            <div>
              <Label labelText="Meals count" htmlFor="mealsCount" />
              <Input
                type={InputType.NUMBER}
                defaultValue={5}
                name="mealsCount"
                reference={mealsCountRef}
                onKeyDown={onKeyDown}
              />
            </div>
            <div>
              <PrimaryButton type="submit" text="Randomize meals" />
            </div>
          </div>
        </form>
      </FormWrapper>
      <div>
        {meals.length > 0 && (
          <>
            <h2 className="text-2xl mb-2">Meals</h2>
            <ul>
              {meals.map((meal) => {
                return (
                  <li key={meal._id} className="mb-6">
                    <div className="mb-1">{meal.title}</div>
                    <div className="text-xs italic">
                      Author: {meal.authorName}
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export { SimpleRandomizeMealsForm };
