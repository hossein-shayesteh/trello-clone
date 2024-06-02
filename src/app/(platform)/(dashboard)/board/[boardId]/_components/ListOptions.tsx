"use client";

import React, { ElementRef, useRef } from "react";
import { List } from "@prisma/client";
import { Check, MoreHorizontal, X } from "lucide-react";
import { useAction } from "@/src/hooks/useAction";
import { deleteList } from "@/src/lib/actions/delete-list";
import { copyList } from "@/src/lib/actions/copy-list";
import {
  Popover,
  PopoverContent,
  PopoverClose,
  PopoverTrigger,
} from "@/src/components/shadcn-ui/popover";
import { Separator } from "@/src/components/shadcn-ui/separator";
import { Button } from "@/src/components/shadcn-ui/button";
import { useToast } from "@/src/components/shadcn-ui/use-toast";
import FormSubmitButton from "@/src/components/form/FormSubmitButton";

// Interface for the props expected by ListOptions component
interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  // Ref for closing the Popover
  const closeRef = useRef<ElementRef<"button">>(null);

  // hook for using toast
  const { toast } = useToast();

  // Hook for executing deleteList action
  const { execute: executeDelete } = useAction(deleteList, {
    // Success callback
    onSuccess: (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            List &quot;{data.title}&quot; deleted.
          </div>
        ),
      });
      closePopover();
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

  // Hook for executing copyList action
  const { execute: executeCopy } = useAction(copyList, {
    // Success callback
    onSuccess: (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            List &quot;{data.title}&quot; copied.
          </div>
        ),
      });
      closePopover();
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

  // Function to close the Popover
  const closePopover = () => closeRef.current?.click();

  // Function to handle delete list
  const onDelete = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    await executeDelete({ id, boardId });
  };

  // Function to handle copy list
  const onCopy = async (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    await executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className={"h-auto w-auto p-2"}>
          <MoreHorizontal className={"h-4 w-4"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent side={"bottom"} className={"px-0 py-3 "} align={"start"}>
        <div
          className={"pb-4 text-center text-sm font-medium text-neutral-600"}
        >
          List Actions
        </div>
        <PopoverClose asChild ref={closeRef}>
          <Button
            className={
              "absolute right-2 top-2 h-auto w-auto p-2 text-sm text-neutral-600"
            }
            variant={"ghost"}
          >
            <X className={"h-4 w-4"} />
          </Button>
        </PopoverClose>
        <Button
          variant={"ghost"}
          className={
            "h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
          }
        >
          Add card...
        </Button>
        <form action={onCopy}>
          <input hidden id={"id"} name={"id"} defaultValue={data.id} />
          <input
            hidden
            id={"boardId"}
            name={"boardId"}
            defaultValue={data.boardId}
          />
          <FormSubmitButton
            className={
              "h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            }
            variant={"ghost"}
          >
            Copy list...
          </FormSubmitButton>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden id={"id"} name={"id"} defaultValue={data.id} />
          <input
            hidden
            id={"boardId"}
            name={"boardId"}
            defaultValue={data.boardId}
          />
          <FormSubmitButton
            className={
              "h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
            }
            variant={"ghost"}
          >
            Delete this list
          </FormSubmitButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
export default ListOptions;
