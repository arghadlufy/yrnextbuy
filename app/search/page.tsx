import { Breadcrumbs } from "@/components/breadcrumbs";
import prisma from "@/lib/prisma";
import ProductCard from "../ProductCard";
import { Suspense } from "react";
import ProductsSkeleton from "../ProductsSkeleton";
import ProductListServerWrapper from "@/components/product-list-server-wrapper";

type SearchPageProps = {
  searchParams: Promise<{ query?: string; sort?: string }>;
};

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
        <ProductListServerWrapper
          params={{ query, sort: sort ?? undefined, page: 1, pageSize: 3 }}
        />
      </Suspense>
    </>
  );
}
