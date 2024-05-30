import React from "react";
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import fetchBoard from "@/src/lib/database/fetchBoard";
import { startCase } from "lodash";
import BoardNavbar from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/BoardNavbar";

interface BoardIdLayoutProps {
  children: React.ReactNode;
  params: {
    boardId: string;
  };
}

// generate metadata for the board
export async function generateMetadata({
  params: { boardId },
}: {
  params: { boardId: string };
}) {
  // get organization ID
  const { orgId } = auth();

  // Fetch the board details based on board ID and organization ID
  const board = await fetchBoard(boardId, orgId!);

  // generate metadata
  return { title: startCase(board?.title!) || "Board" };
}

// Layout component for board
const BoardIdLayout = async ({
  children,
  params: { boardId },
}: BoardIdLayoutProps) => {
  // get organization ID
  const { orgId } = auth();

  // If organization ID is missing, redirect to select organization page
  if (!orgId) redirect("/select-org");

  // Fetch the board details based on board ID and organization ID
  const board = await fetchBoard(boardId, orgId);

  // If the board is not found, return a 404 page
  if (!board) notFound();

  // Render the board layout
  return (
    <div
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
      className={"relative h-full bg-cover bg-center bg-no-repeat"}
    >
      <BoardNavbar data={board} />
      <div className={"absolute h-full w-full bg-black/10"} />
      <main className={"relative h-full  pt-28"}>{children}</main>
    </div>
  );
};

export default BoardIdLayout;
