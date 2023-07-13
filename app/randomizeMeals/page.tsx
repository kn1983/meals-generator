import { StringMappingType } from "typescript";
import { MainTitle } from "../components/MainTitle/MainTitle";
import {
  MealItem,
  RandomizedMealsForm,
} from "../components/RandomizedMealsForm/RandomizedMealsForm";

export interface DifficultyLevel {
  _id: string;
  level: string;
}

export default async function Page() {
  const initialMealsCount = 5;

  const fetchDifficultyLevels = async (): Promise<DifficultyLevel[]> => {
    const res = await fetch("http://localhost:3000/api/difficultyLevels");

    if (!res.ok) {
      throw new Error("Failed to fetch difficulty levels");
    }

    return res.json();
  };

  const generateInitialMeals = (
    initialMealsCount: number,
    defaultLevel: string
  ): MealItem[] => {
    const meals: MealItem[] = new Array(initialMealsCount)
      .fill("")
      .map((_, index) => {
        const mealItemNumber: string = (index + 1).toString();
        return {
          itemId: mealItemNumber,
          tags: ["tag1Id", "tag2Id"],
          difficulityLevel: defaultLevel,
        };
      });
    return meals;
  };

  const difficultyLevels = await fetchDifficultyLevels();
  const defaultLevel =
    difficultyLevels.find((item) => item.level === "Easy")?._id || "";
  const initialMeals = generateInitialMeals(initialMealsCount, defaultLevel);

  return (
    <div>
      <MainTitle title="Randomize meals" />
      <RandomizedMealsForm
        initialMeals={initialMeals}
        initialMealsCount={initialMealsCount}
        difficultyLevels={difficultyLevels}
        defaultLevel={defaultLevel}
      />
    </div>
  );
}
