import { MainTitle } from "../components/MainTitle/MainTitle";

interface Meal {
  id: string;
  authorName: string;
  title: string;
}

const fetchMeals = async (): Promise<Meal[]> => {
  const res = await fetch("http://localhost:3000/api/meals");

  if (!res.ok) {
    throw new Error("Failed to fetch meals");
  }
  return res.json();
};

export default async function Page() {
  const meals: Meal[] = await fetchMeals();

  return (
    <div>
      <MainTitle title="Meals" />
      {meals?.length > 0 && (
        <ul>
          {meals.map((meal) => {
            return (
              <li className="mb-6">
                <div className="mb-1">{meal.title}</div>
                <div className="text-xs italic">Author: {meal.authorName}</div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
