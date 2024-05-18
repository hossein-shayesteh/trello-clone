"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import FormErrors from "@/src/components/form/FromErrors";
import { Label } from "@/src/components/shadcn-ui/label";
import { Input } from "@/src/components/shadcn-ui/input";
import { cn } from "@/src/lib/utils";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeHolder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

// FormInput component definition using forwardRef
export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      className,
      defaultValue = "",
      disabled,
      errors,
      label,
      onBlur,
      placeHolder,
      required,
      type,
    },
    ref, // Forwarded ref for the input element
  ) => {
    const { pending } = useFormStatus(); // Destructuring pending status from useFormStatus

    return (
      <div className={"space-y-2"}>
        <div className={"space-y-1"}>
          {label && (
            <Label
              htmlFor={id}
              className={"text-xs font-semibold text-neutral-700"}
            >
              {label}
            </Label>
          )}
          <Input
            id={id}
            name={id}
            ref={ref}
            type={type}
            onBlur={onBlur}
            disabled={pending || disabled} // Disable input if form is pending or disabled
            required={required}
            placeholder={placeHolder}
            defaultValue={defaultValue}
            className={cn("h-7 px-2 py-1 text-sm", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  },
);

// Setting the display name for the FormInput component
FormInput.displayName = "FormInput";
