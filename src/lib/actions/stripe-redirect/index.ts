"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import { stripe } from "@/src/lib/stripe/stripe";
import { InputType, ReturnType } from "@/src/lib/actions/stripe-redirect/types";
import { StripeRedirectSchema } from "@/src/lib/actions/stripe-redirect/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";

// Handler function for stripe redirect
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();
  const user = await currentUser();

  // Checking if the user is unauthorized
  if (!userId || !orgId || !user)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  const settingsUrl = absoluteUrl(`/organization/${orgId}`);

  // Creating a new url
  let url = "";

  try {
    // Attempt to find organization subscription details
    const orgSubscription = await db.orgSubscription.findUnique({
      where: { orgId },
    });

    // If organization subscription exists and has a Stripe customer ID
    if (orgSubscription && orgSubscription.stripeCustomerId) {
      // Create a billing portal session for the customer
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSession.url;
    } else {
      // Create a checkout session for subscription
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user?.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Taskify pro",
                description: "Unlimited board for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: { orgId },
      });

      url = stripeSession.url || "";
    }
  } catch (e) {
    // Return an error message if something goes wrong
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath(`/organization/${orgId}`);

  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirectSchema, handler);
