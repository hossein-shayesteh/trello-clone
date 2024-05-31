"use client";

import { ListWithCards } from "@/src/types/prisma";
import ListWrapper from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListWrapper";
import ListHeader from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListHeader";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: ListItemProps) => {
  return (
    <ListWrapper>
      <div className={"w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"}>
        <ListHeader data={data} />
      </div>
    </ListWrapper>
  );
};
export default ListItem;
