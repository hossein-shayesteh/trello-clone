"use server";
import { InputType, ReturnType } from "@/src/lib/actions/create-board/types";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import { revalidatePath } from "next/cache";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { createBoardSchema } from "@/src/lib/actions/create-board/schema";

// Handler function for creating a board
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId } = auth();

  // Checking if the user is unauthorized
  if (!userId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting title from input data
  const { title } = data;
  let board;

  try {
    // Creating a new board in the database with the provided title
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (e) {
    // Handling errors if board creation fails
    return { error: "Failed to create." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${board.id}`);

  // Returning the created board data
  return { data: board };
};

// Exporting the createBoard function, which is a safe action handler
export const createBoard = createSafeAction(createBoardSchema, handler);
