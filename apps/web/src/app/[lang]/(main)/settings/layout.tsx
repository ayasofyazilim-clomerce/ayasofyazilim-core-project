"use client";

import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { JSXElementConstructor, ReactElement, useEffect } from "react";

const navbarItems = [
  {
    name: "Profil",
    path: "profile",
  },
  {
    name: "Hesap Ayarları",
    path: "test",
  },
  {
    name: "Ödeme Yöntemleri",
    path: "test2",
  },
  {
    name: "Bildirim Tercihleri",
    path: "test3",
  },
  {
    name: "İşlem Geçmişi",
    path: "test4",
  },
];
function isPathValid(path: string) {
  return path === "profile" || path === "test" || path === undefined;
}
type LayoutProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
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
    <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
      <nav className="grid gap-4 text-sm text-muted-foreground">
        {navbarItems.map((item) => (
          <Link
            href={"/settings/" + (item.path ?? "")}
            className={item.path === path ? "font-semibold text-primary" : ""}
            key={item.name}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="grid gap-6">
        <div className="grid gap-6 lg:max-w-2xl">
          <Card>
            <CardContent className="pt-4">
              <>{children}</>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
