"use client";

import prisma from "@/lib/prisma";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CategorySidebar({
  categories,
}: {
  categories: { name: string; slug: string }[];
}) {
  const params = useParams();

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
                params?.slug === category.slug && "text-primary font-bold"
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
