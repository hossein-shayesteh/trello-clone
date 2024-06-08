"use client";

import React, { ElementRef, useRef, useState } from "react";
import { Board } from "@prisma/client";
import { Button } from "@/src/components/shadcn-ui/button";
import { FormInput } from "@/src/components/form/FormInput";
import { useAction } from "@/src/hooks/useAction";
import { updateBoard } from "@/src/lib/actions/update-board";
import { Check, X } from "lucide-react";
import { useToast } from "@/src/components/shadcn-ui/use-toast";

interface BoardTitleFormProps {
  data: Board; // Props type definition for Board data
}

const BoardTitleForm = ({ data: board }: BoardTitleFormProps) => {
  // State to track if the form is in editing mode
  const [isEditing, setIsEditing] = useState(false);
  // State to manage the board title
  const [title, setTitle] = useState<string>(board.title);

  // Ref for the form element
  const formRef = useRef<ElementRef<"form">>(null);
  // Ref for the input element
  const inputRef = useRef<ElementRef<"input">>(null);

  // Toast hook for displaying notifications
  const { toast } = useToast();

  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            Board &quot;{data.title}&quot; updated.
          </div>
        ),
      });
      setTitle(data.title); // Update the title state with the new title
      disableEditing(); // Disable editing mode
    },
    onError: (error) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <X className={"mr-2"} />
            {error}
          </div>
        ),
      });
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus(); // Focus on the input field
      inputRef.current?.select(); // Select the text in the input field
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = async (formData: FormData) => {
    // Get the new title from the form data
    const newTitle = formData.get("title") as string;

    // Don't execute the function if new title is same with the old one
    if (newTitle === board.title) return;

    // Execute the function to update the board title
    await execute({ title: newTitle, id: board.id });
  };

  const onBlur = () => {
    // Submit the form when the input loses focus
    formRef.current?.requestSubmit();
  };

  // If in editing mode, display the form input
  if (isEditing)
    return (
      <form
        ref={formRef}
        className={"flex items-center gap-x-2"}
        action={onSubmit}
      >
        <FormInput
          ref={inputRef}
          id={"title"}
          onBlur={onBlur}
          defaultValue={title}
          className={
            "h-7 border-none bg-transparent px-2 py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
          }
        />
      </form>
    );

  // If not in editing mode, display the button with the board title
  return (
    <Button
      onClick={enableEditing}
      variant={"transparent"}
      className={"h-auto w-auto p-1 px-2 text-lg font-bold"}
    >
      {title}
    </Button>
  );
};

export default BoardTitleForm;
