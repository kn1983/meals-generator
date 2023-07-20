import { MainTitle } from "../components/MainTitle/MainTitle";
import {
  MealItem,
  RandomizedMealsForm,
} from "../components/RandomizedMealsForm/RandomizedMealsForm";
import { generateUniqueId } from "../utils/generateUniqueId/generateUniqueId";

export interface DifficultyLevel {
  _id: string;
  level: string;
}

export interface Tag {
  _id: string;
  tagName: string;
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

  const fetchTags = async (): Promise<Tag[]> => {
    const res = await fetch("http://localhost:3000/api/tags");
    if (!res.ok) {
      throw new Error("Failed to fetch tags");
    }
    return res.json();
  };

  const generateInitialMeals = (
    initialMealsCount: number,
    defaultLevel: string
  ): MealItem[] => {
    const meals: MealItem[] = new Array(initialMealsCount).fill("").map((_) => {
      return {
        itemId: generateUniqueId(),
        tags: [],
        difficulityLevel: defaultLevel,
        mealSuggestion: null,
      };
    });
    return meals;
  };

  const difficultyLevels = await fetchDifficultyLevels();
  const defaultLevel =
    difficultyLevels.find((item) => item.level === "Easy")?._id || "";
  const initialMeals = generateInitialMeals(initialMealsCount, defaultLevel);
  const allTags = await fetchTags();

  return (
    <div>
      <MainTitle title="Randomize meals" />
      <RandomizedMealsForm
        initialMeals={initialMeals}
        initialMealsCount={initialMealsCount}
        difficultyLevels={difficultyLevels}
        defaultLevel={defaultLevel}
        initialTags={allTags}
      />
    </div>
  );
}
