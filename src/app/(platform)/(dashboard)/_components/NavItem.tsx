"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { OrganizationResource } from "@clerk/types";
import { Activity, CreditCard, Layout, Settings } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/src/components/shadcn-ui/accordion";
import { Button } from "@/src/components/shadcn-ui/button";

// Define props for the NavItem component
interface Props {
  isActive: boolean; // Flag indicating whether the item is active
  isExpanded: boolean; // Flag indicating whether the item is expanded
  onExpand: any; // Function to handle expansion
  organization: OrganizationResource; // Information about the organization
}

const NavItem = ({ isActive, isExpanded, onExpand, organization }: Props) => {
  // Define navigation routes for the organization
  const routes = [
    {
      label: "Boards",
      icon: <Layout className={"mr-2 h-4 w-4"} />,
      href: `/organization/${organization.id}`,
    },
    {
      label: "Activity",
      icon: <Activity className={"mr-2 h-4 w-4"} />,
      href: `/organization/${organization.id}/activity`,
    },
    {
      label: "Settings",
      icon: <Settings className={"mr-2 h-4 w-4"} />,
      href: `/organization/${organization.id}/settings`,
    },
    {
      label: "Billing",
      icon: <CreditCard className={"mr-2 h-4 w-4"} />,
      href: `/organization/${organization.id}/billing`,
    },
  ];

  // Initialize router for navigation
  const router = useRouter();
  // Get current pathname
  const pathname = usePathname();

  return (
    // Render accordion item for organization navigation
    <AccordionItem value={organization.id} className={"border-none"}>
      {/* Render accordion trigger */}
      <AccordionTrigger
        onClick={() => {
          onExpand(organization.id);
        }}
        className={cn(
          "flex w-full items-center gap-x-2 rounded-md p-1.5 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline",
          isActive && !isExpanded && "bg-sky-500/10 text-sky-700",
        )}
      >
        <div
          className={"relative flex h-7 w-full flex-row  items-center gap-x-2"}
        >
          {/* Render organization image */}
          <Image
            src={organization.imageUrl}
            alt={"organization"}
            className={"rounded-sm object-cover"}
            width={28}
            height={28}
          />
          {/* Render organization name */}
          <span className={"text-sm font-medium"}>{organization.name}</span>
        </div>
      </AccordionTrigger>
      {/* Render accordion content */}
      <AccordionContent
        className={
          "pt-1 text-neutral-700 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        }
      >
        {/* Render navigation buttons */}
        {routes.map((route) => (
          <Button
            key={route.href}
            size={"sm"}
            asChild
            variant={"ghost"}
            className={cn(
              "mb-1 w-full justify-start pl-10 font-normal",
              pathname === route.href && "bg-sky-500/10 text-sky-700",
            )}
          >
            <Link href={route.href}>
              {/* Render navigation icon and label */}
              {route.icon}
              {route.label}
            </Link>
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};

export default NavItem;
