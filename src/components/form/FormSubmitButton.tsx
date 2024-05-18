"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button, ButtonProps } from "@/src/components/shadcn-ui/button";

const FormSubmitButton = ({
  children,
  className,
  variant,
  disabled,
}: ButtonProps) => {
  const { pending } = useFormStatus(); // Destructuring pending status from useFormStatus

  return (
    <Button
      type={"submit"}
      size={"sm"}
      disabled={pending || disabled} // Disable button if form is pending or disabled
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
};
export default FormSubmitButton;
