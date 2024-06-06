import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import { CardWithList } from "@/src/types/prisma";
import { Button } from "@/src/components/shadcn-ui/button";
import { Check, Copy, Trash, X } from "lucide-react";
import { useToast } from "@/src/components/shadcn-ui/use-toast";
import { useAction } from "@/src/hooks/useAction";
import { deleteCard } from "@/src/lib/actions/delete-card";
import { copyCard } from "@/src/lib/actions/copy-card";
import { useParams } from "next/navigation";
import { useCardModal } from "@/src/hooks/useCardModal";

// Interface for the props expected by ModalActions component
interface ModalActionsProps {
  data?: CardWithList;
}

const ModalActions = ({ data }: ModalActionsProps) => {
  // Retrieve modal state from custom hook
  const onClose = useCardModal((state) => state.onClose);

  // Accessing the parameters from the router
  const params = useParams();

  // Hook for using toast
  const { toast } = useToast();

  // Hook for executing deleteCard action
  const { execute: executeDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      // Success callback
      onSuccess: (data) => {
        toast({
          description: (
            <div className={"flex flex-row items-center "}>
              <Check className={"mr-2"} />
              Card &quot;{data.title}&quot; deleted
            </div>
          ),
        });
        onClose();
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
    },
  );

  // Hook for executing copyCard action
  const { execute: executeCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      // Success callback
      onSuccess: (data) => {
        toast({
          description: (
            <div className={"flex flex-row items-center "}>
              <Check className={"mr-2"} />
              Card &quot;{data.title}&quot; copied
            </div>
          ),
        });
        onClose();
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
    },
  );

  // Function to handle card delete
  const onDelete = async () => {
    const boardId = params.boardId as string;

    await executeDelete({ boardId, id: data!.id });
  };

  // Function to handle card copy
  const onCopy = async () => {
    const boardId = params.boardId as string;

    await executeCopy({ boardId, id: data!.id });
  };

  return (
    <div className={"mt-2 space-y-2"}>
      <p className={"text-xs font-semibold"}>Actions</p>
      <Button
        onClick={onCopy}
        disabled={isLoadingCopy}
        size={"inline"}
        variant={"gray"}
        className={"w-full justify-start"}
      >
        <Copy className={"mr-2 h-4 w-4"} />
        Copy
      </Button>
      <Button
        onClick={onDelete}
        disabled={isLoadingDelete}
        size={"inline"}
        variant={"gray"}
        className={"w-full justify-start"}
      >
        <Trash className={"mr-2 h-4 w-4"} />
        Delete
      </Button>
    </div>
  );
};
export default ModalActions;

// Skeleton component to display loading state
ModalActions.Skeleton = function ModalActionsSkeleton() {
  return (
    <div className={"mt-2 space-y-2"}>
      <Skeleton className={"h-4 w-20 bg-neutral-200 "} />
      <Skeleton className={"h-8 w-full bg-neutral-200 "} />
      <Skeleton className={"h-8 w-full bg-neutral-200 "} />
    </div>
  );
};
