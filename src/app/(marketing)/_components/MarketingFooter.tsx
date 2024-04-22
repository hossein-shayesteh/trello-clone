import Logo from "@/src/components/shared/logo";
import { Button } from "@/src/components/shadcn-ui/button";

const MarketingFooter = () => {
  return (
    <nav className={"fixed bottom-0 w-full border-t bg-slate-100 p-2"}>
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
export default MarketingFooter;
