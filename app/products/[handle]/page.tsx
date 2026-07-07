import { shopifyFetch } from '@/lib/shopify';
import Link from 'next/link';

const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }> | any;
}) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { handle } = resolvedParams;

  let product = null;
  let error = null;

  try {
    const data: any = await shopifyFetch(GET_PRODUCT_BY_HANDLE, {
      handle: handle,
    });
    product = data?.product;
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
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/" className="text-gray-600 hover:text-black transition">
          ← Back to Home
        </Link>
      </div>

      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* IMAGES GALLERY (ИСПРАВЛЕНО ТУТ) */}
          <div className="space-y-4">
            {product.images?.edges?.map((image: any, index: number) => (
              <div
                key={index}
                // ИСПРАВЛЕНО: Добавили flex, центрирование и паддинг p-4, чтобы картинка не липла к краям
                className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 h-[500px] p-4 flex items-center justify-center"
              >
                <img
                  src={image.node.url}
                  alt={image.node.altText || product.title}
                  // ИСПРАВЛЕНО: max-h-full и object-contain вместо object-cover — теперь картинка не режется!
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-4xl font-black tracking-tight mb-4">
              {product.title}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <p className="text-3xl font-extrabold text-black">
                {Number(product.priceRange.minVariantPrice.amount).toFixed(2)}{' '}
                {product.priceRange.minVariantPrice.currencyCode}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description || 'No description available'}
              </p>
            </div>

            {/* Variants (Options) */}
            {product.variants?.edges?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Options
                </h3>
                <div className="space-y-2">
                  {product.variants.edges.map((variant: any) => (
                    <div
                      key={variant.node.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition"
                    >
                      <span className="font-medium">{variant.node.title}</span>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold">
                          {Number(variant.node.priceV2.amount).toFixed(2)}{' '}
                          {variant.node.priceV2.currencyCode}
                        </span>
                        {variant.node.availableForSale ? (
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
                  ))}
                </div>
              </div>
            )}

            {/* Buttons */}
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
