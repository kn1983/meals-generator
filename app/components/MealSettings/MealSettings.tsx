import { DifficultyLevel, Tag } from "@/app/randomizeMeals/page";
import { ManageTags } from "../ManageTags/ManageTags";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Label } from "../formElements/Label/Label";
import { Select } from "../formElements/Select/Select";
import {
  AddTagToMealItemArgs,
  RemoveTagFromMealItemArgs,
} from "../RandomizedMealsForm/RandomizedMealsForm";

interface MealSettingsProps {
  difficultyLevels: DifficultyLevel[];
  defaultLevel: string;
  mealTitle: string;
  allTags: Tag[];
  itemTags: string[];
  mealId: string;
  addTagToMealItem: (args: AddTagToMealItemArgs) => void;
  removeTagFromMealItem: (args: RemoveTagFromMealItemArgs) => void;
}

const MealSettings = ({
  difficultyLevels,
  defaultLevel,
  mealTitle,
  allTags,
  itemTags,
  mealId,
  addTagToMealItem,
  removeTagFromMealItem,
}: MealSettingsProps) => {
  const difficultyLevelItems = difficultyLevels.map((item, index) => {
    return {
      key: item._id,
      value: item._id,
      text: item.level,
    };
  });

  return (
    <div className="bg-gray-900 p-5 rounded-lg">
      <h2 className="text-2xl mb-2">{mealTitle}</h2>
      <FormElementWrapper>
        <Label htmlFor="difficultyLevel" labelText="Difficulty level" />
        <Select
          name="difficultyLevel"
          items={difficultyLevelItems}
          defaultValue={defaultLevel}
        />
      </FormElementWrapper>
      <ManageTags
        itemTags={itemTags}
        allTags={allTags}
        mealId={mealId}
        addTagToMealItem={addTagToMealItem}
        removeTagFromMealItem={removeTagFromMealItem}
      />
    </div>
  );
};

export { MealSettings };
