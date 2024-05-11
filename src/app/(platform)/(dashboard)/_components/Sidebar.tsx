"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganizationList, useOrganization } from "@clerk/nextjs";
import { Button } from "@/src/components/shadcn-ui/button";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";
import { Accordion } from "@/src/components/shadcn-ui/accordion";
import NavItem from "@/src/app/(platform)/(dashboard)/_components/NavItem";

interface SidebarProps {
  storageKey?: string; // Key to store expanded state in local storage
}

const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  // Use localStorage hook to store expanded state
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  // Fetch active organization and its loading state
  const { organization: activeOrganization, isLoaded: isLoadedOrganization } =
    useOrganization();

  // Fetch user memberships and their loading state
  const { userMemberships, isLoaded: isLoadedOrganizationList } =
    useOrganizationList({ userMemberships: { infinite: true } });

  // Initialize accordion value based on expanded state
  const defaultsAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    [],
  );

  // Function to handle accordion item expansion
  const onExpand = (id: string) => {
    setExpanded((currentValue) => ({ ...currentValue, [id]: !expanded[id] }));
    console.log(expanded);
  };

  // Render skeleton while data is loading
  if (
    !isLoadedOrganization ||
    !isLoadedOrganizationList ||
    userMemberships.isLoading
  )
    return <Skeleton className={"h-6 w-40"} />;
  return (
    <>
      {/* Render workspace header with add workspace button */}
      <div className={"mb-1 flex items-center text-xs font-medium"}>
        <span className={"pl-4"}>Workspaces</span>
        <Button
          asChild
          type={"button"}
          size={"icon"}
          variant={"ghost"}
          className={"ml-auto"}
        >
          <Link href={"/select-org"}>
            <Plus className={"h-4 w-4"} />
          </Link>
        </Button>
      </div>
      {/* Render accordion for organization navigation */}
      <Accordion
        type={"multiple"}
        defaultValue={defaultsAccordionValue}
        className={"space-y-2"}
      >
        {/* Map through user memberships and render NavItem for each organization */}
        {userMemberships.data?.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            onExpand={onExpand}
            organization={organization}
          />
        ))}
      </Accordion>
    </>
  );
};

export default Sidebar;
