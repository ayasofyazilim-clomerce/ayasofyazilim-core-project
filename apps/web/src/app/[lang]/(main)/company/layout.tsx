"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout-company";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navbarItems = [
  {
    name: "Merchants",
    id: "merchants",
  },

  {
    name: "Refund Points",
    id: "refund_points",
  },
  {
    name: "Customs",
    id: "customs",
  },

  {
    name: "Tax Free",
    id: "tax_free",
  },
  {
    name: "Tax Offices",
    id: "tax_offices",
  },
];
function isPathValid(path: string) {
  return (
    path === "merchants" ||
    path === "refund_points" ||
    path === "customs" ||
    path === "tax_free" ||
    path === "tax_offices" ||
    path === undefined
  );
}
type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("company/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("company/merchants");
    }
  }, []);

  return (
    <div>
      <SectionLayout
        sections={navbarItems}
        defaultActiveSectionId={path}
        openOnNewPage={true}
        content={children}
        contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center w-[80vw]"
      />
    </div>
  );
}
