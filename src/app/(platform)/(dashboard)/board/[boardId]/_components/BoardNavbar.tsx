import { Board } from "@prisma/client";
import BoardTitleForm from "@/src/app/(platform)/(dashboard)/board/[boardId]/_components/BoardTitleForm";

interface BoardNavbarProps {
  data: Board;
}

const BoardNavbar = async ({ data: board }: BoardNavbarProps) => {
  return (
    <div
      className={
        "fixed top-14 z-40 flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white "
      }
    >
      <BoardTitleForm data={board} />
    </div>
  );
};
export default BoardNavbar;
