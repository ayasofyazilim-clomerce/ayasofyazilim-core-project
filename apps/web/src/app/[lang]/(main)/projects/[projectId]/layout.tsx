"use client";
import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { redirect, usePathname } from "next/navigation";
import { getBaseLink } from "src/utils";

export default function Layout({ children }: { children: JSX.Element }) {
  const pathname = usePathname().split("projects/")?.[1];
  const projectId = pathname?.split("/")?.[0];
  const activeSection = pathname?.split("/")?.[1] || "general";
  if (!projectId) {
    redirect("/projects");
  }

  const navbarItems = [
    {
      id: "general",
      link: getBaseLink(`projects/${projectId}`, true),
      name: "Genel Bilgiler",
    },
    {
      id: "details",
      link: getBaseLink(`projects/${projectId}/details`, true),
      name: "Proje Detayı",
    },
  ];
  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={activeSection}
      openOnNewPage={true}
      content={children}
      vertical={true}
    />
  );
}
