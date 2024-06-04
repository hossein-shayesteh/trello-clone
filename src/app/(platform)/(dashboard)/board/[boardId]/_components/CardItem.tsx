import { Card } from "@prisma/client";
import { Draggable, Droppable } from "@hello-pangea/dnd";

// Interface for the props expected by CardItem component
interface CardItemProps {
  index: number; // Index of the card in the list
  data: Card; // Data for the card, following the Card type
}

// Functional component representing an individual draggable card item
const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role={"button"}
          className={
            "truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm transition hover:border-black"
          }
        >
          {data.title}
        </li>
      )}
    </Draggable>
  );
};
export default CardItem;
