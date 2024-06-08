import { z } from "zod";

import { ActionState } from "@/src/lib/actions/createSafeAction";
import { StripeRedirectSchema } from "@/src/lib/actions/stripe-redirect/schema";

export type InputType = z.infer<typeof StripeRedirectSchema>;
export type ReturnType = ActionState<InputType, string>;
