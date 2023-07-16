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
}

const MealSettings = ({
  mealItem,
  difficultyLevels,
  mealTitle,
  allTags,
  addTagToMealItem,
  removeTagFromMealItem,
  difficultyLevelOnChange,
}: MealSettingsProps) => {
  const difficultyLevelItems = difficultyLevels.map((item, index) => {
    return {
      key: item._id,
      value: item._id,
      text: item.level,
    };
  });

  const addTag = (tagId: string) => {
    addTagToMealItem({ tagId, mealId: mealItem.itemId });
  };

  const removeTag = (tagId: string) => {
    removeTagFromMealItem({ tagId: tagId, mealId: mealItem.itemId });
  };

  return (
    <div className="bg-gray-900 p-5 rounded-lg">
      <h2 className="text-2xl mb-2">{mealTitle}</h2>
      <FormElementWrapper>
        <Label htmlFor="difficultyLevel" labelText="Difficulty level" />
        <Select
          name={`difficultyLevel_${mealItem.itemId}`}
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
      />
    </div>
  );
};

export { MealSettings };
