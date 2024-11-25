import { PackageSearch } from "lucide-react";

interface IRootLayoutProps {
  params: { lang: string; status?: string };
  children: JSX.Element;
}

export default function RootLayout({ children, params }: IRootLayoutProps) {
  if (!params.status || params.status !== "enabled") {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <PackageSearch className="size-16 text-muted-foreground" />
        <p className="text-muted-foreground ml-4 text-lg font-semibold">
          Veri bulunamadı
        </p>
      </div>
    );
  }
  return children;
}
