// app/collections/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { shopifyFetch } from '@/lib/shopify';
import { Loader2 } from 'lucide-react';
import { GET_ALL_COLLECTIONS } from '@/lib/shopify-queries';
import { ShopifyCollectionsResponse } from './interfaces';
import { CollectionCard } from '@/app/collections/CollectionCard';

export default function CollectionsPage() {
  const [collections, setCollections] = useState<
    ShopifyCollectionsResponse['collections']['edges'][number]['node'][]
  >([]);
  const [visibleCount, setVisibleCount] = useState(9);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const data = await shopifyFetch<ShopifyCollectionsResponse>(
          GET_ALL_COLLECTIONS
        );
        const fetched = data?.collections?.edges.map((edge) => edge.node) || [];
        setCollections(fetched);
      } catch (err) {
        console.error('Error fetching collections:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCollections();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const visibleCollections = collections.slice(0, visibleCount);
  const hasMore = collections.length > visibleCount;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-24 font-mono text-xs uppercase tracking-wider selection:bg-foreground selection:text-background transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-border pb-8 mb-12">
          <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.2em] block mb-2">
            Shopify Directory
          </span>
          <h1 className="text-3xl font-black tracking-tight text-foreground sm:text-5xl">
            All Collections
          </h1>
        </div>

        {visibleCollections.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleCollections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-16 flex justify-center">
                <button
                  onClick={handleLoadMore}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-transparent px-10 py-4 text-xs font-bold text-foreground hover:bg-foreground hover:text-background active:scale-[0.97] transition-all tracking-widest uppercase backdrop-blur-sm cursor-pointer"
                >
                  Load More
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 dark:text-zinc-500">
              No collections found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
