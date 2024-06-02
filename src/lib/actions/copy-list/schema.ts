import { z } from "zod";

// Defining the Zod schema for copy list action
export const copyListSchema = z.object({
  // List ID
  id: z.string(),

  // Board ID
  boardId: z.string(),
});
