import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { updateBoardSchema } from "@/src/lib/actions/update-board/schema";

export type InputType = z.infer<typeof updateBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
