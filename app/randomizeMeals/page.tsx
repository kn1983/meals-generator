import { AddTags } from "../components/ManageTags/ManageTags";
import { MainTitle } from "../components/MainTitle/MainTitle";
import { MealSettings } from "../components/MealSettings/MealSettings";
import { FormElementWrapper } from "../components/formElements/FormElementWrapper/FormElementWrapper";
import { FormWrapper } from "../components/formElements/FormWrapper/FormWrapper";
import { Input, InputType } from "../components/formElements/Input/Input";
import { Label } from "../components/formElements/Label/Label";

export default async function Page() {
  return (
    <div>
      <MainTitle title="Randomize meals" />
      {/* <FormWrapper> */}
      <div className="w-1/4">
        <FormElementWrapper>
          <Label htmlFor="days" labelText="How many days" />
          <Input type={InputType.NUMBER} name="days" id="days" minValue={1} />
        </FormElementWrapper>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:justify-between">
        <MealSettings />
        <MealSettings />
        <MealSettings />
        <MealSettings />
      </div>
      {/* </FormWrapper> */}
    </div>
  );
}
