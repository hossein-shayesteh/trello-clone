"use client";

import { ListWithCards } from "@/src/types/prisma";
import ListForm from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListForm";

// Interface for the props expected by ListContainer component
interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  return (
    <ol>
      <ListForm boardId={boardId} />
      <div className={"w-1 flex-shrink-0"} />
    </ol>
  );
};
export default ListContainer;
