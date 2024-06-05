import { z } from "zod";

// Defining the Zod schema for copy card action
export const copyCardSchema = z.object({
  // Card ID
  id: z.string(),

  // Board ID
  boardId: z.string(),
});
