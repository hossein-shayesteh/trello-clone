"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { deleteBoardSchema } from "@/src/lib/actions/delete-board/schema";
import { InputType, ReturnType } from "@/src/lib/actions/delete-board/types";
import { redirect } from "next/navigation";

// Handler function for deleting a board
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting id from data
  const { id } = data;

  // Creating a new board
  let board;

  try {
    // Deleting the board in the database with the provided data
    board = await db.board.delete({ where: { id, orgId } });
  } catch (e) {
    // Handling errors if board delete fails
    return { error: "Failed to delete." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/organization/${orgId}`);

  // Redirect to organization page
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(deleteBoardSchema, handler);
