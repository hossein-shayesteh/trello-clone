import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { updateCardSchema } from "@/src/lib/actions/update-card/schema";

export type InputType = z.infer<typeof updateCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
