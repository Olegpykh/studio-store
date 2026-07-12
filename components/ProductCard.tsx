'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/types/shopify';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const productLink = product.handle ? `/products/${product.handle}` : '/';

  const allImages: string[] = [];

  if (product.featuredImage?.url) {
    allImages.push(product.featuredImage.url);
  }

  if (product.images?.edges) {
    product.images.edges.forEach((edge) => {
      if (edge.node?.url && !allImages.includes(edge.node.url)) {
        allImages.push(edge.node.url);
      }
    });
  }

  const hasImages = allImages.length > 0;

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImgIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const price = product.priceRange?.minVariantPrice?.amount
    ? `${Number(product.priceRange.minVariantPrice.amount).toFixed(2)} ${
        product.priceRange.minVariantPrice.currencyCode === 'EUR'
          ? '€'
          : product.priceRange.minVariantPrice.currencyCode
      }`
    : 'View Details';

  return (
    <Link
      href={productLink}
      className="group cursor-pointer block tracking-tight"
    >
      <div className="overflow-hidden rounded-2xl bg-[#fafafa] border border-gray-100/70 aspect-square relative flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] group-hover:border-gray-200/60">
        {hasImages ? (
          <>
            <div className="relative w-full h-full p-6 transition-transform duration-700 ease-out group-hover:scale-[1.02]">
              <Image
                src={allImages[currentImgIndex]}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain p-6 transition-opacity duration-300"
                priority={false}
              />
            </div>

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 text-black opacity-0 group-hover:opacity-100 hover:bg-white active:scale-90 transition-all duration-300 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-gray-100 text-black opacity-0 group-hover:opacity-100 hover:bg-white active:scale-90 transition-all duration-300 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {allImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-[2px] transition-all duration-300 rounded-full ${
                        idx === currentImgIndex
                          ? 'w-4 bg-black'
                          : 'w-1.5 bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300 text-[10px] font-bold uppercase tracking-widest">
            No Image
          </div>
        )}
      </div>

      <div className="mt-5 space-y-1 px-1">
        {product.vendor && (
          <span className="text-[10px] text-gray-400 uppercase font-bold tracking-[0.15em] block">
            {product.vendor}
          </span>
        )}

        <h4 className="font-medium text-sm text-black group-hover:text-gray-500 transition-colors duration-300 line-clamp-2 min-h-[2.5rem] leading-snug">
          {product.title}
        </h4>

        <div className="pt-1 flex items-center justify-between">
          <p className="text-sm font-bold text-black tracking-wide">{price}</p>

          <span className="text-xs text-black opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-light">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
