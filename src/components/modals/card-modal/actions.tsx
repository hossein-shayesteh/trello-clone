import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import { CardWithList } from "@/src/types/prisma";
import { Button } from "@/src/components/shadcn-ui/button";
import { Copy, Trash } from "lucide-react";

// Interface for the props expected by ModalActions component
interface ModalActionsProps {
  data?: CardWithList;
}

const ModalActions = ({ data }: ModalActionsProps) => {
  return (
    <div className={"mt-2 space-y-2"}>
      <p className={"text-xs font-semibold"}>Actions</p>
      <Button
        size={"inline"}
        variant={"gray"}
        className={"w-full justify-start"}
      >
        <Copy className={"mr-2 h-4 w-4"} />
        Copy
      </Button>
      <Button
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
