"use client";

import { forwardRef, KeyboardEventHandler } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/src/lib/utils";
import { Textarea } from "@/src/components/shadcn-ui/textarea";
import { Label } from "@/src/components/shadcn-ui/label";
import FormErrors from "@/src/components/form/FromErrors";

// Interface for the props expected by FormTextarea component
interface FormTextareaProps {
  id: string;
  label?: string;
  placeHolder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
}

// FormTextarea component definition using forwardRef
export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeHolder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
      onClick,
      onKeyDown,
    },
    ref, // Forwarded ref for the input element
  ) => {
    const { pending } = useFormStatus(); // Destructuring pending status from useFormStatus

    return (
      <div className={"w-full space-y-2"}>
        <div className={"w-full space-y-1"}>
          {label && (
            <Label
              htmlFor={id}
              className={"text-xs font-semibold text-neutral-700"}
            >
              {label}
            </Label>
          )}
          <Textarea
            id={id}
            ref={ref}
            name={id}
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            disabled={pending || disabled} // Disable input if form is pending or disabled
            required={required}
            placeholder={placeHolder}
            defaultValue={defaultValue}
            className={cn(
              "resize-none shadow-sm outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
              className,
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

// Setting the display name for the FormInput component
FormTextarea.displayName = "FormTextarea";
