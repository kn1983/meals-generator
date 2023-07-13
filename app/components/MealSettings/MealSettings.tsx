import { DifficultyLevel } from "@/app/randomizeMeals/page";
import { AddTags } from "../ManageTags/ManageTags";
import { FormElementWrapper } from "../formElements/FormElementWrapper/FormElementWrapper";
import { Label } from "../formElements/Label/Label";
import { Select } from "../formElements/Select/Select";

const tags = [
  {
    tagId: "asdfafs",
    tagName: "Vegetariskt",
  },
  {
    tagId: "dfgh",
    tagName: "Kött",
  },
  {
    tagId: "vbmnv",
    tagName: "Helgmat",
  },
  {
    tagId: "zxcv",
    tagName: "Soppa",
  },
  {
    tagId: "yuio",
    tagName: "Fisk",
  },
  {
    tagId: "sdfgs",
    tagName: "Kinesiskt",
  },
];

interface MealSettingsProps {
  difficultyLevels: DifficultyLevel[];
  defaultLevel: string;
}

const MealSettings = ({
  difficultyLevels,
  defaultLevel,
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
      <h2 className="text-2xl mb-2">Meal 1</h2>
      <FormElementWrapper>
        <Label htmlFor="difficultyLevel" labelText="Difficulty level" />
        <Select
          id="difficultyLevel"
          name="difficultyLevel"
          items={difficultyLevelItems}
          defaultValue={defaultLevel}
        />
      </FormElementWrapper>
      {/* <AddTags tags={tags} /> */}
    </div>
  );
};

export { MealSettings };
