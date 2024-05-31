import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import fetchLists from "@/src/lib/database/fetchLists";
import ListContainer from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListContainer";

interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = async ({ params: { boardId } }: BoardPageProps) => {
  // get organization ID
  const { orgId } = auth();

  // If organization ID is missing, redirect to select organization page
  if (!orgId) redirect("/select-org");

  // Fetch the lists details based on board ID and organization ID
  const lists = await fetchLists(boardId, orgId);

  return (
    <div className={"h-full overflow-x-auto p-4"}>
      <ListContainer boardId={boardId} data={lists} />
    </div>
  );
};

export default BoardPage;
