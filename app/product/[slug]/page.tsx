import { getProductBySlug } from "@/lib/actions";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <p className="text-lg mb-6">{product.description}</p>
      <p className="text-lg mb-6">{formatPrice(product.price)}</p>
      {product.image && (
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
        />
      )}
    </div>
  );
}
