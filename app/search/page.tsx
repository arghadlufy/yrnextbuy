import { Breadcrumbs } from "@/components/breadcrumbs";
import prisma from "@/lib/prisma";
import ProductCard from "../ProductCard";
import { Suspense } from "react";
import ProductsSkeleton from "../ProductsSkeleton";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

async function Products({
  query,
  sort,
}: {
  query: string;
  sort?: string | null;
}) {
  let orderBy: Record<string, "asc" | "desc"> | undefined = undefined;

  if (sort === "price-asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price-desc") {
    orderBy = { price: "desc" };
  }

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
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

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.query?.trim() ?? "";
  const sort = params.sort?.trim() ?? null;

  const breadcrumbs = [
    { label: "Products", href: "/", active: false },
    {
      label: query ? `Results for "${query}"` : "Search",
      href: `/search?query=${encodeURIComponent(query)}`,
      active: true,
    },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbs} />

      <Suspense key={query} fallback={<ProductsSkeleton />}>
        <Products query={query} sort={sort ?? undefined} />
      </Suspense>
    </>
  );
}
