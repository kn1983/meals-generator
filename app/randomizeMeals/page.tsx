import { MainTitle } from "../components/MainTitle/MainTitle";
import {
  MealItem,
  RandomizedMealsForm,
} from "../components/RandomizedMealsForm/RandomizedMealsForm";

export default async function Page() {
  const initialMealsCount = 5;

  const generateInitialMeals = (initialMealsCount: number): MealItem[] => {
    const meals: MealItem[] = new Array(initialMealsCount)
      .fill("")
      .map((_, index) => {
        const mealItemNumber: string = (index + 1).toString();
        return {
          itemId: mealItemNumber,
          tags: ["tag1Id", "tag2Id"],
          difficulityLevel: "level id",
        };
      });
    return meals;
  };

  const initialMeals = generateInitialMeals(initialMealsCount);

  return (
    <div>
      <MainTitle title="Randomize meals" />
      <RandomizedMealsForm
        initialMeals={initialMeals}
        initialMealsCount={initialMealsCount}
      />
    </div>
  );
}
