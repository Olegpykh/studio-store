'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Bookmark,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/lib/wishlist';

interface ProductImage {
  node: {
    url: string;
    altText?: string | null;
  };
}

interface Price {
  amount: string;
  currencyCode: string;
}

interface ProductDetailsProps {
  product: {
    id: string;
    title: string;
    handle: string;
    descriptionHtml?: string;
    description?: string;
    vendor?: string;
    images?: {
      edges: ProductImage[];
    };
    priceRange?: {
      minVariantPrice: Price;
    };
    variants?: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          availableForSale: boolean;
          price?: Price;
        };
      }>;
    };
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const images = product?.images?.edges || [];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants?.edges?.[0]?.node?.id || ''
  );

  const [isSaved, setIsSaved] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && product?.id) {
      return getWishlist().some((item) => item.id === product.id);
    }
    return false;
  });

  useEffect(() => {
    if (!product?.id) return;

    const timer = setTimeout(() => {
      const wishlist = getWishlist();
      setIsSaved(wishlist.some((item) => item.id === product.id));
    }, 0);

    return () => clearTimeout(timer);
  }, [product?.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product?.id) return;

    if (isSaved) {
      removeFromWishlist(product.id);
      setIsSaved(false);
    } else {
      const safeImageEdges = (product.images?.edges || []).map((edge) => ({
        node: {
          url: edge.node.url,
          altText: edge.node.altText ?? null,
        },
      }));

      addToWishlist({
        id: product.id,
        title: product.title,
        handle: product.handle,
        vendor: product.vendor || '',
        images: {
          edges: safeImageEdges,
        },
        priceRange: {
          minVariantPrice: {
            amount: product.priceRange?.minVariantPrice?.amount || '0.00',
            currencyCode:
              product.priceRange?.minVariantPrice?.currencyCode || 'EUR',
          },
        },
      });
      setIsSaved(true);
    }
  };

  const currentImage = images[activeImageIndex]?.node;
  const amount = product?.priceRange?.minVariantPrice?.amount;
  const currencyCode = product?.priceRange?.minVariantPrice?.currencyCode;
  const formattedPrice = amount
    ? `${Number(amount).toFixed(2)} ${
        currencyCode === 'EUR' ? '€' : currencyCode
      }`
    : '';

  const cleanDescriptionHtml = product.descriptionHtml
    ? product.descriptionHtml.replace(
        /<img[^>]*>|<figure[^>]*>([\s\S]*?)<\/figure>/gi,
        ''
      )
    : '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-6">
      {/* Левая колонка: Изображения */}
      <div className="lg:col-span-7 space-y-4">
        {/* Главное изображение */}
        <div className="relative aspect-square bg-zinc-50 dark:bg-zinc-900 border border-border/80 overflow-hidden">
          {currentImage?.url ? (
            <Image
              src={currentImage.url}
              alt={currentImage.altText || product.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              // Изменили object-cover на object-contain, чтобы фотка не резалась
              className="object-contain p-6"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-xs text-zinc-400">
              NO IMAGE AVAILABLE
            </div>
          )}
        </div>

        {/* Галерея превью */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.map((edge, index) => (
              <button
                key={edge.node.url}
                onClick={() => setActiveImageIndex(index)}
                className={`relative aspect-square border bg-zinc-50 dark:bg-zinc-900 transition-all ${
                  activeImageIndex === index
                    ? 'border-foreground ring-1 ring-foreground/20'
                    : 'border-border/60 hover:border-foreground/50'
                }`}
              >
                <Image
                  src={edge.node.url}
                  alt={edge.node.altText || `Preview ${index + 1}`}
                  fill
                  sizes="100px"
                  // Тут тоже меняем на object-contain для превьюшек
                  className="object-contain p-2"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Правая колонка: Только инфо, выбор конфигураций и покупка */}
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Бренд, Название и Цена */}
          <div className="space-y-1">
            {product.vendor && (
              <span className="text-[10px] font-bold font-mono tracking-[0.2em] text-gray-400 dark:text-zinc-500 uppercase block">
                {product.vendor}
              </span>
            )}
            <h1 className="text-xl lg:text-2xl font-bold font-mono uppercase tracking-wider text-foreground">
              {product.title}
            </h1>
            <p className="text-lg font-bold font-mono mt-2 text-foreground">
              {formattedPrice}
            </p>
          </div>

          <hr className="border-border/65" />

          {/* Выбор вариантов */}
          {product.variants && product.variants.edges.length > 1 && (
            <div className="space-y-3">
              <span className="text-[9px] font-bold font-mono tracking-wider text-gray-400 dark:text-zinc-500 uppercase block">
                Select Configuration
              </span>
              <div className="flex flex-wrap gap-2">
                {product.variants.edges.map(({ node }) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedVariantId(node.id)}
                    disabled={!node.availableForSale}
                    className={`px-3 py-2 text-[10px] font-mono border transition-all ${
                      !node.availableForSale
                        ? 'border-border/40 text-zinc-400 line-through cursor-not-allowed'
                        : selectedVariantId === node.id
                        ? 'border-foreground bg-foreground text-background font-bold'
                        : 'border-border hover:border-foreground'
                    }`}
                  >
                    {node.title}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Описание товара */}
          {cleanDescriptionHtml ? (
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-xs text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed space-y-2"
              dangerouslySetInnerHTML={{ __html: cleanDescriptionHtml }}
            />
          ) : (
            product.description && (
              <p className="text-xs text-zinc-600 dark:text-zinc-400 font-mono leading-relaxed">
                {product.description}
              </p>
            )
          )}
        </div>

        {/* Действия и преимущества */}
        <div className="space-y-6 mt-8">
          <div className="flex gap-3">
            <button
              className="flex-1 bg-foreground text-background border border-foreground hover:bg-background hover:text-foreground transition-all py-3.5 px-6 text-xs font-bold font-mono tracking-widest uppercase flex items-center justify-center gap-2"
              onClick={() => console.log('Add to cart:', selectedVariantId)}
            >
              <ShoppingBag className="w-4 h-4" />
              Acquire Hardware
            </button>

            <button
              onClick={toggleWishlist}
              className={`p-3.5 border transition-all flex items-center justify-center ${
                isSaved
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border hover:border-foreground text-foreground bg-transparent'
              }`}
              aria-label={isSaved ? 'Remove from vault' : 'Secure in vault'}
            >
              <Bookmark
                className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`}
              />
            </button>
          </div>

          {/* Гарантии и ТТХ */}
          <div className="border border-border/80 p-4 space-y-3 bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="flex items-center gap-2.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              <Truck className="w-4 h-4 text-foreground/75" />
              <span>
                Worldwide tactical dispatch available (3-5 business days)
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              <RotateCcw className="w-4 h-4 text-foreground/75" />
              <span>30-day return window on unused equipment</span>
            </div>
            <div className="flex items-center gap-2.5 text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
              <ShieldCheck className="w-4 h-4 text-foreground/75" />
              <span>Secure transaction pipeline with 256-bit encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
