"use client";
import { RefObject, useRef, useState } from "react";
import { MealSettings } from "../MealSettings/MealSettings";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Input, InputType } from "../formElements/Input/Input";
import { Label } from "../formElements/Label/Label";
import { Select, SelectListItemProps } from "../formElements/Select/Select";

interface MealItemSettings {
  id: string;
}

const RandomizedMealsForm = () => {
  const [mealItemsSettings, setMealItemsSettings] = useState<
    MealItemSettings[]
  >([]);

  const daysRef: RefObject<HTMLSelectElement> = useRef(null);

  const increaseMealItems = (newItems: number) => {};

  const decreaseMealItems = (newItems: number) => {};

  const daysOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const items = parseInt(e.target.value) || 0;
    if (items === mealItemsSettings.length) {
      return;
    }

    if (items > mealItemsSettings.length) {
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
          selected: item === "5",
        };
      });
    console.log(itemsArray);
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
          />
        </FormElementWrapper>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:justify-between">
        <MealSettings />
        <MealSettings />
        <MealSettings />
        <MealSettings />
        <MealSettings />
      </div>
    </>
  );
};
export { RandomizedMealsForm };
