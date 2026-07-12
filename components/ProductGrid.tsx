'use client';

import { useState } from 'react';
import { ShopifyProduct } from '@/types/shopify';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: ShopifyProduct[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const INITIAL_COUNT = 16;
  const STEP = 8;

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const hasMore = visibleCount < products.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + STEP, products.length));
  };

  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="space-y-16">
      <div className="grid grid-cols-1 gap-y-14 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {hasMore && (
        <div className="flex flex-col items-center justify-center pt-4 animate-in fade-in duration-500">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">
            Showing {visibleCount} of {products.length} Products
          </span>

          <div className="w-48 h-[1px] bg-gray-100 mb-6 relative">
            <div
              className="absolute left-0 top-0 h-full bg-black transition-all duration-500"
              style={{ width: `${(visibleCount / products.length) * 100}%` }}
            />
          </div>

          <button
            onClick={loadMore}
            className="rounded-xl border border-black/10 bg-transparent px-10 py-4 text-xs font-bold text-black hover:bg-black hover:text-white hover:border-black active:scale-[0.97] transition-all tracking-widest uppercase backdrop-blur-sm"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
