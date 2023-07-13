"use client";
import { Meal } from "@/app/meals/page";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { FormWrapper } from "../formElements/FormWrapper/FormWrapper";
import { Input, InputType } from "../formElements/Input/Input";
import { Label } from "../formElements/Label/Label";
import { FormEvent, RefObject, useRef, useState } from "react";

const SimpleRandomizeMealsForm = async () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const mealsCountRef: RefObject<HTMLInputElement> = useRef(null);

  const fetchRandomizedMeals = async (): Promise<Meal[]> => {
    const res = await fetch("http://localhost:3000/api/randomizeMeals");
    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }
    console.log("RES MEALS");
    return res.json();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mealsCountRef.current?.value) {
      //   const randomizedMeals = await fetchRandomizedMeals();
      //   setMeals(randomizedMeals);
    }
  };

  console.log("RE RENDER");
  // console.log("meals", meals.length);
  return (
    <div>
      <FormWrapper>
        <form className="w-full" method="POST" onSubmit={handleSubmit}>
          <div className="flex place-items-end gap-4">
            <div>
              <Label labelText="Meals count" htmlFor="mealsCount" />
              <Input
                type={InputType.NUMBER}
                defaultValue={5}
                name="mealsCount"
                reference={mealsCountRef}
              />
            </div>
            <div>
              <PrimaryButton type="submit" text="Randomize meals" />
            </div>
          </div>
        </form>
      </FormWrapper>
      <div>HEJ</div>
      {/* {meals?.length > 0 && <div>asdfasdf</div>}
      {meals?.length > 0 && (
        <ul>
          <div>UL LIST</div>
          {meals.map((meal) => {
            return (
              <li className="mb-6" key={meal._id}>
                <div>APA</div>
                <div className="mb-1">{meal.title}</div>
                <div className="text-xs italic">Author: {meal.authorName}</div>
              </li>
            );
          })}
        </ul>
      )} */}
    </div>
  );
};

export { SimpleRandomizeMealsForm };
