import { DifficultyLevel, Tag } from "@/app/randomizeMeals/page";
import { ManageTags } from "../ManageTags/ManageTags";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Label } from "../formElements/Label/Label";
import { Select } from "../formElements/Select/Select";
import {
  AddTagToMealItemArgs,
  MealItem,
  RemoveTagFromMealItemArgs,
} from "../RandomizedMealsForm/RandomizedMealsForm";
import { RefObject, useRef } from "react";
import { PrimaryButton } from "../buttons/PrimaryButton/PrimaryButton";
import { SecondaryButton } from "../buttons/SecondaryButton/SecondaryButton";

interface MealSettingsProps {
  difficultyLevels: DifficultyLevel[];
  mealTitle: string;
  allTags: Tag[];
  mealItem: MealItem;
  addTagToMealItem: (args: AddTagToMealItemArgs) => void;
  removeTagFromMealItem: (args: RemoveTagFromMealItemArgs) => void;
  difficultyLevelOnChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
  handleGenerate: (temporaryMealId: string) => void;
  handleEditCancel: (temporaryMealId: string) => void;
}

const MealSettings = ({
  mealItem,
  difficultyLevels,
  mealTitle,
  allTags,
  addTagToMealItem,
  removeTagFromMealItem,
  difficultyLevelOnChange,
  handleGenerate,
  handleEditCancel,
}: MealSettingsProps) => {
  const tagsInputRef: RefObject<HTMLInputElement> = useRef(null);
  const difficultyLevelItems = difficultyLevels.map((item, index) => {
    return {
      key: item._id,
      value: item._id,
      text: item.level,
    };
  });

  const addTag = (tagId: string) => {
    addTagToMealItem({ tagId, temporaryMealId: mealItem.temporaryMealId });
  };

  const removeTag = (tagId: string) => {
    removeTagFromMealItem({
      tagId: tagId,
      temporaryMealId: mealItem.temporaryMealId,
    });
  };

  const shouldDisplayCancelButton = () => {
    return mealItem.mealSuggestion !== null;
  };

  return (
    <div className="bg-gray-900 p-5 rounded-lg">
      <h2 className="text-xl mb-2">{mealTitle}</h2>

      <FormElementWrapper>
        <Label
          htmlFor={`difficultyLevel_${mealItem.temporaryMealId}`}
          labelText="Difficulty level"
        />
        <Select
          name={`difficultyLevel_${mealItem.temporaryMealId}`}
          items={difficultyLevelItems}
          value={mealItem.difficulityLevel}
          onChange={difficultyLevelOnChange}
        />
      </FormElementWrapper>
      <ManageTags
        currentTags={mealItem.tags}
        allTags={allTags}
        addTag={addTag}
        removeTag={removeTag}
        tagsInputRef={tagsInputRef}
        labelText="Tags (optional)"
        tagFieldId={`tags_${mealItem.temporaryMealId}`}
      />

      <div className="flex gap-3 flex-col lg:flex-row-reverse">
        {shouldDisplayCancelButton() && (
          <div className="order-2">
            <SecondaryButton
              type="button"
              text="Cancel"
              isSmall={true}
              buttonOnClick={() => handleEditCancel(mealItem.temporaryMealId)}
            />
          </div>
        )}
        <div className="lg:order-1">
          <PrimaryButton
            type="button"
            text="Generate new meal"
            isSmall={true}
            buttonOnClick={() => handleGenerate(mealItem.temporaryMealId)}
          />
        </div>
      </div>
    </div>
  );
};

export { MealSettings };
