import { Breadcrumbs } from "@/components/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getProductBySlug } from "@/lib/actions";
import { cn, formatPrice } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.description,
    keywords: [product.name, product.category.name],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
    twitter: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  };
}

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
    <main className="container mx-auto py-4">
      <Breadcrumbs
        items={[
          { label: "Products", href: "/", active: false },
          {
            label: product.category.name,
            href: `/category/${product.category.slug}`,
            active: false,
          },
          { label: product.name, href: `/product/${slug}`, active: true },
        ]}
      />
      <Card>
        <CardContent className="p-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="relative rounded-lg overflow-hidden h-[200px] md:h-[400px]">
            {product.image && (
              <Image
                src={product.image}
                alt={product.name}
                priority
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="font-semibold text-lg">
                {formatPrice(product.price)}
              </span>

              <Badge variant="outline">{product.category.name}</Badge>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Description</h2>

              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Availability</h2>
              <div className="flex items-center gap-2">
                {product.inventory > 0 ? (
                  <Badge variant="outline" className="bg-green-700 text-white">
                    In Stock ({product.inventory})
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-700 text-white">
                    Out of Stock ({product.inventory})
                  </Badge>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <Button
                variant="default"
                disabled={product.inventory === 0}
                className={cn(
                  product.inventory === 0 && "opacity-50 cursor-not-allowed",
                  "w-full"
                )}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
