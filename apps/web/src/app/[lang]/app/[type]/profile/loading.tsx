import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { SectionLayoutNavbar } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";

export default function Page() {
  return (
    <>
      <PageHeader isLoading />

      <div className="my-2 flex flex-row justify-end">
        <Skeleton className="h-9 w-40 bg-gray-200" />
      </div>
      <Card className="m-auto">
        <SectionLayoutNavbar
          activeSectionId="default"
          sections={[{ id: "default", name: "Yatırımcı Profillerim" }]}
        />
        <div className="flex flex-col bg-white">
          {[1, 2, 3].map((i) => (
            <div
              className="flex flex-row items-center border px-5 py-3"
              key={i}
            >
              <Skeleton className="mb-1 h-7 w-7 bg-gray-200" />
              <div className="ml-4">
                <div>
                  <Skeleton className="mb-1.5 h-5 w-40 w-full bg-gray-200" />
                </div>
                <div className="text-muted-foreground text-sm">
                  <Skeleton className="h-4 w-32 w-full bg-gray-200" />
                </div>
              </div>
              <div className="ml-auto">
                <Skeleton className="mb-1 h-8 w-20 w-full bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
