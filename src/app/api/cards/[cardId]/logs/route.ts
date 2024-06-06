import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/src/lib/database/db";
import { ENTITY_TYPE } from "@prisma/client";

// Handler function for fetching audit logs
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

    // Fetch the audit logs from the database
    const auditLogs = await db.auditLog.findMany({
      where: {
        orgId,
        entityId: cardId,
        entityType: ENTITY_TYPE.CARD,
      },
      orderBy: { createdAt: "desc" },
      take: 3,
    });

    // Return the audit logs as JSON response
    return NextResponse.json(auditLogs);
  } catch (e) {
    // Return internal server error if an error occurs
    return new NextResponse("Internal Error", { status: 500 });
  }
}
