'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // Импортируем хук для чтения URL
import Link from 'next/link';
import Image from 'next/image';
import { Search, Loader2 } from 'lucide-react';
import { shopifyFetch } from '@/lib/shopify';
import { SEARCH_PRODUCTS_QUERY } from '@/lib/shopify-queries';
import { ShopifyProduct } from '@/types/shopify';

interface ShopifySearchResponse {
  products: {
    edges: {
      node: ShopifyProduct;
    }[];
  };
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || ''; // 1. Достаем слово, которое прилетело из шапки

  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [products, setProducts] = useState<{ node: ShopifyProduct }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Синхронизируем инпут, если пользователь ввёл новое слово в шапке и нажал Enter повторно
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // 2. Дебаунс: ждем 300мс после того, как пользователь закончил печатать (прямо на этой странице)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // 3. Запрос в Shopify при изменении дебаунс-строки
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
          {
            query: debouncedQuery,
          }
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
    <main className="min-h-screen bg-white text-black pt-12 pb-24 selection:bg-black selection:text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ИНПУТ ПОИСКА ПРЯМО НА СТРАНИЦЕ */}
        <div className="border-b border-gray-100 pb-8 mb-12">
          <span className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase block mb-3">
            Search Catalogue
          </span>
          <div className="relative max-w-xl">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)} // Меняем текст без всяких Enter!
              placeholder="Search products, brands, collections..."
              className="w-full bg-[#fafafa] border border-gray-200/80 rounded-2xl pl-12 pr-4 py-4 text-sm font-medium tracking-wide focus:border-black focus:bg-white focus:outline-none transition-all text-black placeholder-gray-400 shadow-sm"
              autoFocus
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-black" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-3 font-medium">
            {isLoading
              ? 'Searching Shopify database...'
              : `Found ${products.length} ${
                  products.length === 1 ? 'item' : 'items'
                }`}
          </p>
        </div>

        {/* ОБРАБОТКА ОШИБКИ */}
        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-100 mb-8 uppercase tracking-wide">
            An error occurred while searching: {error}
          </div>
        )}

        {/* ПУСТОЙ СТЕЙТ */}
        {!isLoading && debouncedQuery && products.length === 0 && (
          <div className="text-center py-20 max-w-md mx-auto">
            <h3 className="text-base font-bold uppercase tracking-wider mb-2">
              No results found
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">
              We couldn&apos;t find anything matching &ldquo;{debouncedQuery}
              &rdquo;. Try checking for misspellings.
            </p>
          </div>
        )}

        {/* СЕТКА ТОВАРОВ */}
        <div
          className={`transition-opacity duration-200 ${
            isLoading ? 'opacity-40 pointer-events-none' : 'opacity-100'
          }`}
        >
          {products.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8">
              {products.map(({ node: product }) => {
                const firstImage = product.images?.edges[0]?.node;
                const price = product.priceRange?.minVariantPrice;

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.handle}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="aspect-[3/4] w-full bg-[#fafafa] rounded-2xl overflow-hidden relative border border-gray-100/60">
                      {firstImage ? (
                        <Image
                          src={firstImage.url}
                          alt={firstImage.altText || product.title}
                          fill
                          sizes="(max-w-7xl) 25vw, 33vw"
                          className="object-cover object-center group-hover:scale-105 duration-500 ease-out transition-transform"
                          priority={false}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px] uppercase font-bold tracking-wider">
                          No Image
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex flex-col flex-1 gap-1">
                      {product.vendor && (
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">
                          {product.vendor}
                        </span>
                      )}
                      <h2 className="text-xs font-bold uppercase tracking-tight text-black line-clamp-1 group-hover:text-gray-600 transition-colors">
                        {product.title}
                      </h2>
                      <p className="text-xs font-semibold text-gray-500 mt-auto pt-1">
                        {price
                          ? `${Number(price.amount).toFixed(2)} ${
                              price.currencyCode === 'EUR'
                                ? '€'
                                : price.currencyCode
                            }`
                          : '—'}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
