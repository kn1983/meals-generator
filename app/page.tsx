import { MainTitle } from "./components/MainTitle/MainTitle";
import { SimpleRandomizeMealsForm } from "./components/SimpleRandomizeMealsForm/SimpleRandomizeMealsForm";

export default async function Home() {
  return (
    <div>
      <MainTitle title="Randomize meals" />
      <div>
        <SimpleRandomizeMealsForm />
      </div>
    </div>
  );
}
