import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { SectionLayoutSkeleton } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 h-full">
      <PageHeader isLoading />

      <div className="flex justify-end flex-row my-2">
        <Skeleton className="h-9 w-40 bg-gray-200" />
      </div>
      <SectionLayoutSkeleton vertical={true} />
    </div>
  );
}
