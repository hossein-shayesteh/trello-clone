import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { deleteCardSchema } from "@/src/lib/actions/delete-card/schema";

export type InputType = z.infer<typeof deleteCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
