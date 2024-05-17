import { z } from "zod";

// Defining the Zod schema for board creation
export const createBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, {
      message: "Title is too short.",
    }),
});
