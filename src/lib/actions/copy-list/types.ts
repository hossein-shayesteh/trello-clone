import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { copyListSchema } from "@/src/lib/actions/copy-list/schema";

export type InputType = z.infer<typeof copyListSchema>;
export type ReturnType = ActionState<InputType, List>;
