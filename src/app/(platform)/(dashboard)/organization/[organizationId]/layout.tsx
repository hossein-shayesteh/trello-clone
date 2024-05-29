import React from "react";
import OrganizationControl from "@/src/app/(platform)/(dashboard)/organization/[organizationId]/_components/OrganizationControl";
import { auth } from "@clerk/nextjs/server";
import { startCase } from "lodash";

export async function generateMetadata() {
  const { orgSlug } = auth();
  return { title: startCase(orgSlug!) || "organization" };
}

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <OrganizationControl />
      {children}
    </>
  );
};
export default OrganizationIdLayout;
