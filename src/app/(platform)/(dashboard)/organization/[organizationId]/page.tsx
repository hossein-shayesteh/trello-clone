import { auth } from "@clerk/nextjs/server";

const OrganizationIdPage = () => {
  const { userId, orgId } = auth();

  return (
    <>
      <div>User ID:{userId}</div>
      <div>Organization ID: {orgId}</div>
    </>
  );
};
export default OrganizationIdPage;
