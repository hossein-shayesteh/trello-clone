"use server";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import { InputType, ReturnType } from "@/src/lib/actions/create-board/types";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import { createBoardSchema } from "@/src/lib/actions/create-board/schema";

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
