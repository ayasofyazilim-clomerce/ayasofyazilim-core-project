import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  return (
    <>
      <div className="mb-4 space-y-2">
        <Skeleton className="h-6 w-80 bg-gray-200" />
        <Skeleton className="h-6 w-120 bg-gray-200" />
      </div>
      <div className="flex justify-end flex-row my-2">
        <Skeleton className="h-9 w-40 bg-gray-200" />
      </div>

      <div className="flex flex-row gap-3">
        <Skeleton className="bg-gray-200 bg-card border w-full h-[500px]" />
        <Skeleton className="bg-gray-200 bg-card border w-full h-[500px]" />
      </div>
    </>
  );
}
