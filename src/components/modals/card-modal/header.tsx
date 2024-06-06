"use client";

import { ElementRef, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Check, Layout, X } from "lucide-react";
import { CardWithList } from "@/src/types/prisma";
import { useQueryClient } from "@tanstack/react-query";
import { useAction } from "@/src/hooks/useAction";
import { updateCard } from "@/src/lib/actions/update-card";
import { FormInput } from "@/src/components/form/FormInput";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import { useToast } from "@/src/components/shadcn-ui/use-toast";

// Interface for the props expected by ModalHeader component
interface ModalHeaderProps {
  data?: CardWithList;
}

// Component to render the header section of the card modal
const ModalHeader = ({ data }: ModalHeaderProps) => {
  // Initialize title state with the card's title
  const [title, setTitle] = useState(data!.title);

  // Reference to the input element
  const inputRef = useRef<ElementRef<"input">>(null);

  // Accessing query client
  const queryClient = useQueryClient();

  // Accessing the parameters from the router
  const params = useParams();

  // hook for using toast
  const { toast } = useToast();

  // Hook for executing updateCard action
  const { execute } = useAction(updateCard, {
    // Success callback
    onSuccess: async (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            Renamed to &quot;{data.title}&quot;
          </div>
        ),
      });

      // Revalidate queries to update card data and activity log
      await queryClient.invalidateQueries({
        queryKey: ["card", data.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["card-logs", data.id],
      });

      // Update the card title
      setTitle(data.title);
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

  // Function to handle input blur event
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  // Function to handle form submission
  const onSubmit = async (formData: FormData) => {
    // Extract title and boardId from form data and params
    const title = formData.get("title") as string;
    const boardId = params.boardId as string;

    // Prevent form submission if title didn't change
    if (title === data?.title) return;

    // Handle form submission logic here
    await execute({ title, boardId, id: data!.id });
  };

  return (
    <div className={"mb-6 flex w-full items-start gap-x-3"}>
      <Layout className={"mt-1 h-5 w-5 text-neutral-700"} />
      <div className={"w-full"}>
        <form action={onSubmit}>
          <FormInput
            id={"title"}
            ref={inputRef}
            onBlur={onBlur}
            defaultValue={title}
            className={
              "relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white"
            }
          />
        </form>
        <p className={"text-sm text-muted-foreground"}>
          In list <span className={"underline"}>{title}</span>
        </p>
      </div>
    </div>
  );
};

export default ModalHeader;

// Skeleton component to display loading state
ModalHeader.Skeleton = function HeaderSkeleton() {
  return (
    <div className={"mb-6 flex items-start gap-x-3 "}>
      <Skeleton className={"mt-1 h-6 w-6 bg-neutral-200"} />
      <div>
        <Skeleton className={"mb-1 h-6 w-24 bg-neutral-200"} />
        <Skeleton className={"h-4 w-24 bg-neutral-200"} />
      </div>
    </div>
  );
};
