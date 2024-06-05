import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { copyCardSchema } from "@/src/lib/actions/copy-card/schema";

export type InputType = z.infer<typeof copyCardSchema>;
export type ReturnType = ActionState<InputType, Card>;
