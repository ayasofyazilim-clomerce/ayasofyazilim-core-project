"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import { ConfigProvider } from "./configuration";
import { LocaleProvider } from "./locale";
import { UserProvider } from "./user";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const params = useParams();

  const lang = params?.lang?.toString() || "en";
  return (
    <div>
      <ConfigProvider>
        <TooltipProvider>
          <UserProvider>
            <LocaleProvider lang={lang}>{children}</LocaleProvider>
          </UserProvider>
        </TooltipProvider>
      </ConfigProvider>
    </div>
  );
}
