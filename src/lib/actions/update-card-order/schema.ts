import { z } from "zod";

/// Defining the Zod schema for updating the order of a card
export const updateCardOrderSchema = z.object({
  // Object representing card items with their attributes
  items: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      order: z.number(),
      listId: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
    }),
  ),

  // Identifier for the board that the card belongs to
  boardId: z.string(),
});
