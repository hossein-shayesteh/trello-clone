import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import { MAX_FREE_BOARD } from "@/src/constant/boards";

// Function to increment the available count of boards for an organization
export const incrementAvailableCount = async () => {
  // Get organization ID from authentication context
  const { orgId } = auth();

  // Throw error if organization ID is not found
  if (!orgId) throw new Error("Unauthorized");

  // Find the organization's limit in the database
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // If the organization limit exists, update the count, else create a new entry
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count + 1 },
    });
  } else {
    await db.orgLimit.create({ data: { orgId, count: 1 } });
  }
};

// Function to decrement the available count of boards for an organization
export const decrementAvailableCount = async () => {
  // Get organization ID from authentication context
  const { orgId } = auth();

  // Throw error if organization ID is not found
  if (!orgId) throw new Error("Unauthorized");

  // Find the organization's limit in the database
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // If the organization limit exists, update the count, else create a new entry
  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({ data: { orgId, count: 1 } });
  }
};

// Function to check if the organization has available board counts
export const hasAvailableCount = async () => {
  // Get organization ID from authentication context
  const { orgId } = auth();

  // Throw error if organization ID is not found
  if (!orgId) throw new Error("Unauthorized");

  // Find the organization's limit in the database
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // Return true if the organization limit doesn't exist or count is less than the maximum
  return !orgLimit || orgLimit.count < MAX_FREE_BOARD;
};

// Function to get the available count of boards for an organization
export const getAvailableCount = async () => {
  // Get organization ID from authentication context
  const { orgId } = auth();

  // Return 0 if organization ID is not found
  if (!orgId) return 0;

  // Find the organization's limit in the database
  const orgLimit = await db.orgLimit.findUnique({
    where: { orgId },
  });

  // Return 0 if organization limit doesn't exist, else return the count
  if (!orgLimit) return 0;
  return orgLimit.count;
};
