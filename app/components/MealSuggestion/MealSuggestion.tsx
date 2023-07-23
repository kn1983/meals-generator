import { MealItem } from "../RandomizedMealsForm/RandomizedMealsForm";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton/SecondaryButton";

const MealSuggestion = ({
  mealItem,
  handleEditMealSettings,
  handleRegenerate,
}: {
  mealItem: MealItem;
  handleEditMealSettings: (temporaryMealId: string) => void;
  handleRegenerate: (temporaryMealId: string) => void;
}) => {
  const tags = mealItem?.mealSuggestion?.tags || [];
  return (
    <div className="bg-gray-900 rounded-lg flex flex-col overflow-hidden">
      <div className="grow bg-pink-500 p-5">
        <h2 className="text-xl mb-2">{mealItem?.mealSuggestion?.title}</h2>
        <div className="mb-2 text-xs">
          <span className="font-bold">Difficulty level:</span>{" "}
          <span className="italic">
            {mealItem?.mealSuggestion?.difficultyLevel}
          </span>
        </div>
        {tags.length > 0 && (
          <div className="flex text-xs">
            <div className="mb-2 font-bold">Taggar:&nbsp;</div>
            <ul className="flex gap-x-2 flex-wrap">
              {tags.map((tag) => {
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
          <span className="italic">{mealItem?.mealSuggestion?.authorName}</span>
        </div>
      </div>
      <div className="p-5 bg-white border-b-2 border-pink-500">
        <h3 className="mb-1 text-black">Settings</h3>
        <div className="flex justify-between items-end">
          <div>
            <div className="mb-2 text-xs text-black">
              <span className="font-bold">Difficulty level:</span>{" "}
              <span className="italic">Easy</span>
            </div>
            <div className="mb-2 text-xs text-black">
              <span className="font-bold">Difficulty level:</span>{" "}
              <span className="italic">Easy</span>
            </div>
          </div>
          <div className="mb-2 text-xs">
            <SecondaryButton
              type="button"
              text="Edit settings"
              isSmall={true}
              buttonOnClick={() =>
                handleEditMealSettings(mealItem.temporaryMealId)
              }
            />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex gap-3 flex-col lg:flex-row-reverse">
          <div className="order-2"></div>
          <div className="lg:order-1">
            <PrimaryButton
              type="button"
              text="Generate new meal"
              isSmall={true}
              buttonOnClick={() => handleRegenerate(mealItem.temporaryMealId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { MealSuggestion };
