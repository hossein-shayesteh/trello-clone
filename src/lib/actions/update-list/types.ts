import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { updateListSchema } from "@/src/lib/actions/update-list/schema";

export type InputType = z.infer<typeof updateListSchema>;
export type ReturnType = ActionState<InputType, List>;
