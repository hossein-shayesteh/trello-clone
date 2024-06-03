"use client";

import { useState, useRef, ElementRef } from "react";
import { ListWithCards } from "@/src/types/prisma";
import { cn } from "@/src/lib/utils";
import CardForm from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/CardForm";
import ListHeader from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListHeader";
import ListWrapper from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListWrapper";
import CardItem from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/CardItem";

// Interface for the props expected by ListItem component
interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: ListItemProps) => {
  // State to manage editing mode
  const [isEditing, setIsEditing] = useState(false);

  // Refs for textarea elements
  const textareaRef = useRef<ElementRef<"textarea">>(null);

  // Function to enable editing mode
  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  // Function to disable editing mode
  const disableEditing = () => setIsEditing(false);

  return (
    <ListWrapper>
      <div className={"w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md"}>
        <ListHeader data={data} onAddCard={enableEditing} />
        <ol
          className={cn(
            "mx-1 flex flex-col gap-y-2 py-0.5",
            data.cards.length > 0 ? "mt-2 " : "mt-0",
          )}
        >
          {data.cards.map((card, index) => (
            <CardItem key={card.id} index={index} data={card}></CardItem>
          ))}
        </ol>
        <CardForm
          listId={data.id}
          boardId={data.boardId}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </ListWrapper>
  );
};
export default ListItem;
