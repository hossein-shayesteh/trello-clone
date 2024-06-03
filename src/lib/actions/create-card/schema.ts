import { z } from "zod";

// Defining the Zod schema for creating a card
export const createCardSchema = z.object({
  // Card title
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, {
      message: "Title is too short.",
    }),

  // Board ID
  boardId: z.string(),

  // List ID
  listId: z.string(),
});
