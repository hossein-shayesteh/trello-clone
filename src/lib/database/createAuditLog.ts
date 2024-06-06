import { auth, currentUser } from "@clerk/nextjs/server";
import { ENTITY_TYPE, ACTION } from "@prisma/client";
import { db } from "@/src/lib/database/db";

// Interface for the props expected by createAuditLog
interface CreateAuditLogProps {
  entityId: string;
  entityTitle: string;
  entityType: ENTITY_TYPE;
  action: ACTION;
}

// Function to create audit log
const createAuditLog = async ({
  action,
  entityId,
  entityTitle,
  entityType,
}: CreateAuditLogProps) => {
  try {
    // Authenticating the user and extracting the user and their Organization ID
    const { orgId } = auth();
    const user = await currentUser();

    // Checking if the user is unauthorized
    if (!user || !orgId) throw new Error("User not found");

    // Creating audit log entry
    await db.auditLog.create({
      data: {
        orgId,
        entityId,
        action,
        entityType,
        entityTitle,
        userId: user.id,
        userImage: user?.imageUrl,
        userName: `${user.firstName} ${user.lastName}`,
      },
    });
  } catch (e) {
    console.log("AUDIT_ERROR_LOG: ", e);
  }
};
export default createAuditLog;
