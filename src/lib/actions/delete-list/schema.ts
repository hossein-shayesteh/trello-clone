import { z } from "zod";

// Defining the Zod schema for list delete action
export const deleteListSchema = z.object({
  // List ID
  id: z.string(),

  // Board ID
  boardId: z.string(),
});
