"use client";

import { useState, useRef, ElementRef } from "react";
import { ListWithCards } from "@/src/types/prisma";
import ListWrapper from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListWrapper";
import ListHeader from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListHeader";
import CardForm from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/CardForm";

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
