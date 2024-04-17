"use client";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
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
      <TooltipProvider>
        <UserProvider>
          <LocaleProvider lang={lang}>{children}</LocaleProvider>
        </UserProvider>
      </TooltipProvider>
    </div>
  );
}
