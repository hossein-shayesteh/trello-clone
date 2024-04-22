"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrganizationList } from "@clerk/nextjs";

const OrganizationControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    // Check if setActive exists before invoking it
    if (setActive) {
      setActive({ organization: params.organizationId as string }).then();
    }
  }, [setActive, params.organizationId]);

  return null;
};

export default OrganizationControl;
