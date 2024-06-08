import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";

const DAY_IN_MS = 86_400_000;

// Function to check organization subscription status
export const checkSubscription = async () => {
  // Get organization ID from authentication context
  const { orgId } = auth();

  // Return false if organization ID is not found
  if (!orgId) return false;

  // Find organization's subscription details in the database
  const orgSubscription = await db.orgSubscription.findUnique({
    where: { orgId },
    select: {
      stripePriceId: true,
      stripeCustomerId: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  // If organization subscription doesn't exist, return false
  if (!orgSubscription) return false;

  // Calculate validity based on subscription end date and current date
  const isValid =
    orgSubscription.stripePriceId &&
    orgSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  // Return true if the subscription is valid, false otherwise
  return !!isValid;
};
