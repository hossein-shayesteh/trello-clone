"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { InputType, ReturnType } from "@/src/lib/actions/delete-card/types";
import { deleteCardSchema } from "@/src/lib/actions/delete-card/schema";

// Handler function for deleting a card
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
    // Deleting the card in the database with the provided data
    card = await db.card.delete({ where: { id, list: { board: { orgId } } } });
  } catch (e) {
    // Handling errors if card deletion fails
    return { error: "Failed to delete." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  return { data: card };
};

export const deleteCard = createSafeAction(deleteCardSchema, handler);
