'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  images: { node: { url: string; altText?: string | null } }[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const imgUrls = images?.map((edge) => edge.node.url) || [];
  const hasImages = imgUrls.length > 0;

  const nextImage = () => {
    setActiveIndex((prev) => (prev === imgUrls.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? imgUrls.length - 1 : prev / 1));
  };

  if (!hasImages) {
    return (
      <div className="aspect-[4/5] bg-[#fafafa] rounded-3xl border border-gray-100 flex items-center justify-center text-gray-300 text-xs font-bold uppercase tracking-widest">
        No Image Available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] bg-[#fafafa] rounded-3xl border border-gray-100/70 overflow-hidden flex items-center justify-center group">
        <Image
          src={imgUrls[activeIndex]}
          alt={title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-contain p-12 transition-all duration-500"
          priority
        />

        {imgUrls.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-6 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 text-black opacity-0 group-hover:opacity-100 active:scale-90 transition-all duration-300 shadow-sm z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 w-11 h-11 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center border border-gray-100 text-black opacity-0 group-hover:opacity-100 active:scale-90 transition-all duration-300 shadow-sm z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {imgUrls.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
          {imgUrls.map((url, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative w-20 aspect-square rounded-xl bg-[#fafafa] border overflow-hidden flex-shrink-0 transition-all duration-300 ${
                index === activeIndex
                  ? 'border-black ring-1 ring-black'
                  : 'border-gray-100 opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={url}
                alt={`${title} view ${index}`}
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
