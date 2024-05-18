"use client";

import { useAction } from "@/src/hooks/useAction";
import { createBoard } from "@/src/lib/actions/create-board";
import { FormInput } from "@/src/components/form/FormInput";
import FormSubmitButton from "@/src/components/form/FormSubmitButton";

const Form = () => {
  const { data, error, fieldErrors, execute, isLoading } = useAction(
    createBoard,
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;

    console.log(formData.get("title"));
    await execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className={"flex flex-col space-y-2"}>
        <FormInput id={"title"} errors={fieldErrors} />
        <FormSubmitButton>submit</FormSubmitButton>
      </div>
    </form>
  );
};
export default Form;
