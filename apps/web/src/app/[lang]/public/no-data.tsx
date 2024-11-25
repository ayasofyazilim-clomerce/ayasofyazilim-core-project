import { PackageSearch } from "lucide-react";

export default function NoData() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <PackageSearch className="size-16 text-muted-foreground" />
      <p className="text-muted-foreground ml-4 text-lg font-semibold">
        Veri bulunamadı
      </p>
    </div>
  );
}
