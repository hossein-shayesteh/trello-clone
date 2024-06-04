import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { updateListOrderSchema } from "@/src/lib/actions/update-list-order/schema";

export type InputType = z.infer<typeof updateListOrderSchema>;
export type ReturnType = ActionState<InputType, List[]>;
