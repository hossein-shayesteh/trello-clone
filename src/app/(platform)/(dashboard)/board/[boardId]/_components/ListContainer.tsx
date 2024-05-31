"use client";

import { ListWithCards } from "@/src/types/prisma";
import ListForm from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListForm";
import { useEffect, useState } from "react";
import ListItem from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListItem";

// Interface for the props expected by ListContainer component
interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className={"flex h-full gap-x-3"}>
      {orderedData.map((list, index) => (
        <ListItem key={list.id} index={index} data={list} />
      ))}
      <ListForm boardId={boardId} />
      <div className={"w-1 flex-shrink-0"} />
    </ol>
  );
};
export default ListContainer;
