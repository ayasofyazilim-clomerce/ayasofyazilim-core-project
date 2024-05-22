"use server";
import Navbar from "components/navbar";

import MainLayout from "@repo/ayasofyazilim-ui/templates/main-layout";
import Header from "../../../components/header";
import { auth } from "auth";
import { getLocalizationResources } from "src/utils";

type LayoutProps = {
  params: { lang: string };
  children: JSX.Element;
};

export default async function Layout({ children, params }: LayoutProps) {
  const resources = await getLocalizationResources(params.lang);
  const session = await auth();
  const user = session?.user;
  return (
    <MainLayout
      HeaderComponent={
        <>
          <Header user={user} resources={resources} />
          <Navbar />
        </>
      }
    >
      {children}
    </MainLayout>
  );
}
