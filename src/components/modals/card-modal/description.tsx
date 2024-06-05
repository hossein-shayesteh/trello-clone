"use client";

import { ElementRef, useRef, useState } from "react";
import { AlignLeft, Check, X } from "lucide-react";
import { CardWithList } from "@/src/types/prisma";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import { useToast } from "@/src/components/shadcn-ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { FormTextarea } from "@/src/components/form/FormTextarea";
import FormSubmitButton from "@/src/components/form/FormSubmitButton";
import { Button } from "@/src/components/shadcn-ui/button";
import { useAction } from "@/src/hooks/useAction";
import { updateCard } from "@/src/lib/actions/update-card";

// Interface for the props expected by ModalDescription component
interface ModalDescriptionProps {
  data?: CardWithList;
}

const ModalDescription = ({ data }: ModalDescriptionProps) => {
  // State to manage editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Refs for form and textarea elements
  const formRef = useRef<ElementRef<"form">>(null);
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  // Accessing query client
  const queryClient = useQueryClient();

  // Accessing the parameters from the router
  const params = useParams();

  // hook for using toast
  const { toast } = useToast();

  // Hook for executing updateCard action
  const { execute, fieldErrors } = useAction(updateCard, {
    // Success callback
    onSuccess: async (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            Card &quot;{data.title}&quot; updated
          </div>
        ),
      });
      await queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      disableEditing();
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
      textareaRef.current?.focus();
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
    const description = formDate.get("description") as string;
    const boardId = params.boardId as string;

    await execute({ description, boardId, id: data!.id });
  };

  // Event listener for keydown events
  useEventListener("keydown", onKeyDown);
  // Hook to handle clicks outside the form to exit editing mode
  useOnClickOutside(formRef, disableEditing);

  return (
    <div className={"flex w-full items-start gap-x-3"}>
      <AlignLeft className={"mt-0.5 h-5 w-5 text-neutral-700"} />
      <div className={"w-full"}>
        <p className={"mb-2 font-semibold text-neutral-700"}>Description</p>
        {isEditing ? (
          <form action={onSubmit} ref={formRef} className={"space-y-2"}>
            <FormTextarea
              errors={fieldErrors}
              id={"description"}
              className={"mt-2 w-full px-3.5 py-3 text-sm"}
              placeHolder={"Add a more detailed description..."}
              defaultValue={data?.description || undefined}
            />
            <div className={"flex items-center gap-x-2"}>
              <FormSubmitButton>Save</FormSubmitButton>
              <Button
                size={"sm"}
                type={"button"}
                variant={"ghost"}
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role={"button"}
            className={
              "min-h-[80px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
            }
          >
            {data?.description || "Add a more detailed description..."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModalDescription;

// Skeleton component to display loading state
ModalDescription.Skeleton = function ModalDescriptionSkeleton() {
  return (
    <div className={"flex w-full items-start gap-x-3"}>
      <Skeleton className={"h-6 w-6 bg-neutral-200"} />
      <div className={"w-full"}>
        <Skeleton className={"mb-2 h-6 w-24 bg-neutral-200"} />
        <Skeleton className={"h-[78px] w-full bg-neutral-200"} />
      </div>
    </div>
  );
};
