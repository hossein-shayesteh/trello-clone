import { z } from "zod";

// Defining the Zod schema for board delete action
export const deleteBoardSchema = z.object({
  // board ID
  id: z.string(),
});
