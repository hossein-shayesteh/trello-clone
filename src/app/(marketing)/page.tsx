import { Medal } from "lucide-react";
import { Button } from "@/src/components/shadcn-ui/button";
import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/src/lib/utils";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MarketingPage = () => {
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <div
        className={cn(
          "flex flex-col items-center justify-center font-bold",
          poppinsFont.className,
        )}
      >
        <div
          className={
            "mb-4 flex items-center justify-center rounded-full bg-amber-100 p-4 uppercase text-amber-700 shadow-sm"
          }
        >
          <Medal className={"mr-2 h-6 w-6"} />
          No 1 task management app
        </div>
        <h1
          className={"mb-6 text-center text-3xl text-neutral-800 md:text-6xl"}
        >
          Taskify helps team move
        </h1>
        <div
          className={
            "w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 pb-4 text-3xl text-white md:text-6xl"
          }
        >
          Work forward.
        </div>
      </div>
      <div
        className={
          "mt-4 max-w-sm text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl"
        }
      >
        Unlock collaboration, project management, and peak productivity for your
        business. Whether in high rises or home offices, your team&apos;s unique
        workflow thrives with Taskify.
      </div>
      <Button className={"mt-6"} size={"lg"} asChild>
        <Link href={""}>Get Taskify for free</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
