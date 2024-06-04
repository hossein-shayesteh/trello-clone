"use client";

import { useEffect, useState } from "react";
import { reorder } from "@/src/lib/reorder";
import { ListWithCards } from "@/src/types/prisma";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import ListForm from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListForm";
import ListItem from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/ListItem";
import { useAction } from "@/src/hooks/useAction";
import { updateListOrder } from "@/src/lib/actions/update-list-order";
import { Check, X } from "lucide-react";
import { useToast } from "@/src/components/shadcn-ui/use-toast";

// Interface for the props expected by ListContainer component
interface ListContainerProps {
  boardId: string;
  data: ListWithCards[];
}

// Component to render a container for lists and handle drag-and-drop functionality
const ListContainer = ({ boardId, data }: ListContainerProps) => {
  const [orderedData, setOrderedData] = useState(data);

  // Update state when data changes
  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  // hook for using toast
  const { toast } = useToast();

  // Hook for executing updateListOrder action
  const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
    // Success callback
    onSuccess: (data) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <Check className={"mr-2"} />
            List reordered
          </div>
        ),
      });
    },
    // Error callback
    onError: (error) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <X className={"mr-2"} />
            {error}
          </div>
        ),
      });
    },
  });

  // Handler for drag end event
  const onDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result;

    // Exit if there's no destination
    if (!destination) return;

    // Exit if the item is dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Handle list reordering
    if (type === "list") {
      const items = reorder(orderedData, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index }),
      );
      setOrderedData(items);

      // Execute the server action for updating list order with the provided parameters
      await executeUpdateListOrder({ items, boardId });
    }

    // Handle card reordering
    if (type === "card") {
      let newOrderedData = [...orderedData];

      // Find the source and destination lists
      const sourceList = newOrderedData.find(
        (list) => list.id === source.droppableId,
      );
      const destinationList = newOrderedData.find(
        (list) => list.id === destination.droppableId,
      );

      if (!sourceList || !destinationList) return;

      // Ensure cards exist in the source and destination lists
      if (!sourceList.cards) {
        sourceList.cards = [];
      }
      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      // Moving the card within the same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index,
        );

        // Update the order of cards
        reorderedCards.forEach((card, index) => {
          card.order = index;
        });

        sourceList.cards = reorderedCards;
        setOrderedData(newOrderedData);
      }
      // Moving the card to a different list
      else {
        // Remove the card from the source list
        const [movedCard] = sourceList.cards.splice(source.index, 1);
        movedCard.listId = destination.droppableId;

        // Add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        // Update the order of cards in both lists
        sourceList.cards.forEach((card, index) => {
          card.order = index;
        });
        destinationList.cards.forEach((card, index) => {
          card.order = index;
        });

        setOrderedData(newOrderedData);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={"lists"} type={"list"} direction={"horizontal"}>
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={"flex h-full gap-x-3"}
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm boardId={boardId} />
            <div className={"w-1 flex-shrink-0"} />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ListContainer;
