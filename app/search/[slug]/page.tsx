import { Breadcrumbs } from "@/components/breadcrumbs";
import prisma from "@/lib/prisma";
import ProductCard from "../../ProductCard";
import { Suspense } from "react";
import ProductsSkeleton from "../../ProductsSkeleton";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
};

async function Products({ slug, sort }: { slug: string; sort?: string }) {
  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const products = await prisma.product.findMany({
    where: {
      category: {
        slug,
      },
    },
    ...(orderBy ? { orderBy } : {}),
    take: 18,
  });

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

  // await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <>
      <p className="mb-6">Showing {products.length} products</p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { sort } = await searchParams;

  const category = await prisma.category.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      slug: true,
    },
  });

  if (!category) {
    return notFound();
  }

  const breadcrumbs = [
    { label: "Products", href: "/", active: false },
    {
      label: category.name ?? "Category",
      href: `/search/${category.slug}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex-1">
        <Suspense key={slug + sort} fallback={<ProductsSkeleton />}>
          <Products slug={slug} sort={sort} />
        </Suspense>
      </div>
    </>
  );
}
