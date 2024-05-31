import { z } from "zod";
import { List } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { createListSchema } from "@/src/lib/actions/create-list/schema";

export type InputType = z.infer<typeof createListSchema>;
export type ReturnType = ActionState<InputType, List>;
