"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { InputType, ReturnType } from "@/src/lib/actions/update-board/types";
import { updateBoardSchema } from "@/src/lib/actions/update-board/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import createAuditLog from "@/src/lib/database/createAuditLog";

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

    // Create audit log entry for this action
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      action: ACTION.UPDATE,
      entityType: ENTITY_TYPE.BOARD,
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
