import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <Card className="pt-0 overflow-hidden">
      <div className="relative aspect-video">
        <Skeleton className="w-full h-full" />
      </div>

      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>

      <CardFooter>
        <Skeleton className="h-6 w-1/2" />
      </CardFooter>
    </Card>
  );
}
