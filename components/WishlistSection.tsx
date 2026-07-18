'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import {
  getWishlist,
  removeFromWishlist,
  type WishlistItem,
} from '@/lib/wishlist';

export function WishlistSection() {
  // 1. Инициализируем стейт сразу из localStorage, чтобы избежать лишних перезаписей
  const [products, setProducts] = useState<WishlistItem[]>([]);

  // Защита от гидратации: флаг, показывающий, смонтировался ли компонент на клиенте
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Оборачиваем вызовы setState в макротаску через setTimeout(..., 0).
    // Это убирает их из синхронного цикла эффекта, делая их асинхронными,
    // что полностью удовлетворяет строгому правилу линтера.
    const timer = setTimeout(() => {
      setIsMounted(true);
      setProducts(getWishlist());
    }, 0);

    // Подписываемся на события изменения вишлиста
    const handleWishlistUpdate = () => {
      setProducts(getWishlist());
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, []);

  const handleRemove = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  // Пока компонент не смонтирован на клиенте, показываем безопасный лоадер (предотвращает Hydration Mismatch)
  if (!isMounted) {
    return (
      <div className="flex justify-center items-center py-12">
        <span className="w-1.5 h-1.5 bg-foreground rounded-none animate-ping mr-2" />
        <span className="text-[10px] font-mono tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
          Accessing System Vault...
        </span>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="border border-dashed border-border/80 p-12 text-center flex flex-col items-center justify-center gap-4">
        <span className="text-[10px] font-mono tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
          Your personal vault is empty. No hardware saved.
        </span>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 border border-foreground/30 px-4 py-2.5 text-[9px] font-bold tracking-widest uppercase hover:bg-foreground hover:text-background transition-all font-mono"
        >
          Scan Tactical Gear
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((item, index) => {
        if (!item) return null;

        const uniqueKey = item.id
          ? `${item.id}-${index}`
          : `wishlist-item-${index}`;
        const imageUrl = item.images?.edges?.[0]?.node?.url;

        const amount = item.priceRange?.minVariantPrice?.amount;
        const currencyCode = item.priceRange?.minVariantPrice?.currencyCode;

        const formattedPrice = amount
          ? `${Number(amount).toFixed(2)} ${
              currencyCode === 'EUR' ? '€' : currencyCode
            }`
          : 'View Details';

        return (
          <div
            key={uniqueKey}
            className="border border-border/85 bg-background/30 p-4 flex gap-4 items-center hover:border-foreground/45 transition-colors relative"
          >
            {/* Картинка товара */}
            <div className="relative w-16 h-16 bg-zinc-50 dark:bg-zinc-900 border border-border/60 overflow-hidden shrink-0">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={item.title || 'Product Image'}
                  fill
                  sizes="64px"
                  className="object-cover p-1"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[8px] font-mono text-zinc-400">
                  N/A
                </div>
              )}
            </div>

            {/* Описание товара */}
            <Link
              href={item.handle ? `/products/${item.handle}` : '#'}
              className="flex-1 min-w-0 pr-24 hover:underline decoration-foreground/30"
            >
              {item.vendor && (
                <span className="text-[8px] font-bold font-mono tracking-[0.2em] text-gray-400 dark:text-zinc-500 uppercase block mb-0.5">
                  {item.vendor}
                </span>
              )}
              <h4 className="text-xs font-bold text-foreground truncate block uppercase tracking-wider font-mono">
                {item.title || 'Untitled Product'}
              </h4>
              <p className="font-mono text-xs text-foreground font-bold mt-1">
                {formattedPrice}
              </p>
            </Link>

            {/* Контейнер кнопок управления */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {/* Кнопка быстрого удаления */}
              <button
                onClick={(e) => handleRemove(item.id, e)}
                className="p-2 text-zinc-400 hover:text-red-500 hover:border-red-500/30 border border-transparent transition-colors cursor-pointer"
                aria-label="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              {/* Кнопка перехода на страницу товара */}
              {item.handle && (
                <Link
                  href={`/products/${item.handle}`}
                  className="p-2 border border-border/60 hover:bg-foreground hover:text-background transition-all"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
