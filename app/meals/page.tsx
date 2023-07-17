import { MainTitle } from "../components/MainTitle/MainTitle";
import { Tag } from "../randomizeMeals/page";

export interface Meal {
  _id: string;
  authorName: string;
  title: string;
  difficultyLevel: string;
  tags: Tag[];
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
              <li className="mb-6" key={meal._id}>
                <div className="mb-1 text-pink-500">{meal.title}</div>
                <div className="mb-2 text-xs">
                  <span className="font-bold">Difficulty level:</span>{" "}
                  <span className="italic">{meal.difficultyLevel}</span>
                </div>
                {meal.tags.length > 0 && (
                  <div className="flex text-xs ">
                    <div className="mb-2 font-bold">Taggar:&nbsp;</div>
                    <ul className="flex gap-x-2 mb-2">
                      {meal.tags.map((tag) => {
                        return (
                          <li key={tag._id} className="italic">
                            {tag.tagName}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className="text-xs">
                  <span className="font-bold">Author:</span>{" "}
                  <span className="italic">{meal.authorName}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
