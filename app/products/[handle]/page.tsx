import { shopifyFetch } from '@/lib/shopify';
import Link from 'next/link';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify-queries';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductForm } from '@/components/ProductForm'; // Наш новый клиентский компонент
import { ShieldCheck, Truck } from 'lucide-react';
import { ShopifyProduct, SingleProductQuery } from '@/types/shopify';

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

  // ERROR / 404 STATE
  if (error || !product) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center text-black px-4">
        <div className="text-center max-w-sm">
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase block mb-4">
            Error 404
          </span>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight mb-3">
            Product Not Found
          </h1>
          <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">
            {error ||
              "The piece you are looking for is currently unavailable or doesn't exist."}
          </p>
          <Link
            href="/"
            className="inline-block text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-gray-500 hover:border-gray-400 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </main>
    );
  }

  const price = product.priceRange?.minVariantPrice?.amount
    ? `${Number(product.priceRange.minVariantPrice.amount).toFixed(2)} ${
        product.priceRange.minVariantPrice.currencyCode === 'EUR'
          ? '€'
          : product.priceRange.minVariantPrice.currencyCode
      }`
    : 'View Details';

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-8 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
        >
          <span className="mr-2">←</span> Back to Collection
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images?.edges || []}
              title={product.title}
            />
          </div>

          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-2">
              {product.vendor && (
                <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase block">
                  {product.vendor}
                </span>
              )}
              <h1 className="text-3xl font-extrabold uppercase tracking-tight text-black leading-tight">
                {product.title}
              </h1>
              <p className="text-xl font-bold tracking-wide text-black pt-2">
                {price}
              </p>
            </div>

            <div className="h-[1px] bg-gray-100"></div>

            <div className="space-y-2">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block">
                Description
              </h3>
              <p className="text-sm text-gray-500 font-light leading-relaxed">
                {product.description ||
                  'No description available for this drop.'}
              </p>
            </div>

            <ProductForm variants={product.variants?.edges || []} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 text-[11px] font-medium text-gray-400 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-black shrink-0" />
                <span>Priority delivery within Europe</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-black shrink-0" />
                <span>Genuine Shopify Certified Drop</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
