"use client";

import { useOrganization } from "@clerk/nextjs";
import Image from "next/image";
import { CreditCard } from "lucide-react";
import { Skeleton } from "@/src/components/shadcn-ui/skeleton";

const Info = () => {
  const { organization, isLoaded } = useOrganization();

  // Render skeleton component if organization data is not loaded yet
  if (!isLoaded) return <Info.Skeleton />;

  return (
    <div className={"flex items-center gap-x-4"}>
      <div className={"relative h-[60px] w-[60px]"}>
        <Image
          src={organization?.imageUrl!}
          alt={"organization"}
          fill
          className={"rounded-md object-cover"}
        />
      </div>
      <div className={"space-y-1"}>
        <p className={"text-xl font-semibold"}>{organization?.name}</p>
        <div className={"flex items-center text-xs text-muted-foreground"}>
          <CreditCard className={"mr-1 h-3 w-3"} />
          free
        </div>
      </div>
    </div>
  );
};

export default Info;

// Skeleton component for loading state
Info.Skeleton = function InfoSkeleton() {
  return (
    <div className={"flex items-center gap-x-4"}>
      <div className={"relative h-[60px] w-[60px]"}>
        <Skeleton className={"absolute h-full w-full"} />
      </div>
      <div className={"space-y-2"}>
        <Skeleton className={"h-10 w-[200px]"} />
        <div className={"flex items-center "}>
          <Skeleton className={"mr-2 h-4 w-4"} />
          <Skeleton className={"h-4 w-[100px]"} />
        </div>
      </div>
    </div>
  );
};
