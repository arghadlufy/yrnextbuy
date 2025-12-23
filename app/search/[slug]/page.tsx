import { Breadcrumbs } from "@/components/breadcrumbs";
import prisma from "@/lib/prisma";
import ProductCard from "../../ProductCard";
import { Suspense } from "react";
import ProductsSkeleton from "../../ProductsSkeleton";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import Link from "next/link";
import { CategorySidebar } from "@/components/category-sidebar";
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
    <main className="container mx-auto py-4">
      <Breadcrumbs items={breadcrumbs} />

      <div className="flex items-center gap-2 mb-4">
        <Link href={`/search/${slug}`}>
          <Button variant="outline" size="sm">
            <ArrowUpDownIcon className="w-4 h-4" />
            Newest
          </Button>
        </Link>
        <Link href={`/search/${slug}?sort=price-asc`}>
          <Button variant="outline" size="sm">
            <ArrowUpDownIcon className="w-4 h-4" />
            Low to high
          </Button>
        </Link>
        <Link href={`/search/${slug}?sort=price-desc`}>
          <Button variant="outline" size="sm">
            <ArrowUpDownIcon className="w-4 h-4" />
            High to low
          </Button>
        </Link>
      </div>

      <div className="flex gap-4">
        <Suspense
          key={slug}
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
          <CategorySidebar activeCategory={slug} />
        </Suspense>
        <div className="flex-1">
          <Suspense key={slug + sort} fallback={<ProductsSkeleton />}>
            <Products slug={slug} sort={sort} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
