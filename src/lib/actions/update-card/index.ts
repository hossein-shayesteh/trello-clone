"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { InputType, ReturnType } from "@/src/lib/actions/update-card/types";
import { updateCardSchema } from "@/src/lib/actions/update-card/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import createAuditLog from "@/src/lib/database/createAuditLog";

// Handler function for updating a card
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting card ID, board ID, card title and card description from input data
  const { id, boardId, ...values } = data;

  // Creating a new card
  let card;

  try {
    // Updating the card in the database with the provided data
    card = await db.card.update({
      where: { id, list: { board: { orgId } } },
      data: { ...values },
    });

    // Create audit log entry for this action
    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (e) {
    // Handling errors if board update fails
    return { error: "Failed to update." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const updateCard = createSafeAction(updateCardSchema, handler);
