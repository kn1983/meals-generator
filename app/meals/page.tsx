interface Meal {
  id: string;
  author: string;
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
      <h1 className="text-3xl">Meals</h1>
      {meals?.length > 0 && (
        <ul>
          {meals.map((meal, index) => {
            return <li>{meal.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
}
