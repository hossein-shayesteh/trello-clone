import { Button } from "@/src/components/shadcn-ui/button";
import Logo from "@/src/components/shared/logo";
import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const DashboardNavbar = () => {
  return (
    <div
      className={
        "fixed top-0 z-50 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm"
      }
    >
      {/* TODO: mobile sidebar*/}
      <div className={"flex items-center gap-x-4 "}>
        <div className={"hidden md:flex"}>
          <Logo />
        </div>
        <Button
          variant={"primary"}
          size={"sm"}
          className={"hidden h-auto rounded-sm px-2 py-1.5 md:block"}
        >
          Create
        </Button>
        <Button size={"sm"} className={"block rounded-sm md:hidden "}>
          <Plus className={"h-4 w-4"} />
        </Button>
      </div>
      <div className={"ml-auto flex items-center gap-x-2"}>
        <OrganizationSwitcher
          hidePersonal
          afterCreateOrganizationUrl={"/organization/:id"}
          afterSelectOrganizationUrl={"/organization/:id"}
          afterLeaveOrganizationUrl={"/select-org"}
        />
        <UserButton afterSignOutUrl={"/"} />
      </div>
    </div>
  );
};
export default DashboardNavbar;
