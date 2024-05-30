import { db } from "@/src/lib/database/db";

// Fetch a board based on its ID and organization ID
const fetchBoards = (id: string, orgId: string) => {
  return db.board.findUnique({
    where: {
      id,
      orgId,
    },
  });
};

export default fetchBoards;
