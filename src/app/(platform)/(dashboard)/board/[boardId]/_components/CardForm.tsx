"use client";

import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from "react";
import { Button } from "@/src/components/shadcn-ui/button";
import { Check, Plus, X } from "lucide-react";
import { FormTextarea } from "@/src/components/form/FormTextarea";
import FormSubmitButton from "@/src/components/form/FormSubmitButton";
import { useToast } from "@/src/components/shadcn-ui/use-toast";
import { useAction } from "@/src/hooks/useAction";
import { createCard } from "@/src/lib/actions/create-card";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

// Interface for the props expected by CardForm component
interface CardFormProps {
  boardId: string;
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  (
    { disableEditing, isEditing, boardId, enableEditing, listId },
    ref, // Forwarded ref for the textArea element
  ) => {
    // Refs for form
    const formRef = useRef<ElementRef<"form">>(null);

    // hook for using toast
    const { toast } = useToast();

    // Hook for executing updateList action
    const { execute, fieldErrors } = useAction(createCard, {
      // Success callback
      onSuccess: (data) => {
        toast({
          description: (
            <div className={"flex flex-row items-center "}>
              <Check className={"mr-2"} />
              card &quot;{data.title}&quot; created;
            </div>
          ),
        });
        formRef.current?.reset();
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

    // Event listener for Escape key to exit editing mode
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") disableEditing();
    };

    const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
      e,
    ) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        formRef.current?.requestSubmit();
      }
    };

    // Function to handle form submission
    const onSubmit = async (formData: FormData) => {
      const title = formData.get("title") as string;
      const listId = formData.get("listId") as string;
      const boardId = formData.get("boardId") as string;

      await execute({ title, listId, boardId });
    };

    // Event listener for keydown events
    useEventListener("keydown", onKeyDown);
    // Hook to handle clicks outside the form to exit editing mode
    useOnClickOutside(formRef, disableEditing);

    // Render the form if in editing mode, otherwise render the button to add a card
    if (isEditing)
      return (
        <form
          className={"m-1 space-y-4 px-1 py-0.5"}
          ref={formRef}
          action={onSubmit}
        >
          <FormTextarea
            ref={ref}
            id={"title"}
            errors={fieldErrors}
            onKeyDown={onTextareaKeyDown}
            placeHolder={"Enter a title for this card..."}
          />
          <input hidden name={"listId"} id={"listId"} defaultValue={listId} />
          <input
            hidden
            name={"boardId"}
            id={"boardId"}
            defaultValue={boardId}
          />
          <div className={"flex items-center gap-x-1"}>
            <FormSubmitButton>Add card</FormSubmitButton>
            <Button variant={"ghost"} onClick={disableEditing} size={"sm"}>
              <X className={"h-5 w-5"} />
            </Button>
          </div>
        </form>
      );

    return (
      <div className={"px-2 pt-2"}>
        <Button
          size={"sm"}
          variant={"ghost"}
          onClick={enableEditing}
          className={
            "h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
          }
        >
          <Plus className={"mr-2 h-4 w-4"} />
          Add a card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";

export default CardForm;
