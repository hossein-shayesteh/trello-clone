import { useState, useCallback } from "react";
import { ActionState, FieldErrors } from "@/src/lib/actions/createSafeAction";

type Action<TInput, TOutput> = (
  data: TInput,
) => Promise<ActionState<TInput, TOutput>>;

interface useActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
}

export const useAction = <TInput, TOutput>(
  action: Action<TInput, TOutput>, // The action to be executed
  options: useActionOptions<TOutput> = {}, // Options for the action
) => {
  // State for managing field-specific errors
  const [fieldErrors, setFieldErrors] = useState<
    FieldErrors<TInput> | undefined
  >(undefined);
  // State for managing general error messages
  const [error, setError] = useState<string | undefined>(undefined);
  // State for managing the result data
  const [data, setData] = useState<TOutput | undefined>(undefined);
  // State for managing the loading status
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Function to execute the action
  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);
      try {
        const result = await action(input); // Execute the action with input data
        setFieldErrors(result.fieldErrors); // Set field errors if any

        if (!result) return;

        if (result.error) {
          setError(result.error); // Set general error
          options.onError?.(result.error); // Call onError callback if provided
        }

        if (result.data) {
          setData(result.data); // Set the result data
          options.onSuccess?.(result.data); // Call onSuccess callback if provided
        }
      } finally {
        setIsLoading(false); // Set loading state to false
        options.onComplete?.(); // Call onComplete callback if provided
      }
    },
    [action, options], // Dependencies for useCallback
  );

  return { execute, fieldErrors, data, error, isLoading };
};
