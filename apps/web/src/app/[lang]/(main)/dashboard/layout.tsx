"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navbarItems = [
  {
    name: "Roles",
    id: "role",
  },
  {
    name: "Users",
    id: "user",
  },

  {
    name: "Tenants",
    id: "tenant",
  }

];
function isPathValid(path: string) {
  return path === "role" || path === "user" || path==="tenant" || path === undefined;
}
type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("dashboard/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("dashboard/role");
    }
  }, []);

  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={path}
      openOnNewPage={true}
      content={children}
      contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center w-[80vw]"
    />
  );
}
