import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductCard from "./ProductCard";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import ProductsSkeleton from "./ProductsSkeleton";

const pageSize = 3;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

async function Products({ page }: { page: number }) {
  const skip = (page - 1) * pageSize;
  const products = await prisma.product.findMany({
    skip,
    take: pageSize,
  });

  await new Promise((resolve) => setTimeout(resolve, 3000));

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

export default async function HomePage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;

  const totalProducts = await prisma.product.count();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>

      <Suspense key={page} fallback={<ProductsSkeleton />}>
        <Products page={page} />
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
