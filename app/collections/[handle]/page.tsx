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
      <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-4 transition-colors duration-300">
        <h1 className="text-2xl font-black mb-2 text-foreground uppercase tracking-tight">
          Collection Not Found
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 mb-6 font-light text-sm">
          {"We couldn't find the collection you're looking for."}
        </p>
        <Link
          href="/"
          className="rounded-xl bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          Back to Home
        </Link>
      </main>
    );
  }

  const products = collection.products?.edges.map((edge) => edge.node) || [];
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background transition-colors duration-300">
      {/* Шапка коллекции */}
      <section className="border-b border-border bg-zinc-50/50 dark:bg-zinc-900/10 py-12 sm:py-16 transition-colors">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav className="flex mb-4 text-[11px] font-bold tracking-wider uppercase text-gray-400 dark:text-zinc-500 space-x-2">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-gray-500 dark:text-zinc-400">
                Collections
              </span>
            </nav>
            <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl uppercase">
              {collection.title}
            </h1>
            {collection.description && (
              <p className="mt-4 text-base text-gray-500 dark:text-zinc-400 font-light leading-relaxed">
                {collection.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-zinc-500">
            Showing {products.length}{' '}
            {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {hasProducts ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-border transition-colors">
            <p className="text-gray-500 dark:text-zinc-400 text-lg font-medium">
              This collection is currently empty.
            </p>
            <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1 font-light">
              Check back later or explore our other categories.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-foreground text-background px-6 py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
