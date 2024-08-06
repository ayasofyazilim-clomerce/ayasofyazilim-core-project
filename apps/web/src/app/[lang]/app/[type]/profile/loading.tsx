import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@repo/ayasofyazilim-ui/molecules/page-header";
import { SectionLayoutNavbar } from "@repo/ayasofyazilim-ui/templates/section-layout-v2";

export default function Page() {
  return (
    <>
      <PageHeader isLoading={true} />

      <div className="flex justify-end flex-row my-2">
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
              className="border flex flex-row px-5 py-3 items-center"
              key={i}
            >
              <Skeleton className="h-7 w-7 mb-1 bg-gray-200" />
              <div className="ml-4">
                <div>
                  <Skeleton className="h-5 mb-1.5 w-full bg-gray-200 w-40" />
                </div>
                <div className="text-sm text-muted-foreground">
                  <Skeleton className="h-4 w-full bg-gray-200 w-32" />
                </div>
              </div>
              <div className="ml-auto">
                <Skeleton className="h-8 mb-1 w-full bg-gray-200 w-20" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
