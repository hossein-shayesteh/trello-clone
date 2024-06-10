"use client";

import Image from "next/image";
import { Dialog, DialogContent } from "@/src/components/shadcn-ui/dialog";
import { useProModal } from "@/src/hooks/useProModal";
import { Button } from "@/src/components/shadcn-ui/button";
import { useToast } from "@/src/components/shadcn-ui/use-toast";
import { useAction } from "@/src/hooks/useAction";
import { updateList } from "@/src/lib/actions/update-list";
import { Check, X } from "lucide-react";
import { stripeRedirect } from "@/src/lib/actions/stripe-redirect";

// Component to render a modal for displaying card details
const CardModal = () => {
  // Retrieve modal state from custom hook
  const isOpen = useProModal((state) => state.isOpen);
  const onOpen = useProModal((state) => state.onOpen);
  const onClose = useProModal((state) => state.onClose);

  // hook for using toast
  const { toast } = useToast();

  // Hook for executing stripeRedirect action
  const { execute, isLoading } = useAction(stripeRedirect, {
    // Success callback
    onSuccess: (data) => {
      window.location.href = data;
    },
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

  // Execute the stripeRedirect action
  const onClick = async () => {
    await execute({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={"max-w-md overflow-hidden p-0"}>
        <div
          className={"relative flex aspect-video items-center justify-center"}
        >
          <Image
            src={"/payment.svg"}
            alt={"Hero header"}
            fill
            className={"object-cover"}
          />
        </div>
        <div className={"mx-auto space-y-6 p-6 text-neutral-700"}>
          <h2 className={"text-xl font-semibold"}>
            Upgrade to Taskify pro today!
          </h2>
          <p className={"text-xs font-semibold text-neutral-600"}>
            Explore the best of Taskify
          </p>
          <div className={"pl-3"}>
            <ul className={"list-disc text-sm"}>
              <li>Unlimited boards</li>
              <li>Advance checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            variant={"primary"}
            className={"w-full"}
            onClick={onClick}
            disabled={isLoading}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CardModal;
