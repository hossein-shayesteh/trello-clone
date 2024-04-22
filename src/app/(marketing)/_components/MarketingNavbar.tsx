import Logo from "@/src/components/shared/logo";
import { Button } from "@/src/components/shadcn-ui/button";
import Link from "next/link";

const MarketingNavbar = () => {
  return (
    <nav
      className={
        "fixed top-0 flex h-14 w-full items-center border-b bg-white px-4 shadow-sm"
      }
    >
      <div
        className={
          "mx-auto flex w-full items-center justify-between md:max-w-2xl"
        }
      >
        <Logo />
        <div
          className={
            "flex w-full items-center justify-between space-x-4 md:block md:w-auto"
          }
        >
          <Button variant={"outline"} size={"sm"} asChild>
            <Link href={"/sign-in"}>login</Link>
          </Button>
          <Button variant={"default"} size={"sm"} asChild>
            <Link href={"/sign-up"}>get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};
export default MarketingNavbar;
