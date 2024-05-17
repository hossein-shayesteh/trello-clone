import { z } from "zod";

// Definition for field errors associated with a type T
export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

// Definition for the state of an action, including field errors, general error, and data
export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>, // Zod schema for input validation
  handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>, // Handler function for the action
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    // Validate input data against the provided schema
    const validatedData = schema.safeParse(data);

    // If validation fails, return field-specific error messages
    if (!validatedData.success)
      return {
        fieldErrors: validatedData.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };

    // If validation succeeds, call the handler function with the validated data
    return handler(validatedData.data);
  };
};

export default createSafeAction;
