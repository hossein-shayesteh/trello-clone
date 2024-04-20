import Logo from "@/src/components/shared/logo";
import { Button } from "@/src/components/shadcn-ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav
      className={
        "fixed top-0 h-14 w-full px-4 border-b shadow-sm bg-white flex items-center"
      }
    >
      <div
        className={
          "md:max-w-2xl mx-auto flex items-center justify-between w-full"
        }
      >
        <Logo />
        <div
          className={
            "space-x-4 md:block md:w-auto flex items-center justify-between w-full"
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
export default Navbar;
