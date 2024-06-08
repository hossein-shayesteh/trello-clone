import { Suspense } from "react";
import Info from "@/src/app/(platform)/(dashboard)/organization/[organizationId]/_components/Info";
import { Separator } from "@/src/components/shadcn-ui/separator";
import ActivityList from "@/src/app/(platform)/(dashboard)/organization/[organizationId]/_components/ActivityList";

const ActivityPage = () => {
  return (
    <div className={"w-full "}>
      <Info />
      <Separator className={"my-4"} />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList />
      </Suspense>
    </div>
  );
};
export default ActivityPage;
