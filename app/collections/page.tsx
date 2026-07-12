import { shopifyFetch } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { CollectionsQuery, ShopifyCollection } from '@/types/shopify';
import { GET_COLLECTIONS } from '@/lib/shopify-queries';


export const metadata = {
  title: 'Collections | SportGear Store',
  description: 'Browse our curated collections of premium sports gear',
};

export default async function CollectionsPage() {
  let collections: ShopifyCollection[] = [];
  let error: string | null = null;

  try {
    const data = await shopifyFetch<CollectionsQuery>(GET_COLLECTIONS);
    collections = data?.collections?.edges?.map((edge) => edge.node) || [];
  } catch (err) {
    console.error('Error fetching collections:', err);
    error = err instanceof Error ? err.message : 'Failed to load collections';
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="border-b border-gray-100 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Collections
          </h1>
          <p className="text-gray-500 text-sm">
            Explore our carefully curated categories
          </p>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="bg-rose-50 text-rose-700 p-4 rounded-xl mb-8 border border-rose-100">
              Error loading collections: {error}
            </div>
          )}

          {collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group block"
                >
                  <div className="rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-80 bg-gray-100 overflow-hidden">
                      {collection.image?.url ? (
                        <Image
                          src={collection.image.url}
                          alt={collection.image.altText || collection.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-6">
                        <h2 className="text-2xl font-black text-white tracking-tight">
                          {collection.title}
                        </h2>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-gray-600 text-sm line-clamp-2 min-h-[2.5rem] leading-relaxed">
                        {collection.description || 'No description available'}
                      </p>

                      <button className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 active:scale-95 transition-all font-semibold text-sm">
                        View Collection
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              {error
                ? 'Unable to load collections'
                : 'No collections available'}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
