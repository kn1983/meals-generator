import { useState } from "react";
import { RandomizedMealItem } from "../RandomizedMealsForm/RandomizedMealsForm";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";

const MealsSuggestions = ({
  mealItems,
  handleKeepMeal,
}: {
  mealItems: RandomizedMealItem[];
  handleKeepMeal: (meal: RandomizedMealItem) => void;
}) => {
  return (
    <div className="mb-8">
      <h2 className="mb-2">Meals suggestions</h2>
      {mealItems.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4 md:justify-between mb-4">
          {mealItems.map((meal) => {
            return (
              <div
                className="bg-gray-900 p-5 rounded-lg sm:relative"
                key={meal._id}
              >
                <div className="flex">
                  <div className="mb-1 text-pink-500 grow">{meal.title}</div>
                  <div>
                    <PrimaryButton
                      buttonOnClick={() => {
                        handleKeepMeal(meal);
                      }}
                      text="Keep"
                      type="button"
                    />
                  </div>
                </div>
                <div className="mb-2 text-xs">
                  <span className="font-bold">Difficulty level:</span>{" "}
                  <span className="italic">{meal.difficultyLevel}</span>
                </div>
                {meal.tags.length > 0 && (
                  <div className="flex text-xs ">
                    <div className="mb-2 font-bold">Taggar:&nbsp;</div>
                    <ul className="flex gap-x-2 flex-wrap">
                      {meal.tags.map((tag) => {
                        return (
                          <li key={tag._id} className="italic">
                            {tag.tagName}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className="text-xs mb-2">
                  <span className="font-bold">Author:</span>{" "}
                  <span className="italic">{meal.authorName}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div>
        <PrimaryButton type="button" text="Regenerate new meals" />
      </div>
    </div>
  );
};

export { MealsSuggestions };
