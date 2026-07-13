
import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify-queries';
import ProductDetails from '@/components/ProductDetails';
import Image from 'next/image';
import { ShopifyProductResponse, ProductPageProps } from './interfaces';

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const { handle } = resolvedParams;

  const data = await shopifyFetch<ShopifyProductResponse>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
  const product = data?.product;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs uppercase">
        Product Not Found
      </div>
    );
  }

  const firstImage = product.images?.edges?.[0]?.node;

  return (
    <main className="min-h-screen bg-white text-black pt-12 pb-32 uppercase tracking-wider font-mono text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="aspect-[3/4] w-full bg-[#fafafa] relative overflow-hidden border border-gray-100">
            {firstImage ? (
              <Image
                src={firstImage.url}
                alt={firstImage.altText || product.title}
                fill
                priority
                sizes="(max-w-7xl) 50vw, 100vw"
                className="object-cover object-center"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300">
                No Image
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div>
              {product.vendor && (
                <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] block mb-1">
                  {product.vendor}
                </span>
              )}
              <h1 className="text-sm font-bold tracking-[0.2em]">
                {product.title}
              </h1>
              <p className="text-gray-500 font-sans tracking-normal normal-case mt-4 text-[11px] leading-relaxed">
                {product.description}
              </p>
            </div>

            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
