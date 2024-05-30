"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import { InputType, ReturnType } from "@/src/lib/actions/update-board/types";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { updateBoardSchema } from "@/src/lib/actions/update-board/schema";

// Handler function for updating a board
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting title from input data
  const { title, id } = data;

  // Creating a new board
  let board;

  try {
    // Updating the board in the database with the provided data
    board = await db.board.update({
      where: { id, orgId },
      data: { title },
    });
  } catch (e) {
    // Handling errors if board update fails
    return { error: "Failed to update." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${id}`);

  return { data: board };
};

export const updateBoard = createSafeAction(updateBoardSchema, handler);
