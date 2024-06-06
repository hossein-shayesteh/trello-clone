"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import {
  InputType,
  ReturnType,
} from "@/src/lib/actions/update-card-order/types";
import { updateCardOrderSchema } from "@/src/lib/actions/update-card-order/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";

// Handler function for updating the order of a card
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting items and boardId from input data
  const { items, boardId } = data;

  // Creating a new card
  let updatedCard;

  try {
    // Updating the order of each card item
    const transaction = items.map((card) =>
      db.card.update({
        where: { id: card.id, list: { board: { orgId } } },
        data: { order: card.order, listId: card.listId },
      }),
    );

    // Executing the transaction
    updatedCard = await db.$transaction(transaction);
  } catch (e) {
    // Handling errors if card reorder fails
    return { error: "Failed to reorder." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  // Returning the updated cards
  return { data: updatedCard };
};

export const updateCardOrder = createSafeAction(updateCardOrderSchema, handler);
