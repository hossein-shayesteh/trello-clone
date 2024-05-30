import { z } from "zod";

// Defining the Zod schema for board update
export const updateBoardSchema = z.object({
  // board title
  title: z
    .string({
      required_error: "Title is required.",
      invalid_type_error: "Title is required.",
    })
    .min(3, {
      message: "Title is too short.",
    }),

  // board ID
  id: z.string(),
});
