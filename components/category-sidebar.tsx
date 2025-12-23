import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Link from "next/link";

export async function CategorySidebar({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
      slug: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  //   await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <aside className="hidden md:block w-64">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Categories</h3>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/search/${category.slug}`}
              className={cn(
                "text-sm font-medium hover:text-primary transition-colors",
                activeCategory === category.slug && "text-primary font-bold"
              )}
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
