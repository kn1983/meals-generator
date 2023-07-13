"use client";
import { RefObject, useRef, useState } from "react";
import { MealSettings } from "../MealSettings/MealSettings";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Label } from "../formElements/Label/Label";
import { Select, SelectListItemProps } from "../formElements/Select/Select";
import { DifficultyLevel } from "@/app/randomizeMeals/page";

export interface MealItem {
  itemId: string;
  tags: string[];
  difficulityLevel: string;
}

interface RandomizedMealsFormProps {
  initialMealsCount: number;
  initialMeals: MealItem[];
  difficultyLevels: DifficultyLevel[];
  defaultLevel: string;
}

const RandomizedMealsForm = ({
  initialMealsCount,
  initialMeals,
  difficultyLevels,
  defaultLevel,
}: RandomizedMealsFormProps) => {
  const [mealItems, setMealItems] = useState<MealItem[]>(initialMeals);
  const daysRef: RefObject<HTMLSelectElement> = useRef(null);

  const increaseMealItems = (newItemsCount: number) => {
    const itemsToAdd = newItemsCount - mealItems.length;
    // let newMealItems = [...mealItems];

    const newItems = new Array(itemsToAdd).fill("").reduce(
      (accumulator, _) => {
        return [...accumulator, getNewMealItem(accumulator.length)];
      },
      [...mealItems]
    );
    console.log(newItems);
    setMealItems(newItems);
  };

  const decreaseMealItems = (newItemsCount: number) => {
    const itemsToRemove = mealItems.length - newItemsCount;
    const newMealItems = [...mealItems];
    setMealItems(newMealItems.slice(0, itemsToRemove * -1));
  };

  const daysOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsCount = parseInt(e.target.value) || 0;
    if (newItemsCount === mealItems.length) {
      return;
    }

    if (newItemsCount > mealItems.length) {
      increaseMealItems(newItemsCount);
    } else {
      decreaseMealItems(newItemsCount);
    }
  };

  const getNewMealItem = (currentIndex: number): MealItem => {
    const item = (currentIndex + 1).toString();
    return {
      itemId: item,
      tags: [],
      difficulityLevel: defaultLevel,
    };
  };

  const renderSelectDaysItems = (): SelectListItemProps[] => {
    const maxItems = 20;
    const itemsArray: SelectListItemProps[] = new Array(maxItems)
      .fill("")
      .map((_, index) => {
        const item = (index + 1).toString();
        return {
          key: item,
          value: item,
          text: item,
        };
      });
    return itemsArray;
  };

  return (
    <>
      <div className="w-1/4">
        <FormElementWrapper>
          <Label htmlFor="days" labelText="How many days" />
          <Select
            id="days"
            name="days"
            items={renderSelectDaysItems()}
            onChange={daysOnChange}
            reference={daysRef}
            defaultValue={initialMealsCount.toString()}
          />
        </FormElementWrapper>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:justify-between">
        {mealItems.map((item) => {
          return (
            <MealSettings
              key={item.itemId}
              difficultyLevels={difficultyLevels}
              defaultLevel={defaultLevel}
            />
          );
        })}
      </div>
    </>
  );
};
export { RandomizedMealsForm };
