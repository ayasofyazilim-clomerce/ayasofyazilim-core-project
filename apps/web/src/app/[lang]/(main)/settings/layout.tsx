"use client";

import { SectionLayout } from "@repo/ayasofyazilim-ui/templates/section-layout";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const navbarItems = [
  {
    name: "Profil",
    id: "profile",
  },
  {
    name: "Hesap Ayarları",
    id: "test",
  },
  {
    name: "Ödeme Yöntemleri",
    id: "test2",
  },
  {
    name: "Bildirim Tercihleri",
    id: "test3",
  },
  {
    name: "İşlem Geçmişi",
    id: "test4",
  },
];
function isPathValid(path: string) {
  return path === "profile" || path === "test" || path === undefined;
}
type LayoutProps = {
  children: JSX.Element;
};

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname.split("settings/")?.[1];

  useEffect(() => {
    if (!path || isPathValid(path) === false) {
      router.push("settings/profile");
    }
  }, []);

  return (
    <SectionLayout
      sections={navbarItems}
      defaultActiveSectionId={path}
      openOnNewPage={true}
      content={children}
      contentClassName="flex flex-col-reverse md:flex-row flex-wrap-reverse flex-1 lg:gap-16 md:gap-4 justify-center"
    />
  );
}
