import { Tag } from "@/app/randomizeMeals/page";
import { MealItem } from "../RandomizedMealsForm/RandomizedMealsForm";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton/SecondaryButton";

const MealSuggestion = ({
  mealItem,
  handleEditMealSettings,
  handleRegenerate,
  allTags,
}: {
  mealItem: MealItem;
  handleEditMealSettings: (temporaryMealId: string) => void;
  handleRegenerate: (temporaryMealId: string) => void;
  allTags: Tag[];
}) => {
  const suggestedTags = mealItem?.mealSuggestion?.tags || [];
  const getTagById = (tagId: string) => {
    return allTags.filter((tagItem) => {
      return tagItem._id === tagId;
    })[0];
  };
  return (
    <div className="bg-gray-900 rounded-lg flex flex-col overflow-hidden border border-gray-500">
      <div className="grow bg-pink-500 p-5">
        <h2 className="text-xl mb-2">{mealItem?.mealSuggestion?.title}</h2>
        <div className="mb-2 text-xs">
          <span className="font-bold">Difficulty level:</span>{" "}
          <span className="italic">
            {mealItem?.mealSuggestion?.difficultyLevel}
          </span>
        </div>
        {suggestedTags.length > 0 && (
          <div className="flex text-xs">
            <div className="mb-2 font-bold">Taggar:&nbsp;</div>
            <ul className="flex gap-x-2 flex-wrap">
              {suggestedTags.map((tag) => {
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
      <div className="p-5">
        <h3 className="mb-1">Settings</h3>
        <div className="flex justify-between items-end">
          <div>
            <div className="mb-2 text-xs">
              <span className="font-bold">Difficulty level:</span>{" "}
              <span className="italic">{mealItem.difficulityLevel.level}</span>
            </div>
            <div className="mb-2 text-xs">
              <span className="font-bold">Tags</span>
              <div className="flex gap-x-1">
                {mealItem.tags.length === 0 ? (
                  <div className="italic">No tags</div>
                ) : (
                  <>
                    {mealItem.tags.map((tag) => {
                      return (
                        <span className="italic">
                          {getTagById(tag).tagName}
                        </span>
                      );
                    })}
                  </>
                )}
              </div>
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
      <div className="p-5 bg-white">
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
