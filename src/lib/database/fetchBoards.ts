import { db } from "@/src/lib/database/db";

const fetchBoards = (orgId: string) => {
  // Using the database instance to find many boards that belong to the specified organization
  return db.board.findMany({
    // Condition to filter boards by the organization ID
    where: { orgId: orgId },
    // Sorting the fetched boards by their creation date in descending order
    orderBy: { createdAt: "desc" },
  });
};

export default fetchBoards;
