import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <>
      <div className="mb-4 space-y-2">
        <Skeleton className="h-6 w-80 bg-gray-200" />
        <Skeleton className="w-120 h-6 bg-gray-200" />
      </div>
      <div className="my-2 flex flex-row justify-end">
        <Skeleton className="h-9 w-40 bg-gray-200" />
      </div>

      <div className="flex flex-row gap-3">
        <Skeleton className="bg-card h-[500px] w-full border bg-gray-200" />
        <Skeleton className="bg-card h-[500px] w-full border bg-gray-200" />
      </div>
    </>
  );
}
