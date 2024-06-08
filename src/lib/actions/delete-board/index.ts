"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { InputType, ReturnType } from "@/src/lib/actions/delete-board/types";
import { deleteBoardSchema } from "@/src/lib/actions/delete-board/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import createAuditLog from "@/src/lib/database/createAuditLog";
import { redirect } from "next/navigation";
import { decrementAvailableCount } from "@/src/lib/board-limit";

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

    // Decrement the organization limit count after successfully deleting a board
    await decrementAvailableCount();

    // Create audit log entry for this action
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      action: ACTION.DELETE,
      entityType: ENTITY_TYPE.BOARD,
    });
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
