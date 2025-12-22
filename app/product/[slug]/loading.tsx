import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-4">
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-10 w-1/2" />

          <Separator className="my-4" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/2" />

            <div className="text-sm text-muted-foreground">
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
