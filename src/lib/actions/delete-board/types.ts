import { z } from "zod";
import { Board } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { deleteBoardSchema } from "@/src/lib/actions/delete-board/schema";

export type InputType = z.infer<typeof deleteBoardSchema>;
export type ReturnType = ActionState<InputType, Board>;
