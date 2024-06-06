"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { db } from "@/src/lib/database/db";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { InputType, ReturnType } from "@/src/lib/actions/copy-list/types";
import { copyListSchema } from "@/src/lib/actions/copy-list/schema";
import createSafeAction from "@/src/lib/actions/createSafeAction";
import createAuditLog from "@/src/lib/database/createAuditLog";

// Handler function for copying a list
const handler = async (data: InputType): Promise<ReturnType> => {
  // Authenticating the user and extracting their ID
  const { userId, orgId } = auth();

  // Checking if the user is unauthorized
  if (!userId || !orgId)
    return {
      error: "Unauthorized.", // Returning an error message if user is unauthorized
    };

  // Extracting id from data
  const { id, boardId } = data;

  // Creating a new list
  let list;

  try {
    // find the list in the database with the provided data
    const listToCopy = await db.list.findUnique({
      where: { id, boardId, board: { orgId } },
      include: { cards: true },
    });

    // Handling errors if list does not exist
    if (!listToCopy) return { error: "List not found" };

    // Find the order of last list in a board
    const lastList = await db.list.findFirst({
      where: { boardId, board: { orgId } },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastList?.order ? lastList?.order + 1 : 1;

    // copy the list in the database with the provided data
    list = await db.list.create({
      data: {
        boardId: listToCopy.boardId,
        title: `${listToCopy.title} - Copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: { cards: true },
    });

    // Create audit log entry for this action
    await createAuditLog({
      entityTitle: list.title,
      entityId: list.id,
      action: ACTION.CREATE,
      entityType: ENTITY_TYPE.LIST,
    });
  } catch (e) {
    // Handling errors if list copy fails
    return { error: "Failed to copy." };
  }

  // Revalidating the cache for the board path
  revalidatePath(`/board/${boardId}`);

  return { data: list };
};

export const copyList = createSafeAction(copyListSchema, handler);
