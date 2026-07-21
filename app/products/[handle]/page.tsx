import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify-queries';
import ProductDetails from '@/components/ProductDetails';
import { SingleProductQuery } from '@/types/shopify';

interface ProductPageProps {
  params: Promise<{ handle: string }> | { handle: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const { handle } = resolvedParams;

  const data = await shopifyFetch<SingleProductQuery>(GET_PRODUCT_BY_HANDLE, {
    handle,
  });
  const product = data?.product;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs uppercase bg-background text-foreground transition-colors duration-300">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
