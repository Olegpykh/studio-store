'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search, Loader2 } from 'lucide-react';
import { shopifyFetch } from '@/lib/shopify';
import { SEARCH_PRODUCTS_QUERY } from '@/lib/shopify-queries';
import { ShopifyProduct, ShopifySearchResponse } from '@/types/shopify';
import { ProductCard } from '@/components/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setQuery(initialQuery);
  }

  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [products, setProducts] = useState<{ node: ShopifyProduct }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    async function fetchSearch() {
      if (!debouncedQuery.trim()) {
        setProducts([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await shopifyFetch<ShopifySearchResponse>(
          SEARCH_PRODUCTS_QUERY,
          { query: debouncedQuery }
        );
        setProducts(data?.products?.edges || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setIsLoading(false);
      }
    }

    fetchSearch();
  }, [debouncedQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-b border-border pb-8 mb-12">
        <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.2em] uppercase block mb-3">
          Search Catalogue
        </span>
        <div className="relative max-w-xl">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, brands, collections..."
            className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium tracking-wide focus:border-foreground/40 dark:focus:border-zinc-500 focus:bg-background dark:focus:bg-zinc-900 focus:outline-none transition-all text-foreground placeholder-gray-400 dark:placeholder-zinc-500 shadow-sm"
            autoFocus
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500">
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin text-foreground" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>
        </div>

        <p className="text-[11px] text-gray-400 dark:text-zinc-500 mt-3 font-medium">
          {isLoading
            ? 'Searching Shopify database...'
            : `Found ${products.length} ${
                products.length === 1 ? 'item' : 'items'
              }`}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 text-rose-500 text-xs font-semibold rounded-xl border border-rose-500/20 mb-8 uppercase tracking-wide">
          An error occurred while searching: {error}
        </div>
      )}

      {!isLoading && debouncedQuery && products.length === 0 && (
        <div className="text-center py-20 max-w-md mx-auto">
          <h3 className="text-base font-bold uppercase tracking-wider mb-2 text-foreground">
            No results found
          </h3>
          <p className="text-sm text-gray-500 dark:text-zinc-400 font-light leading-relaxed mb-8">
            We couldn&apos;t find anything matching &ldquo;{debouncedQuery}
            &rdquo;. Try checking for misspellings.
          </p>
        </div>
      )}

      <div
        className={`transition-opacity duration-200 ${
          isLoading ? 'opacity-40 pointer-events-none' : 'opacity-100'
        }`}
      >
        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8">
            {products.map(({ node: product }) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-24 selection:bg-foreground selection:text-background transition-colors duration-300">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-8 h-8 animate-spin text-foreground" />
          </div>
        }
      >
        <SearchContent />
      </Suspense>
    </main>
  );
}
