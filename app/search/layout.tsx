import CategorySidebar from "@/components/category-sidebar";
import SortingControls from "@/components/sorting-controls";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { ArrowUpDownIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

async function CategorySidebarServerWrapper() {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return <CategorySidebar categories={categories} />;
}

export default async function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="container mx-auto py-4">
      <div className="flex gap-4">
        <div className="flex gap-4">
          <Suspense
            fallback={
              <aside className="hidden md:block w-64">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-24" />
                  <div className="flex flex-col gap-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Skeleton key={index} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
              </aside>
            }
          >
            {/* server component */}
            <CategorySidebarServerWrapper />
          </Suspense>
        </div>
        <div className="flex-1">{children}</div>
        <div className="flex flex-col items-center gap-2">
          {/* sorting */}

          <SortingControls />
        </div>
      </div>
    </main>
  );
}
