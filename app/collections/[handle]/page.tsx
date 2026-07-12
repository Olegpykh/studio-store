import { shopifyFetch } from '@/lib/shopify';
import { GET_COLLECTION_PRODUCTS } from '@/lib/shopify-queries';
import { ProductCard } from '@/components/ProductCard';
import Link from 'next/link';
import { CollectionQueryResponse } from '@/types/shopify';

interface CollectionPageProps {
  params: Promise<{
    handle: string;
  }>;
}

async function getCollectionData(handle: string) {
  try {
    const data = await shopifyFetch<CollectionQueryResponse>(
      GET_COLLECTION_PRODUCTS,
      {
        handle: handle,
        first: 40,
      }
    );

    return data?.collection || null;
  } catch (err) {
    console.error('Error fetching collection products:', err);
    return null;
  }
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const collection = await getCollectionData(handle);

  if (!collection) {
    return (
      <main className="min-h-screen bg-white text-black flex flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-black mb-2">Collection Not Found</h1>
        <p className="text-gray-500 mb-6">
          {"We couldn't find the collection you're looking for."}
        </p>
        <Link
          href="/"
          className="rounded-xl bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-800 transition"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const products = collection.products?.edges.map((edge) => edge.node) || [];
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      <section className="border-b border-gray-100 bg-gray-50/50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex mb-4 text-xs font-medium text-gray-400 space-x-2">
              <Link href="/" className="hover:text-black transition">
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-600">Collections</span>
            </nav>
            <h1 className="text-3xl font-black tracking-tight text-black sm:text-5xl uppercase">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="mt-4 text-base sm:text-lg text-gray-500 leading-relaxed">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm font-medium text-gray-500">
            Showing {products.length}{' '}
            {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {hasProducts ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg font-medium">
              This collection is currently empty.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Check back later or explore our other categories.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-black text-white px-6 py-3 text-sm font-semibold hover:bg-gray-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
