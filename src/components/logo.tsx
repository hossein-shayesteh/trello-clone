import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/src/lib/utils";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Logo = () => {
  return (
    <Link href={"/"}>
      <div
        className={cn(
          "hover:opacity-75 transition items-center justify-center gap-x-2 hidden md:flex",
          poppinsFont.className,
        )}
      >
        <Image
          src={"./trello.svg"}
          alt={"trello logo"}
          height={30}
          width={30}
        />
        <p className={"text-lg text-neutral-700 pb-1"}>Taskify</p>
      </div>
    </Link>
  );
};
export default Logo;
