import { z } from "zod";

/// Defining the Zod schema for updating the order of a list
export const updateListOrderSchema = z.object({
  // Object representing list items with their attributes
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),

  // Identifier for the board that the list belongs to
  boardId: z.string(),
});
