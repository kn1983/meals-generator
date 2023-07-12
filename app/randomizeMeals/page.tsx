import { AddTags } from "../components/ManageTags/ManageTags";
import { MainTitle } from "../components/MainTitle/MainTitle";
import { MealSettings } from "../components/MealSettings/MealSettings";
import { FormElementWrapper } from "../components/formElements/FormElementWrapper/FormElementWrapper";
import { FormWrapper } from "../components/formElements/FormWrapper/FormWrapper";
import { Input, InputType } from "../components/formElements/Input/Input";
import { Label } from "../components/formElements/Label/Label";
import { RandomizedMealsForm } from "../components/RandomizedMealsForm/RandomizedMealsForm";

export default async function Page() {
  return (
    <div>
      <MainTitle title="Randomize meals" />
      <RandomizedMealsForm />
    </div>
  );
}
