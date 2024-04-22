import React from "react";
import OrganizationControl from "@/src/app/(platform)/(dashboard)/organization/[organizationId]/_components/OrganizationControl";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};
export default OrganizationIdLayout;
