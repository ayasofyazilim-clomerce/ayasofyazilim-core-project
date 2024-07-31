"use client";

import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarItems = [
  {
    name: "Rebate",
    id: "rebate",
    link: "rebate",
  },
];

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const path = pathname.split("template/")[1];

  return (
    <SectionLayout
      defaultActiveSectionId={path}
      linkElement={Link}
      sections={navbarItems}
      vertical={false}
    >
      <SectionLayoutContent sectionId={path}>{children}</SectionLayoutContent>
    </SectionLayout>
  );
}
