"use server";
import Navbar from "components/navbar";

import MainLayout from "@repo/ayasofyazilim-ui/templates/main-layout";
import Header from "../../../components/header";
import "../../globals.css";
import { auth } from "auth";
type LayoutProps = {
  children: JSX.Element;
};

export default async function Layout({ children }: LayoutProps) {
  const session = await auth();
  const user = session?.user;
  return (
    <MainLayout
      HeaderComponent={
        <>
          <Header user={user} />
          <Navbar />
        </>
      }
    >
      {children}
    </MainLayout>
  );
}
