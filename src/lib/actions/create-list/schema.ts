import { z } from "zod";

// Defining the Zod schema for creating a list
export const createListSchema = z.object({
  // List title
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, {
      message: "Title is too short.",
    }),

  // board ID
  boardId: z.string(),
});
