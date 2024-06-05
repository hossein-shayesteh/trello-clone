import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";

// Handler function for fetching a specific card
export async function GET(
  req: Request,
  { params: { cardId } }: { params: { cardId: string } },
) {
  try {
    // Authenticating the user and extracting their ID
    const { userId, orgId } = auth();

    // Checking if the user is unauthorized
    if (!userId || !orgId)
      return new NextResponse("Unauthorized", { status: 401 });

    // Fetch the card from the database
    const card = await db.card.findUnique({
      where: { id: cardId, list: { board: { orgId } } },
      include: { list: { select: { title: true } } },
    });

    // Return the card as JSON response
    return NextResponse.json(card);
  } catch (e) {
    // Return internal server error if an error occurs
    return new NextResponse("Internal Error", { status: 500 });
  }
}
