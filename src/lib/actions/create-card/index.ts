"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { InputType, ReturnType } from "@/src/lib/actions/create-card/types";
import { createCardSchema } from "@/src/lib/actions/create-card/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import createAuditLog from "@/src/lib/database/createAuditLog";

// Handler function for creating a card
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting title, board ID and list ID from input data
  const { title, boardId, listId } = data;

  // Creating a new card
  let card;

  try {
    // Fetch the list in the database with the provided data
    const list = await db.list.findUnique({
      where: {
        id: listId,
        board: { orgId, id: boardId },
      },
    });

    // Handling errors if fails to find list
    if (!list) return { error: "List not found" };

    // Fetching the last card order from the database
    const lastCard = await db.card.findFirst({
      where: { listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    // If lastCard exists, increment its order value by 1; otherwise, set the new order value to 1
    const newOrder = lastCard ? lastCard.order + 1 : 1;

    // creating the card in the database with the provided data
    card = await db.card.create({
      data: {
        title,
        listId,
        order: newOrder,
      },
    });

    // Create audit log entry for this action
    await createAuditLog({
      entityTitle: card.title,
      entityId: card.id,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.CARD,
    });
  } catch (e) {
    // Handling errors if card creation fails
    return { error: "Failed to create." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const createCard = createSafeAction(createCardSchema, handler);
