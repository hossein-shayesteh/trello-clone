"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { InputType, ReturnType } from "@/src/lib/actions/create-board/types";
import { createBoardSchema } from "@/src/lib/actions/create-board/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import createAuditLog from "@/src/lib/database/createAuditLog";

// Handler function for creating a board
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting title from input data
  const { title, image } = data;

  // Extracting date from radio button data
  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHtml, imageUserName] =
    image.split("|");

  // Handling errors if getting image fails
  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHtml ||
    !imageUserName
  )
    return { error: "Missing fields. Failed to create board." };

  // Creating a new board
  let board;

  try {
    // Creating a new board in the database with the provided title
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHtml,
      },
    });

    // Create audit log entry for this action
    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.BOARD,
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
