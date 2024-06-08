import { db } from "@/src/lib/database/db";

// Fetch audit logs based on its organization ID
const fetchAuditLogs = (orgId: string) => {
  return db.auditLog.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });
};

export default fetchAuditLogs;
