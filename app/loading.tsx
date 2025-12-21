import { Skeleton } from "@/components/ui/skeleton";
import ProductsSkeleton from "./ProductsSkeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
      <div className="flex items-center gap-2 mb-6">
        Showing <Skeleton className="h-6 w-10" /> products
      </div>

      <ProductsSkeleton />
    </main>
  );
}
