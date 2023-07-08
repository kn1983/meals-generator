"use client";

import { User } from "@/app/addMeal/page";
import { FormEvent, RefObject, useRef } from "react";

interface AddMealsFormProps {
  users: User[];
}

const AddMealsForm = ({ users }: AddMealsFormProps) => {
  const mealRef: RefObject<HTMLInputElement> = useRef(null);
  const authorRef: RefObject<HTMLSelectElement> = useRef(null);

  const handleSubmitMeal = async (e: FormEvent) => {
    e.preventDefault();

    const meal = mealRef.current?.value;
    const author = authorRef.current?.value;

    if (meal && author) {
      try {
        const response = await fetch("http://localhost:3000/api/addMeal", {
          method: "POST",
          body: JSON.stringify({ author, meal }),
          headers: {
            "content-type": "application/json",
          },
        });
        if (response.status === 200) {
          mealRef.current.value = "";
          authorRef.current.value = "";
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="flex">
      <form className="w-full" onSubmit={handleSubmitMeal}>
        <div className="w-full md:w-3/5">
          <div className="mb-6">
            <label htmlFor="meal" className="pb-2 block">
              Meal
            </label>
            <input
              type="text"
              name="meal"
              id="meal"
              className="block w-full p-2 text-black leading-none border-1"
              ref={mealRef}
              placeholder="Meal"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="author" className="pb-2 block">
              Author
            </label>
            {users?.length > 0 && (
              <select
                id="author"
                name="author"
                className="bg-blue-800 block p-2 leading-none"
                ref={authorRef}
              >
                <option value="" key="select">
                  Select Author
                </option>
                {users.map((user) => {
                  return (
                    <option value={user._id} key={user._id}>
                      {user.userName}
                    </option>
                  );
                })}
              </select>
            )}
          </div>
          <button
            type="submit"
            className="max-sm:w-full block bg-blue-800 hover:bg-blue-900 px-8 py-2 sm:ml-auto"
          >
            Add meal
          </button>
        </div>
      </form>
    </div>
  );
};

export { AddMealsForm };
