import { Product } from "@/lib/mocks";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="relative aspect-video">
        <Image
          src={product.image}
          alt={product.name}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="text-lg font-bold mb-2">{product.name}</h3>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-green-600 font-bold text-xl">
        {formatPrice(product.price)}
      </p>
    </div>
  );
}
