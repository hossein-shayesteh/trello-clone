import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { createBoardSchema } from "@/src/lib/actions/create-board/schema";

export type InputType = z.infer<typeof createBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
