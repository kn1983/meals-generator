import { AddTags } from "../components/AddTags/AddTags";
import { MainTitle } from "../components/MainTitle/MainTitle";
import { FormElementWrapper } from "../components/formElements/FormElementWrapper/FormElementWrapper";
import { FormWrapper } from "../components/formElements/FormWrapper/FormWrapper";
import { Input, InputType } from "../components/formElements/Input/Input";
import { Label } from "../components/formElements/Label/Label";
import { Select } from "../components/formElements/Select/Select";

export default async function Page() {
  return (
    <div>
      <MainTitle title="Randomize meals" />
      <FormWrapper>
        <FormElementWrapper>
          <Label htmlFor="days" labelText="How many days" />
          <Input type={InputType.NUMBER} name="days" id="days" minValue={1} />
        </FormElementWrapper>
        <div className="border-y-2 py-4">
          <h2 className="text-2xl mb-2">Meal 1</h2>
          <FormElementWrapper>
            <Label htmlFor="difficultyLevel" labelText="Difficulty level" />
            <Select
              id="difficultyLevel"
              name="difficultyLevel"
              items={[
                { key: "item1", value: "easy", text: "Easy" },
                { key: "item2", value: "medium", text: "Medium" },
                { key: "item3", value: "hard", text: "Hard" },
              ]}
            />
          </FormElementWrapper>
          <AddTags />
        </div>
        <div className="border-y-2 py-4">
          <h2 className="text-2xl mb-2">Meal 1</h2>
          <FormElementWrapper>
            <Label htmlFor="difficultyLevel" labelText="Difficulty level" />
            <Select
              id="difficultyLevel"
              name="difficultyLevel"
              items={[
                { key: "item1", value: "easy", text: "Easy" },
                { key: "item2", value: "medium", text: "Medium" },
                { key: "item3", value: "hard", text: "Hard" },
              ]}
            />
          </FormElementWrapper>
          <AddTags />
        </div>
        <div className="border-y-2 py-4">
          <h2 className="text-2xl mb-2">Meal 1</h2>
          <FormElementWrapper>
            <Label htmlFor="difficultyLevel" labelText="Difficulty level" />
            <Select
              id="difficultyLevel"
              name="difficultyLevel"
              items={[
                { key: "item1", value: "easy", text: "Easy" },
                { key: "item2", value: "medium", text: "Medium" },
                { key: "item3", value: "hard", text: "Hard" },
              ]}
            />
          </FormElementWrapper>
          <AddTags />
        </div>
      </FormWrapper>
    </div>
  );
}
