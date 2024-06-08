import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import fetchAuditLogs from "@/src/lib/database/fetchAuditLogs";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import ActivityItem from "@/src/components/modals/card-modal/ActivityItem";

const ActivityList = async () => {
  // Get organization ID from authentication context
  const { orgId } = auth();

  // Redirect to "select-org" if organization ID is not found
  if (!orgId) redirect("select-org");

  // Fetch audit logs for the organization
  const auditLogs = await fetchAuditLogs(orgId);

  return (
    <ol className={"mt-2 space-y-4"}>
      <p
        className={
          "hidden text-center text-xs text-muted-foreground last:block"
        }
      >
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} data={log} />
      ))}
    </ol>
  );
};
export default ActivityList;

// Skeleton component to display loading state
ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className={"mt-4 space-y-4"}>
      <Skeleton className={"h-10 w-[80%]"} />
      <Skeleton className={"h-10 w-[50%]"} />
      <Skeleton className={"h-10 w-[70%]"} />
      <Skeleton className={"h-10 w-[60%]"} />
      <Skeleton className={"h-10 w-[80%]"} />
      <Skeleton className={"h-10 w-[75%]"} />
    </ol>
  );
};
