"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import { InputType, ReturnType } from "@/src/lib/actions/update-list/types";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { updateListSchema } from "@/src/lib/actions/update-list/schema";

// Handler function for updating a list
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting title, id and board ID from input data
  const { title, id, boardId } = data;

  // Creating a new list
  let list;

  try {
    // Updating the list in the database with the provided data
    list = await db.list.update({
      where: { id, boardId, board: { orgId } },
      data: { title },
    });
  } catch (e) {
    // Handling errors if board update fails
    return { error: "Failed to update." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const updateList = createSafeAction(updateListSchema, handler);
