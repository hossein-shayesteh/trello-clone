import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { updateCardOrderSchema } from "@/src/lib/actions/update-card-order/schema";

export type InputType = z.infer<typeof updateCardOrderSchema>;
export type ReturnType = ActionState<InputType, Card[]>;
