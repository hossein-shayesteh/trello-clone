import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/shadcn-ui/tooltip";

interface HintProps {
  children: React.ReactNode; // Content that triggers the tooltip
  description: string; // Description text displayed in the tooltip
  side?: "left" | "right" | "top" | "bottom"; // Position of the tooltip relative to the trigger
  sideOffset?: number; // Offset value for adjusting the tooltip position
}

const Hint = ({
  children,
  description,
  side = "bottom",
  sideOffset = 0,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className={"max-w-[220px] break-words text-xs"}
        >
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
export default Hint;
