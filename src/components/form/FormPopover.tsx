"use client";

import React from "react";
import { Check, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/src/components/shadcn-ui/popover";
import { useToast } from "@/src/components/shadcn-ui/use-toast";

import { useAction } from "@/src/hooks/useAction";
import { createBoard } from "@/src/lib/actions/create-board";
import { FormInput } from "@/src/components/form/FormInput";
import FormSubmitButton from "@/src/components/form/FormSubmitButton";
import { Button } from "@/src/components/shadcn-ui/button";

// Props for the FormPopover component
interface FormPopoverProps {
  children: React.ReactNode; // Content that triggers the popover
  side?: "left" | "right" | "top" | "bottom"; // Position of the popover relative to the trigger
  align?: "start" | "center" | "end"; // Alignment of the popover
  sideOffset?: number; // Offset value for adjusting the popover position
}

const FormPopover = ({
  align,
  children,
  side,
  sideOffset,
}: FormPopoverProps) => {
  const { toast } = useToast();

  const { fieldErrors, execute } = useAction(createBoard, {
    // Success callback
    onSuccess: (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            Board created.
          </div>
        ),
      });
    },
    // Error callback
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

  const onSubmit = async (formData: FormData) => {
    const title = formData.get("title") as string;
    // Execute the createBoard action with the form data
    await execute({ title });
  };

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={"w-80 pt-3"}
      >
        <div
          className={"pb-4 text-center text-sm font-medium text-neutral-600"}
        >
          Create board
        </div>
        <PopoverClose asChild>
          <Button
            className={
              "absolute right-2 top-2 h-auto w-auto p-2 text-neutral-600"
            }
            variant={"ghost"}
          >
            <X className={"h-4 w-4"} />
          </Button>
        </PopoverClose>
        <form className={"space-y-4"} action={onSubmit}>
          <div className={"space-y-4"}>
            <FormInput
              id={"title"}
              label={"Board title"}
              type={"text"}
              errors={fieldErrors} // Error handling for the input field
            />
          </div>
          <FormSubmitButton className={"w-full"}>Create</FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default FormPopover;
