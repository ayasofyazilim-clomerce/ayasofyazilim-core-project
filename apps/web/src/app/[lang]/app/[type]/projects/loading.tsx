import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { SectionLayoutSkeleton } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";

export default function Page() {
  return (
    <div className="flex h-full flex-col gap-2">
      <PageHeader isLoading />

      <div className="my-2 flex flex-row justify-end">
        <Skeleton className="h-9 w-40 bg-gray-200" />
      </div>
      <SectionLayoutSkeleton vertical />
    </div>
  );
}
