import { z } from "zod";

// Defining the Zod schema for card update
export const updateCardSchema = z.object({
  // card title
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, {
      message: "Title is too short.",
    }),

  // Card description
  description: z.optional(
    z.string({
      required_error: "Description is required.",
      invalid_type_error: "Description is required.",
    }),
  ),

  //Card ID
  id: z.string(),

  // Board ID
  boardId: z.string(),
});
