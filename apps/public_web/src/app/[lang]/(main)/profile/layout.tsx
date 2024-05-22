"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getBaseLink } from "src/utils";

const navbarItems = [
  {
    id: getBaseLink("profile", true),
    name: "General",
  },
  {
    id: getBaseLink("profile/test", true),
    name: "Tiptap",
  },
];
function isPathValid(path: string) {
  return path === "" || path === "test" || path === undefined;
}
type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("profile/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("/profile");
    }
  }, []);

  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={path}
      openOnNewPage={true}
      content={children}
    />
  );
}
