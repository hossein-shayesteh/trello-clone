"use client";
import { useState, useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { Check, Plus, X } from "lucide-react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormInput } from "@/src/components/form/FormInput";
import FormSubmitButton from "@/src/components/form/FormSubmitButton";
import { Button } from "@/src/components/shadcn-ui/button";
import { useToast } from "@/src/components/shadcn-ui/use-toast";
import ListWrapper from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListWrapper";
import { useAction } from "@/src/hooks/useAction";
import { createList } from "@/src/lib/actions/create-list";

// Interface for the props expected by ListForm component
interface ListFormProps {
  boardId: string;
}

const ListForm = ({ boardId }: ListFormProps) => {
  // State to manage editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Refs for form and input elements
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  // Hook for accessing router
  const router = useRouter();

  // hook for using toast
  const { toast } = useToast();

  // Hook for executing createList action
  const { execute, fieldErrors } = useAction(createList, {
    // Success callback
    onSuccess: (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            List &quot;{data.title}&quot; created.
          </div>
        ),
      });
      disableEditing();
      router.refresh();
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

  // Function to enable editing mode
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  // Function to disable editing mode
  const disableEditing = () => setIsEditing(false);

  // Event listener for Escape key to exit editing mode
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") disableEditing();
  };

  // Function to handle form submission
  const onSubmit = async (formDate: FormData) => {
    const title = formDate.get("title") as string;
    const boardId = formDate.get("boardId") as string;
    await execute({ boardId, title });
  };

  // Event listener for keydown events
  useEventListener("keydown", onKeyDown);
  // Hook to handle clicks outside the form to exit editing mode
  useOnClickOutside(formRef, disableEditing);

  // Render the form if in editing mode, otherwise render the button to add a list
  if (isEditing)
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className={"w-full space-y-4 rounded-md bg-white p-3 shadow-md"}
        >
          <FormInput
            id={"title"}
            errors={fieldErrors}
            ref={inputRef}
            placeHolder={"Enter list title..."}
            className={
              "h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input"
            }
          />
          <input hidden value={boardId} name={"boardId"} />
          <div className={"flex items-center gap-x-1"}>
            <FormSubmitButton>Add list</FormSubmitButton>
            <Button size={"sm"} variant={"ghost"} onClick={disableEditing}>
              <X className={"h-5 w-5"} />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className={
          "flex w-full items-center rounded-md bg-white/80 p-3 text-sm font-medium transition hover:bg-white/50"
        }
      >
        <Plus className={"mr-2 h-4 w-4"} />
        Add a list
      </button>
    </ListWrapper>
  );
};

export default ListForm;
