"use client";

import { fetcher } from "@/src/lib/fetcher";
import { useQuery } from "@tanstack/react-query";
import { CardWithList } from "@/src/types/prisma";
import { useCardModal } from "@/src/hooks/useCardModal";
import { Dialog, DialogContent } from "@/src/components/shadcn-ui/dialog";
import ModalHeader from "@/src/components/modals/card-modal/header";
import ModalDescription from "@/src/components/modals/card-modal/description";

// Component to render a modal for displaying card details
const CardModal = () => {
  // Retrieve card ID and modal state from custom hook
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onOpen = useCardModal((state) => state.onOpen);
  const onClose = useCardModal((state) => state.onClose);

  // Fetch card data using React Query
  const { data: cardData } = useQuery<CardWithList>({
    queryKey: ["card", id],
    queryFn: () => fetcher(`/api/cards/${id}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <ModalHeader data={cardData} /> : <ModalHeader.Skeleton />}
        <div className={"grid grid-cols-1 md:grid-cols-4 md:gap-4"}>
          <div className={"col-span-3"}>
            <div className={"w-full space-y-6"}>
              {cardData ? (
                <ModalDescription data={cardData} />
              ) : (
                <ModalDescription.Skeleton />
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CardModal;
