import { cn } from "@/src/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Logo = () => {
  return (
    <Link href={"/"}>
      <div
        className={cn(
          "hidden items-center justify-center gap-x-2 transition hover:opacity-75 md:flex",
          poppinsFont.className,
        )}
      >
        <Image src={"/Trello.svg"} alt={"Trello logo"} height={30} width={30} />
        <p className={"pb-1 text-lg text-neutral-700"}>Taskify</p>
      </div>
    </Link>
  );
};
export default Logo;
