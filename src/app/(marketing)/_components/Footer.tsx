import Logo from "@/src/components/shared/logo";
import { Button } from "@/src/components/shadcn-ui/button";

const Footer = () => {
  return (
    <nav className={"fixed bottom-0 w-full border-t bg-slate-100 p-2"}>
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
          <Button variant={"ghost"} size={"sm"}>
            Privacy Policy
          </Button>
          <Button variant={"ghost"} size={"sm"}>
            Term of services
          </Button>
        </div>
      </div>
    </nav>
  );
};
export default Footer;
