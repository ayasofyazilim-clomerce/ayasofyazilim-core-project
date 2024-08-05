"use server";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { getBacker } from "../actions";
import { BackerForm } from "./form";

export default async function Page({
  params,
}: {
  params: { lang: string; type: string; profileId: string };
}) {
  const { profileId, type } = params;

  let backer;
  if (profileId === "new-individual") {
    backer = { type: "individual" };
  } else if (profileId === "new-organization") {
    backer = { type: "organization" };
  } else {
    backer = await getBacker(profileId);
  }

  return (
    <>
      <PageHeader
        description={
          profileId === "new-individual" || profileId === "new-organization"
            ? "Buradan yeni bir yatırım profili oluşturabilirsiniz."
            : "Yatırımcı profilinizi buradan düzenleyebilirsiniz."
        }
        title={
          profileId === "new-individual" || profileId === "new-organization"
            ? "Profil Oluştur"
            : "Profilini Düzenle"
        }
      />

      <BackerForm
        backer={backer}
        formType={backer?.type || type}
        profileId={profileId}
      />
    </>
  );
}
