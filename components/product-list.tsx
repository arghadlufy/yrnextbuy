"use client";

import { Product } from "@/app/generated/prisma/client";
import ProductCard from "@/app/ProductCard";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-muted-foreground">No products found</p>
      </div>
    );
  }

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
