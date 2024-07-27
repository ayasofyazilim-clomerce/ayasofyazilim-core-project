"use client";

import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import {
  SectionLayout,
  SectionLayoutContent,
} from "@repo/ayasofyazilim-ui/templates/section-layout-v2";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navbarItems = [
  {
    name: "Merchants",
    id: "merchants",
    link: "merchants",
  },

  {
    name: "Refund Points",
    id: "refund_points",

    link: "refund_points",
  },
  {
    name: "Customs",
    id: "customs",

    link: "customs",
  },

  {
    name: "Tax Free",
    id: "tax_free",

    link: "tax_free",
  },
  {
    name: "Tax Offices",
    id: "tax_offices",

    link: "tax_offices",
  },
];

interface LayoutProps {
  children: JSX.Element;
}

const pageHeader = {
  merchants: {
    title: "Satıcılar",
    description:
      "Satıcıları buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  refund_points: {
    title: "Iade Puanları",
    description:
      "İade puanlarını buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  customs: {
    title: "Temsilciler",
    description:
      "Temsilcileri buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  tax_free: {
    title: "Vergi Dönuşümleri",
    description:
      "Vergi dönuşümlerini buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
    link: "company/merchants",
  },
  tax_offices: {
    title: "Vergi Ofisleri",
    description:
      "Vergi ofislerini buradan oluşturabilir veya başka bir yerde güncelleyebilirsiniz.",
  },
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const path = pathname.split("company/")[1];

  return (
    <div>
      <PageHeader
        description={
          pageHeader[path as keyof typeof pageHeader].description ||
          "Page description"
        }
        title={
          pageHeader[path as keyof typeof pageHeader].title || "Page title"
        }
      />
      <SectionLayout
        defaultActiveSectionId={path}
        linkElement={Link}
        sections={navbarItems}
      >
        <SectionLayoutContent sectionId={path}>{children}</SectionLayoutContent>
      </SectionLayout>
    </div>
  );
}
