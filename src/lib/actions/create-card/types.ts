import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { createCardSchema } from "@/src/lib/actions/create-card/schema";

export type InputType = z.infer<typeof createCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
