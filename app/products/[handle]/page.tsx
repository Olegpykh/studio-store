import { shopifyFetch } from '@/lib/shopify';
import Link from 'next/link';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify-queries';
import Image from 'next/image';
import {
  ShopifyProduct,
  ShopifyProductVariant,
  SingleProductQuery,
} from '@/types/shopify';

interface ProductPageProps {
  params: Promise<{ handle: string }> | { handle: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { handle } = resolvedParams;

  let product: ShopifyProduct | null = null;
  let error: string | null = null;

  try {
    const data = await shopifyFetch<SingleProductQuery>(GET_PRODUCT_BY_HANDLE, {
      handle: handle,
    });
    product = data?.product || null;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load product';
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center text-black">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "The product you're looking for doesn't exist"}
          </p>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="text-gray-600 hover:text-black transition">
          ← Back to Home
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {product.images?.edges?.map((edge, index: number) => (
              <div
                key={index}
                className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 h-[500px] p-4 flex items-center justify-center relative"
              >
                <Image
                  src={edge.node.url}
                  alt={edge.node.altText || product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                  className="p-6 object-contain"
                />
              </div>
            ))}
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight mb-4">
              {product.title}
            </h1>

            <div className="mb-6">
              <p className="text-3xl font-extrabold text-black">
                {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}{' '}
                {product.priceRange.minVariantPrice.currencyCode}
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'No description available'}
              </p>
            </div>

            {product.variants?.edges?.length ? (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Options
                </h3>
                <div className="space-y-2">
                  {product.variants.edges.map(
                    ({ node }: { node: ShopifyProductVariant }) => (
                      <div
                        key={node.id}
                        className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
                      >
                        <span className="font-medium">{node.title}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-semibold">
                            {Number(node.priceV2.amount).toFixed(2)}{' '}
                            {node.priceV2.currencyCode}
                          </span>
                          {node.availableForSale ? (
                            <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                              In Stock
                            </span>
                          ) : (
                            <span className="text-rose-600 text-xs font-bold bg-rose-50 px-2.5 py-1 rounded-full">
                              Out of Stock
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            ) : null}

            <button className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 active:scale-95 transition-all shadow-md mb-3">
              Add to Cart
            </button>

            <button className="w-full border border-gray-200 text-black py-4 rounded-xl font-semibold hover:bg-gray-50 active:scale-95 transition-all">
              Add to Wishlist
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
