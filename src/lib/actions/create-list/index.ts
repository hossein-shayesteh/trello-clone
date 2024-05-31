"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import { InputType, ReturnType } from "@/src/lib/actions/create-list/types";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { createListSchema } from "@/src/lib/actions/create-list/schema";

// Handler function for creating a list
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting title from input data
  const { title, boardId } = data;

  // Creating a new list
  let list;

  try {
    // Fetch the board in the database with the provided data
    const board = await db.board.findUnique({
      where: { id: boardId, orgId },
    });

    // Handling errors if fails to find board
    if (!board) return { error: "Board not found" };

    // Fetching the last list order from the database
    const lastList = await db.list.findFirst({
      where: { boardId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    // If lastList exists, increment its order value by 1; otherwise, set the new order value to 1
    const newOrder = lastList ? lastList.order + 1 : 1;

    // creating the list in the database with the provided data
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (e) {
    // Handling errors if list creation fails
    return { error: "Failed to create." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const createList = createSafeAction(createListSchema, handler);
