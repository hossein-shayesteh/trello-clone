import React from "react";
import MarketingNavbar from "@/src/app/(marketing)/_components/MarketingNavbar";
import MarketingFooter from "@/src/app/(marketing)/_components/MarketingFooter";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"h-full bg-slate-100"}>
      <MarketingNavbar />
      <main className={"bg-slate-100 pb-20 pt-40"}>{children}</main>
      <MarketingFooter />
    </div>
  );
};
export default MarketingLayout;
