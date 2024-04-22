import DashboardNavbar from "@/src/app/(platform)/(dashboard)/_components/DashboardNavbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"h-full"}>
      <DashboardNavbar />
      {children}
    </div>
  );
};
export default DashboardLayout;
