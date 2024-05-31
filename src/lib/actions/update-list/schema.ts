import { z } from "zod";

// Defining the Zod schema for list update
export const updateListSchema = z.object({
  // list title
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, {
      message: "Title is too short.",
    }),

  // list ID
  id: z.string(),

  // Board ID
  boardId: z.string(),
});
