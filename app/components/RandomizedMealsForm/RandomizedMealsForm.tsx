"use client";
import React, { RefObject, useRef, useState } from "react";
import { MealSettings } from "../MealSettings/MealSettings";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Label } from "../formElements/Label/Label";
import { Select, SelectListItemProps } from "../formElements/Select/Select";
import { DifficultyLevel, Tag } from "@/app/randomizeMeals/page";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { generateUniqueId } from "@/app/utils/generateUniqueId/generateUniqueId";
import { SecondaryButton } from "../buttons/SecondaryButton/SecondaryButton";
import { MealSuggestion } from "../MealSuggestion/MealSuggestion";

export interface MealItem {
  itemId: string;
  tags: string[];
  difficulityLevel: string;
  mealSuggestion: RandomizedMealItem | null;
}

interface RandomizedMealsFormProps {
  initialMealsCount: number;
  initialMeals: MealItem[];
  difficultyLevels: DifficultyLevel[];
  defaultLevel: string;
  initialTags: Tag[];
}

export interface AddTagToMealItemArgs {
  mealId: string;
  tagId: string;
}

export interface RemoveTagFromMealItemArgs {
  mealId: string;
  tagId: string;
}

export interface RandomizedMealItem {
  _id: string;
  difficultyLevel: string;
  tags: Tag[];
  title: string;
  authorName: string;
}

const RandomizedMealsForm = ({
  initialMealsCount,
  initialMeals,
  difficultyLevels,
  defaultLevel,
  initialTags,
}: RandomizedMealsFormProps) => {
  const [mealItems, setMealItems] = useState<MealItem[]>(initialMeals);
  const [allTags, setAllTags] = useState<Tag[]>(initialTags);
  const daysRef: RefObject<HTMLSelectElement> = useRef(null);

  const increaseMealItems = (newItemsCount: number) => {
    const itemsToAdd = newItemsCount - mealItems.length;
    const newItems = new Array(itemsToAdd).fill("").reduce(
      (accumulator, _) => {
        return [...accumulator, getNewMealItem()];
      },
      [...mealItems]
    );
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

  const getNewMealItem = (): MealItem => {
    return {
      itemId: generateUniqueId(),
      tags: [],
      difficulityLevel: defaultLevel,
      mealSuggestion: null,
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

  const fetchTags = async (): Promise<Tag[]> => {
    const res = await fetch("http://localhost:3000/api/tags");
    if (!res.ok) {
      throw new Error("Failed to fetch tags");
    }
    return res.json();
  };

  const getMealIndexByMealId = (mealId: string): number =>
    mealItems.findIndex((meal) => meal.itemId === mealId);

  const addTagToMealItem = async ({ mealId, tagId }: AddTagToMealItemArgs) => {
    const mealIndex = getMealIndexByMealId(mealId);
    const newMealItems: MealItem[] = [...mealItems];
    newMealItems[mealIndex].tags.push(tagId);
    setMealItems(newMealItems);
    const allTags = await fetchTags();
    setAllTags(allTags);
  };

  const removeTagFromMealItem = async ({
    mealId,
    tagId,
  }: RemoveTagFromMealItemArgs) => {
    const mealIndex = mealItems.findIndex((meal) => meal.itemId === mealId);
    const newMealItems: MealItem[] = [...mealItems];
    newMealItems[mealIndex].tags.splice(
      newMealItems[mealIndex].tags.indexOf(tagId),
      1
    );
    setMealItems(newMealItems);
  };

  const difficultyLevelOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const fieldName = event.target.getAttribute("name");
    const mealId: string = fieldName?.split("_").pop() || "";
    const mealIndex = getMealIndexByMealId(mealId);
    const newMealItems: MealItem[] = [...mealItems];
    newMealItems[mealIndex].difficulityLevel = event.target.value;
    setMealItems(newMealItems);
  };

  const handleSubmitMealsForm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/mealsBySettings",
        {
          method: "POST",
          body: JSON.stringify({
            mealItems,
            mealsCount: daysRef.current?.value || "",
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        if (!response.ok) {
          throw new Error("Hej apa");
        }
        const fetchedRandomizedMealItems: RandomizedMealItem[] =
          await response.json();

        const newMealItems = [...mealItems];

        fetchedRandomizedMealItems.forEach((fetchedMealItem, index) => {
          newMealItems[index].mealSuggestion = fetchedMealItem;
        });

        setMealItems(newMealItems);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditMealSettings = (mealId: string) => {
    console.log("Edit");
    const mealIndex = getMealIndexByMealId(mealId);
    const newMealItems = [...mealItems];
    newMealItems[mealIndex].mealSuggestion = null;
    setMealItems(newMealItems);
  };

  return (
    <>
      <div className="flex items-end flex-wrap">
        <div className="grow">
          <FormElementWrapper>
            <Label htmlFor="days" labelText="How many days" />
            <Select
              name="days"
              items={renderSelectDaysItems()}
              onChange={daysOnChange}
              reference={daysRef}
              defaultValue={initialMealsCount.toString()}
            />
          </FormElementWrapper>
        </div>
        <div className="">
          <FormElementWrapper>
            <PrimaryButton
              type="button"
              text="Generate All"
              buttonOnClick={handleSubmitMealsForm}
            />
          </FormElementWrapper>
        </div>
      </div>
      <h2 className="mb-2 text-2xl">Meals</h2>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:justify-between">
        {mealItems.map((item, index) => {
          if (item.mealSuggestion) {
            return (
              <MealSuggestion
                mealSuggestion={item.mealSuggestion}
                mealItemId={item.itemId}
                handleEditMealSettings={handleEditMealSettings}
              />
            );
          } else {
            return (
              <MealSettings
                key={item.itemId}
                mealItem={item}
                difficultyLevels={difficultyLevels}
                mealTitle={`Meal ${index + 1}, Settings`}
                allTags={allTags}
                addTagToMealItem={addTagToMealItem}
                removeTagFromMealItem={removeTagFromMealItem}
                difficultyLevelOnChange={difficultyLevelOnChange}
              />
            );
          }
        })}
      </div>
    </>
  );
};
export { RandomizedMealsForm };
