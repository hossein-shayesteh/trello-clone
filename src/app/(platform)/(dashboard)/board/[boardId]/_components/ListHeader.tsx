"use client";

import { useState, useRef, ElementRef } from "react";
import { List } from "@prisma/client";
import { Check, X } from "lucide-react";
import { useEventListener } from "usehooks-ts";
import { useAction } from "@/src/hooks/useAction";
import { updateList } from "@/src/lib/actions/update-list";
import { useToast } from "@/src/components/shadcn-ui/use-toast";
import { FormInput } from "@/src/components/form/FormInput";
import ListOptions from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListOptions";

// Interface for the props expected by ListHeader component
interface ListHeaderProps {
  data: List;
  onAddCard: () => void;
}

const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
  // State to store title
  const [listTitle, setListTitle] = useState(data.title);

  // State to manage editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Refs for form and input elements
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  // hook for using toast
  const { toast } = useToast();

  // Hook for executing updateList action
  const { execute } = useAction(updateList, {
    // Success callback
    onSuccess: (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            Renamed to &quot;{data.title}&quot;
          </div>
        ),
      });
      setListTitle(data.title);
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
      inputRef.current?.select();
    });
  };

  // Function to disable editing mode
  const disableEditing = () => setIsEditing(false);

  // Event listener for Escape key to submit form
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") formRef.current?.requestSubmit();
  };

  // Function to handle form submission
  const onSubmit = async (formDate: FormData) => {
    const title = formDate.get("title") as string;
    const id = formDate.get("id") as string;
    const boardId = formDate.get("boardId") as string;

    // Prevent form submission if the title hasn't changed
    if (title === listTitle) {
      disableEditing();
      return;
    }

    // If the titles don't match, execute the function with the provided parameters
    await execute({ title, id, boardId });
    disableEditing();
  };

  // Function to handle onBlur event
  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  // Event listener for keydown events
  useEventListener("keydown", onKeyDown);

  // Render the form if in editing mode, otherwise render the title in header
  return (
    <div
      className={
        "flex items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold"
      }
    >
      {isEditing ? (
        <form className={"flex-1 px-0.5"} action={onSubmit} ref={formRef}>
          <input hidden id={"id"} name={"id"} defaultValue={data.id} />
          <input
            hidden
            id={"boardId"}
            name={"boardId"}
            defaultValue={data.boardId}
          />
          <FormInput
            ref={inputRef}
            id={"title"}
            defaultValue={listTitle}
            onBlur={onBlur}
            placeHolder={"Enter list title..."}
            className={
              "h-7 truncate border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input focus:bg-white"
            }
          />
          <button hidden type={"submit"}></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className={
            "w-full border-transparent px-2.5 py-1 text-sm font-medium"
          }
        >
          {listTitle}
        </div>
      )}
      <ListOptions data={data} onAddCard={onAddCard} />
    </div>
  );
};
export default ListHeader;
