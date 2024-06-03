import { Card } from "@prisma/client";

// Interface for the props expected by CardItem component
interface CardItemProps {
  index: number;
  data: Card;
}

const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <li
      role={"button"}
      className={
        "truncate rounded-md border-2 border-transparent bg-white px-3 py-2 text-sm shadow-sm transition hover:border-black"
      }
    >
      {data.title}
    </li>
  );
};
export default CardItem;
