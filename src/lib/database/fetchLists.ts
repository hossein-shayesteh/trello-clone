import { db } from "@/src/lib/database/db";

// Fetch a List from database based on its board ID and organization ID
const fetchLists = (boardId: string, orgId: string) => {
  return db.list.findMany({
    where: { boardId, board: { orgId } },
    include: { cards: { orderBy: { order: "asc" } } },
    orderBy: { order: "asc" },
  });
};

export default fetchLists;
