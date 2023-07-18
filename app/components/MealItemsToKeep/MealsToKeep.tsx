import { RandomizedMealItem } from "../RandomizedMealsForm/RandomizedMealsForm";

const MealItemsToKeep = ({
  mealsToKeep,
}: {
  mealsToKeep: RandomizedMealItem[];
}) => {
  return (
    <>
      <h2 className="mb-2">Meals to keep</h2>
      <div className="bg-gray-900 p-5 rounded-lg">
        <ul>
          {mealsToKeep.map((meal) => {
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
      </div>
    </>
  );
};

export { MealItemsToKeep };
