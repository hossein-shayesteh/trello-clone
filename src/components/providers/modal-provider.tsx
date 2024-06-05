"use client";

import { useEffect, useState } from "react";
import CardModal from "@/src/components/modals/card-modal";

// Component to manage modal rendering on the client side
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Set isMounted to true to prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Render CardModal only when component is mounted to prevent hydration errors
  if (!isMounted) return null;

  return (
    <>
      <CardModal />
    </>
  );
};
export default ModalProvider;
