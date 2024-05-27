import Info from "@/src/app/(platform)/(dashboard)/organization/[organizationId]/_components/Info";
import { Separator } from "@/src/components/shadcn-ui/separator";
import BoardList from "@/src/app/(platform)/(dashboard)/organization/[organizationId]/_components/BoardList";
import { Suspense } from "react";

const OrganizationIdPage = () => {
  return (
    <div className={"mb-20 w-full"}>
      <Info />
      <Separator className={"my-4"} />
      <div className={"px-2 md:px-4"}>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  );
};
export default OrganizationIdPage;
