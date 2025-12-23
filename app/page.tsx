import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";
import { Breadcrumbs } from "@/components/breadcrumbs";
import ProductListServerWrapper from "@/components/product-list-server-wrapper";

const pageSize = 3;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;

  const totalProducts = await prisma.product.count();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <main className="container mx-auto py-4">
      <Breadcrumbs items={[{ label: "Products", href: "/", active: true }]} />

      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <ProductListServerWrapper params={{ page, pageSize: 3 }} />
      </Suspense>

      <Pagination className="mt-6">
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={`/?page=${page - 1}`} />
            </PaginationItem>
          )}

          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink href={`/?page=${index + 1}`}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          {page < totalPages && (
            <PaginationItem>
              <PaginationNext href={`/?page=${page + 1}`} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </main>
  );
}
