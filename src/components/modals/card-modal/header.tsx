"use client";

import { ElementRef, useRef, useState } from "react";
import { CardWithList } from "@/src/types/prisma";
import { Layout } from "lucide-react";
import { FormInput } from "@/src/components/form/FormInput";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";

// Interface for the props expected by ModalHeader component
interface ModalHeaderProps {
  data?: CardWithList;
}

// Component to render the header section of the card modal
const ModalHeader = ({ data }: ModalHeaderProps) => {
  // Initialize title state with the card's title
  const [title, setTitle] = useState(data!.title);
  const queryClient = useQueryClient();
  const params = useParams();

  // Reference to the input element
  const inputRef = useRef<ElementRef<"input">>(null);

  // Function to handle input blur event
  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  // Function to handle form submission
  const onSubmit = (formData: FormData) => {
    const title = formData.get("title");
    // Handle form submission logic here
    console.log(title);
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
