'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/types/shopify';
import { ChevronLeft, ChevronRight, Bookmark, ImageOff } from 'lucide-react';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  type WishlistItem,
} from '@/lib/wishlist';

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const productLink = product.handle ? `/products/${product.handle}` : '/';

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSaved(getWishlist().some((item) => item.id === product.id));
    }, 0);

    const handleWishlistUpdate = () => {
      setIsSaved(getWishlist().some((item) => item.id === product.id));
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, [product.id]);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product.id) return;

    if (isSaved) {
      removeFromWishlist(product.id);
      setIsSaved(false);
    } else {
      const wishlistImages: { url: string; altText: string | null }[] = [];

      if (product.featuredImage?.url) {
        wishlistImages.push({
          url: product.featuredImage.url,
          altText: product.featuredImage.altText || null,
        });
      }

      product.images?.edges?.forEach((edge) => {
        if (
          edge.node?.url &&
          !wishlistImages.some((img) => img.url === edge.node.url)
        ) {
          wishlistImages.push({
            url: edge.node.url,
            altText: edge.node.altText || null,
          });
        }
      });

      const wishlistItem: WishlistItem = {
        id: product.id,
        title: product.title,
        handle: product.handle,
        vendor: product.vendor,
        priceRange: {
          minVariantPrice: {
            amount: product.priceRange?.minVariantPrice?.amount || '0.00',
            currencyCode:
              product.priceRange?.minVariantPrice?.currencyCode || 'EUR',
          },
        },
        images: {
          edges: wishlistImages.map((img) => ({
            node: img,
          })),
        },
      };

      addToWishlist(wishlistItem);
      setIsSaved(true);
    }
  };

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
      className="group cursor-pointer block tracking-tight text-foreground relative"
    >
      <div className="overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/80 aspect-square relative flex items-center justify-center transition-all duration-500 group-hover:bg-background dark:group-hover:bg-zinc-900 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.02)] dark:group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
        <button
          onClick={handleWishlistClick}
          className="absolute top-4 right-4 z-20 p-2 text-foreground hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer group/btn"
          aria-label={isSaved ? 'Remove from saved' : 'Save item'}
        >
          <Bookmark
            className={`w-5 h-5 transition-all duration-300 ${
              isSaved
                ? 'fill-foreground text-foreground'
                : 'text-zinc-400 dark:text-zinc-500 group-hover/btn:text-foreground'
            }`}
          />
        </button>

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
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800 text-foreground opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-zinc-800 active:scale-90 transition-all duration-300 z-10 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800 text-foreground opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-zinc-800 active:scale-90 transition-all duration-300 z-10 cursor-pointer"
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
                          ? 'w-4 bg-foreground'
                          : 'w-1.5 bg-zinc-300 dark:bg-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-zinc-300 dark:text-zinc-700">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,currentColor_0px,currentColor_1px,transparent_1px,transparent_12px)] opacity-[0.07]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <ImageOff className="w-7 h-7 stroke-[1.25] text-zinc-300 dark:text-zinc-700" />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-700">
                  No Image
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 space-y-1 px-1">
        {product.vendor && (
          <span className="text-[10px] text-gray-400 dark:text-zinc-500 uppercase font-bold tracking-[0.15em] block">
            {product.vendor}
          </span>
        )}

        <h4 className="font-medium text-sm text-foreground group-hover:text-gray-500 dark:group-hover:text-zinc-400 transition-colors duration-300 line-clamp-2 min-h-[2.5rem] leading-snug">
          {product.title}
        </h4>

        <div className="pt-1 flex items-center justify-between">
          <p className="text-sm font-bold text-foreground tracking-wide">
            {price}
          </p>

          <span className="text-xs text-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-light">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
