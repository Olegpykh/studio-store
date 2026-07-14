'use client';

import { useState, useEffect } from 'react';
import { shopifyFetch } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
import { GET_ALL_COLLECTIONS} from '@/lib/shopify-queries';
import { ShopifyCollectionsResponse } from './interfaces';


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
              {visibleCollections.map((collection) => {
                const collectionLink = `/collections/${collection.handle}`;

                const imageUrl =
                  collection.image?.url ||
                  collection.products?.edges?.[0]?.node?.featuredImage?.url;

                const imageAlt =
                  collection.image?.altText ||
                  collection.products?.edges?.[0]?.node?.featuredImage
                    ?.altText ||
                  collection.title;

                return (
                  <Link
                    key={collection.id}
                    href={collectionLink}
                    className="group block cursor-pointer"
                  >
                    <div className="aspect-[4/3] w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-background dark:group-hover:bg-zinc-900 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
                      {imageUrl ? (
                        <div className="relative w-full h-full p-6 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                          <Image
                            src={imageUrl}
                            alt={imageAlt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain p-4"
                          />
                        </div>
                      ) : (
                        <div className="text-zinc-300 dark:text-zinc-600 font-bold text-[10px] tracking-widest">
                          No Cover Image
                        </div>
                      )}
                    </div>

                    <div className="mt-4 space-y-1 px-1">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-gray-500 dark:group-hover:text-zinc-400 transition-colors duration-300">
                        {collection.title}
                      </h3>
                      {collection.description && (
                        <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-sans normal-case tracking-normal font-light line-clamp-2 leading-relaxed">
                          {collection.description}
                        </p>
                      )}
                      <div className="pt-2 flex items-center text-foreground font-bold text-[10px]">
                        Explore Collection
                        <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
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
