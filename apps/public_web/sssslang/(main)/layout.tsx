"use server";

import MainLayout from "@repo/ayasofyazilim-ui/templates/main-layout";
import { auth } from "auth";
import Header from "../../src/components/header";
import "../../globals.css";
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
          {/* <Navbar /> */}
        </>
      }
    >
      {children}
    </MainLayout>
  );
}
