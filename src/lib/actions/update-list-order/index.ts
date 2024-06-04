"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import {
  InputType,
  ReturnType,
} from "@/src/lib/actions/update-list-order/types";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { updateListOrderSchema } from "@/src/lib/actions/update-list-order/schema";

// Handler function for updating the order of a list
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting title from input data
  const { boardId, items } = data;

  // Creating a new list
  let lists;

  try {
    // Updating the order of each list item
    const transaction = items.map((list) =>
      db.list.update({
        where: {
          id: list.id,
          board: { orgId },
        },
        data: { order: list.order },
      }),
    );

    // Executing the transaction
    lists = await db.$transaction(transaction);
  } catch (e) {
    // Handling errors if list reorder fails
    return { error: "Failed to reorder." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  // Returning the updated lists
  return { data: lists };
};

export const updateListOrder = createSafeAction(updateListOrderSchema, handler);
