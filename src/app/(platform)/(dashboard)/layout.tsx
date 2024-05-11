import Navbar from "@/src/app/(platform)/(dashboard)/_components/Navbar";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={"h-full"}>
      <Navbar />
      {children}
    </div>
  );
};
export default DashboardLayout;
