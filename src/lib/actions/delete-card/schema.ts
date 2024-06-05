import { z } from "zod";

// Defining the Zod schema for delete card action
export const deleteCardSchema = z.object({
  // Card ID
  id: z.string(),

  // Board ID
  boardId: z.string(),
});
