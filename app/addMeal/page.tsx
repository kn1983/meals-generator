import React, { FormEvent, RefObject, useRef } from "react";
import { MainTitle } from "../components/MainTitle/MainTitle";
import { AddMealsForm } from "../components/AddMealForm/AddMealForm";
import { DifficultyLevel, Tag } from "../randomizeMeals/page";

export interface User {
  _id: string;
  userName: string;
}

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch("http://localhost:3000/api/users");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
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

const fetchDifficultyLevels = async (): Promise<DifficultyLevel[]> => {
  const res = await fetch("http://localhost:3000/api/difficultyLevels");

  if (!res.ok) {
    throw new Error("Failed to fetch difficulty levels");
  }
  return res.json();
};

export default async function Page() {
  const users: User[] = await fetchUsers();
  const difficulityLevels: DifficultyLevel[] = await fetchDifficultyLevels();
  const initialTags: Tag[] = await fetchTags();

  return (
    <div>
      <MainTitle title="Add meal" />
      <AddMealsForm
        users={users}
        difficultyLevels={difficulityLevels}
        initialTags={initialTags}
      />
    </div>
  );
}
