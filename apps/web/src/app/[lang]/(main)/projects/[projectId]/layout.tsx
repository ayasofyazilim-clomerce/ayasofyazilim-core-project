"use client";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname } from "next/navigation";
import { getBaseLink } from "src/utils";

const navbarItems = [
  {
    id: "profile",
    link: getBaseLink("profile", true),
    name: "Genel Bilgiler",
  },
  {
    id: "test",
    link: getBaseLink("profile/test", true),
    name: "Ekip Üyeleri",
  },
];

export default function Layout({ children }: { children: JSX.Element }) {
  const pathname = usePathname();
  const path = pathname.split("profile/")?.[1] ?? "profile";
  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={path}
      openOnNewPage={true}
      content={children}
      vertical={true}
    />
  );
}
