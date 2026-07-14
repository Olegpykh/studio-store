'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react'; 

interface ProductImageNode {
  url: string;
  altText: string | null;
}

interface ProductGalleryProps {
  images: { node: ProductImageNode }[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] w-full bg-zinc-50 dark:bg-zinc-900/40 flex items-center justify-center text-zinc-400 dark:text-zinc-600 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl text-[10px] font-bold uppercase tracking-widest">
        No Image
      </div>
    );
  }

  const activeImage = images[activeIdx]?.node;

  const nextImage = () => {
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] w-full bg-zinc-50 dark:bg-zinc-900/40 relative overflow-hidden border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl transition-colors duration-300 group">
        <Image
          src={activeImage.url}
          alt={activeImage.altText || title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain object-center p-6 transition-all duration-300"
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800 text-foreground opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-zinc-800 active:scale-90 transition-all duration-300 z-10 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full flex items-center justify-center border border-zinc-200/50 dark:border-zinc-800 text-foreground opacity-0 group-hover:opacity-100 hover:bg-white dark:hover:bg-zinc-800 active:scale-90 transition-all duration-300 z-10 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border">
          {images.map((edge, idx) => {
            const img = edge.node;
            const isActive = idx === activeIdx;
            return (
              <button
                key={idx}
                onClick={() => setActiveIdx(idx)}
                className={`relative w-20 h-20 flex-shrink-0 bg-zinc-50 dark:bg-zinc-900/40 border rounded-xl overflow-hidden transition-all cursor-pointer ${
                  isActive
                    ? 'border-foreground ring-2 ring-foreground/10'
                    : 'border-zinc-200/50 dark:border-zinc-800/80 hover:border-foreground/30 dark:hover:border-zinc-700'
                }`}
              >
                <Image
                  src={img.url}
                  alt={img.altText || `${title} preview ${idx + 1}`}
                  fill
                  sizes="80px"
                  className="object-contain p-2"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
