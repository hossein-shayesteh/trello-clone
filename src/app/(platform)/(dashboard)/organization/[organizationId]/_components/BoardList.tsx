import Link from "next/link";
import { redirect } from "next/navigation";
import { HelpCircle, User2 } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import Hint from "@/src/components/shared/Hint";
import FormPopover from "@/src/components/form/FormPopover";
import fetchBoards from "@/src/lib/database/fetchBoards";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";

const BoardList = async () => {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");

  const boards = await fetchBoards(orgId);

  return (
    <div className={"space-y-4"}>
      <div
        className={"flex items-center text-lg font-semibold text-neutral-700"}
      >
        <User2 className={"mr-2 h-6 w-6"} />
        Your boards
      </div>
      <div className={"grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            className={
              "relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700/30 bg-cover bg-center bg-no-repeat p-2"
            }
            style={{ backgroundImage: `url(${board.imageThumbUrl})` }}
          >
            <div
              className={
                "bg-gl absolute inset-0 bg-black/30 transition hover:bg-black/40"
              }
            />
            <p className={"relative font-semibold text-white"}>{board.title}</p>
          </Link>
        ))}
        <FormPopover sideOffset={10} side={"right"}>
          <div
            className={
              "relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
            }
          >
            <p className={"text-sm"}>Create new board</p>
            <span className={"text-xs"}>5 remaining</span>
            <Hint
              description={`Free workspaces can up to 5 open boards. For unlimited boards upgrade this workspace.`}
              sideOffset={45}
            >
              <HelpCircle
                className={"absolute bottom-2 right-2 h-[14px] w-[14px]"}
              />
            </Hint>
          </div>
        </FormPopover>
      </div>
    </div>
  );
};
export default BoardList;

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className={"space-y-4"}>
      <div
        className={"flex items-center text-lg font-semibold text-neutral-700"}
      >
        <Skeleton className={"mr-2 h-6 w-6"} />
        <Skeleton className={"h-6 w-40"} />
      </div>
      <div className={"grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
        <Skeleton className={"aspect-video h-full w-full p-2"} />
      </div>
    </div>
  );
};
