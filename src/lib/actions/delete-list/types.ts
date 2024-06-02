import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { deleteListSchema } from "@/src/lib/actions/delete-list/schema";

export type InputType = z.infer<typeof deleteListSchema>;
export type ReturnType = ActionState<InputType, List>;
