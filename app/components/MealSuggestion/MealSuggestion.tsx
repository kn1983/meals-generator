import { RandomizedMealItem } from "../RandomizedMealsForm/RandomizedMealsForm";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton/SecondaryButton";

const MealSuggestion = ({
  mealSuggestion,
  handleEditMealSettings,
  mealItemId,
}: {
  mealSuggestion: RandomizedMealItem;
  handleEditMealSettings: (mealId: string) => void;
  mealItemId: string;
}) => {
  return (
    <div className="bg-gray-900 border-2 border-pink-500 p-5 rounded-lg">
      <h2 className="text-xl mb-2 text-pink-500">{mealSuggestion?.title}</h2>
      <div className="mb-2 text-xs">
        <span className="font-bold">Difficulty level:</span>{" "}
        <span className="italic">{mealSuggestion.difficultyLevel}</span>
      </div>
      {mealSuggestion.tags.length > 0 && (
        <div className="flex text-xs ">
          <div className="mb-2 font-bold">Taggar:&nbsp;</div>
          <ul className="flex gap-x-2 flex-wrap">
            {mealSuggestion.tags.map((tag) => {
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
        <span className="italic">{mealSuggestion.authorName}</span>
      </div>
      <div className="lg:flex lg:gap-x-3 lg:flex-row-reverse">
        <div className="order-2">
          <SecondaryButton
            type="button"
            text="Edit settings"
            isSmall={true}
            buttonOnClick={() => handleEditMealSettings(mealItemId)}
          />
        </div>
        <div className="lg:order-1">
          <PrimaryButton type="button" text="Regenerate" isSmall={true} />
        </div>
      </div>
    </div>
  );
};

export { MealSuggestion };
