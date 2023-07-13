"use client";
import { RefObject, useRef, useState } from "react";
import { MealSettings } from "../MealSettings/MealSettings";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Label } from "../formElements/Label/Label";
import { Select, SelectListItemProps } from "../formElements/Select/Select";

export interface MealItem {
  itemId: string;
  tags: string[];
  difficulityLevel: string;
}

interface RandomizedMealsFormProps {
  initialMealsCount: number;
  initialMeals: MealItem[];
}

const RandomizedMealsForm = ({
  initialMealsCount,
  initialMeals,
}: RandomizedMealsFormProps) => {
  const [mealItems, setMealItem] = useState<MealItem[]>(initialMeals);

  const daysRef: RefObject<HTMLSelectElement> = useRef(null);

  const increaseMealItems = (newItems: number) => {};

  const decreaseMealItems = (newItems: number) => {};

  const daysOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const items = parseInt(e.target.value) || 0;
    if (items === mealItems.length) {
      return;
    }

    if (items > mealItems.length) {
      increaseMealItems(items);
    } else {
      decreaseMealItems(items);
    }

    console.log("Change items");
  };

  const renderSelectItems = (): SelectListItemProps[] => {
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
            items={renderSelectItems()}
            onChange={daysOnChange}
            reference={daysRef}
            defaultValue={initialMealsCount.toString()}
          />
        </FormElementWrapper>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:justify-between">
        {mealItems.map((item, index) => {
          return <MealSettings key={item.itemId} />;
        })}
      </div>
    </>
  );
};
export { RandomizedMealsForm };
