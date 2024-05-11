"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/src/components/shadcn-ui/sheet";
import { Button } from "@/src/components/shadcn-ui/button";
import { useMobileSidebar } from "@/src/hooks/useMobileSidebar";
import Sidebar from "./Sidebar";

const MobileSidebar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  // Retrieve state and functions from the mobile sidebar custom hook
  const isOpen = useMobileSidebar((state) => state.isOpen);
  const onOpen = useMobileSidebar((state) => state.onOpen);
  const onClose = useMobileSidebar((state) => state.onClose);

  // Close the sidebar when the pathname changes
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent hydration with useEffect until component is mounted
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // If the component is not yet mounted, return null to prevent rendering
  if (!isMounted) return null;

  return (
    <>
      {/* Button to toggle the mobile sidebar */}
      <Button
        onClick={onOpen}
        variant={"ghost"}
        className={"mr-4 md:hidden"}
        size={"sm"}
      >
        <Menu className={"h-4 w-4"} />
      </Button>
      {/* Mobile sidebar */}
      <div className={"md:hidden"}>
        <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent side={"left"} className={"pt-10"}>
            {/* Render the Sidebar component within the mobile sidebar */}
            <Sidebar storageKey={"t-mobile-sidebar-state"} />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default MobileSidebar;
