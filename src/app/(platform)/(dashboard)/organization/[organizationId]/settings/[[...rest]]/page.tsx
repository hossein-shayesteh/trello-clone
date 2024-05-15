import { OrganizationProfile } from "@clerk/nextjs";

const OrganizationSettingPage = () => {
  return (
    <div className={"w-full"}>
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: { boxShadow: "none" },
            cardBox: {
              boxShadow: "none",
              border: "1px solid #e5e5e5",
              width: "100%",
            },
            scrollBox: { boxShadow: "none" },
          },
        }}
      />
    </div>
  );
};
export default OrganizationSettingPage;
