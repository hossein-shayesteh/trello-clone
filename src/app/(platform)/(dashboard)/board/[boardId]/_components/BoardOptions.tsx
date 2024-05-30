"use client";

import React from "react";
import { MoreHorizontal, X } from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/shadcn-ui/popover";
import { Button } from "@/src/components/shadcn-ui/button";
import { useAction } from "@/src/hooks/useAction";
import { deleteBoard } from "@/src/lib/actions/delete-board";
import { useToast } from "@/src/components/shadcn-ui/use-toast";

interface BoardOptionsProps {
  id: string; // Props type definition for the board ID
}

const BoardOptions = ({ id }: BoardOptionsProps) => {
  // hook for using toast
  const { toast } = useToast();

  const { execute, isLoading } = useAction(deleteBoard, {
    // Error callback
    onError: (error) => {
      toast({
        description: (
          <div className={"flex flex-row items-center "}>
            <X className={"mr-2"} />
            {error}
          </div>
        ),
      });
    },
  });

  const onDelete = async () => {
    // Execute the deleteBoard action with board ID
    await execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"transparent"} className={"h-auto w-auto p-2"}>
          <MoreHorizontal className={"h-4 w-4"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"px-0 py-3"} side={"bottom"} align={"start"}>
        <div
          className={"pb-4 text-center text-sm font-medium text-neutral-600"}
        >
          Board actions
        </div>

        <PopoverClose asChild>
          <Button
            className={
              "absolute right-2 top-2 h-auto w-auto p-2 text-sm text-neutral-600"
            }
            variant={"ghost"}
          >
            <X className={"h-4 w-4"} />
          </Button>
        </PopoverClose>

        <Button
          onClick={onDelete}
          disabled={isLoading}
          variant={"ghost"}
          className={
            "h-auto w-full justify-start rounded-none p-2 px-5 font-normal"
          }
        >
          delete this board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
export default BoardOptions;
