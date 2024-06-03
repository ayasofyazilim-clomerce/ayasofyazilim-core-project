"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout-company";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navbarItems = [
  {
    name: "Merchants",
    id: "Merchants",
  },

  {
    name: "Refund points",
    id: "Refund_points",
  },
  {
    name: "Customs",
    id: "Customs",
  },

  {
    name: "Tax free",
    id: "Tax_free",
  },
  {
    name: "Tax offices",
    id: "Tax_offices",
  },
];
function isPathValid(path: string) {
  return (
    path === "Merchants" ||
    path === "Refund_points" ||
    path === "Customs" ||
    path === "Tax_free" ||
    path === "Tax_offices" ||
    path === undefined
  );
}
type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("Companies/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("Companies/Merchants");
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
