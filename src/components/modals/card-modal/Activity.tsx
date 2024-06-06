import { Activity } from "lucide-react";
import { AuditLog } from "@prisma/client";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import ActivityItem from "@/src/components/modals/card-modal/ActivityItem";

// Interface for the props expected by ModalActivity component
interface ModalActivityProps {
  data?: AuditLog[];
}

const ModalActivity = ({ data }: ModalActivityProps) => {
  return (
    <div className={"flex w-full items-start gap-x-3"}>
      <Activity className={"mt-0.5 h-5 w-5 text-neutral-700"} />
      <div className={"w-full"}>
        <p className={"mb-2 font-semibold text-neutral-700"}>Activity</p>
        <ol className={"mt-2 space-y-4"}>
          {data?.map((log) => <ActivityItem key={log.id} data={log} />)}
        </ol>
      </div>
    </div>
  );
};
export default ModalActivity;

// Skeleton component to display loading state
ModalActivity.Skeleton = function ModalActivitySkeleton() {
  return (
    <div className={"flex w-full items-start gap-x-3"}>
      <Skeleton className={"h-6 w-6 bg-neutral-200"} />
      <div className={"w-full "}>
        <Skeleton className={"mb-2 h-6 w-24 bg-neutral-200"} />
        <Skeleton className={"h-10 w-full bg-neutral-200"} />
      </div>
    </div>
  );
};
