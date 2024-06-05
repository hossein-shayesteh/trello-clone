"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { InputType, ReturnType } from "@/src/lib/actions/copy-card/types";
import { copyCardSchema } from "@/src/lib/actions/copy-card/schema";

// Handler function for copying a card
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting card ID and board ID from data
  const { id, boardId } = data;

  // Creating a new list
  let card;

  try {
    // find the card in the database with the provided data
    const cardToCopy = await db.card.findUnique({
      where: { id, list: { board: { orgId } } },
    });

    // Handling errors if card does not exist
    if (!cardToCopy) return { error: "Card not found" };

    // Find the order of last card in a board
    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard?.order ? lastCard?.order + 1 : 1;

    // copy the card in the database with the provided data
    card = await db.card.create({
      data: {
        title: `${cardToCopy.title} - Copy`,
        description: cardToCopy.description,
        order: newOrder,
        listId: cardToCopy.listId,
      },
    });
  } catch (e) {
    // Handling errors if card copy fails
    return { error: "Failed to copy." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const copyCard = createSafeAction(copyCardSchema, handler);
