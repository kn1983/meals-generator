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
      <h1 className="text-3xl mb-4">Meals</h1>
      {meals?.length > 0 && (
        <ul>
          {meals.map((meal, index) => {
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
