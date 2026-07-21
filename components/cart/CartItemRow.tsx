'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, X } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { CartItem } from '@/hooks/types';

interface CartItemRowProps {
  item: CartItem;
  isLoading: boolean;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export function CartItemRow({
  item,
  isLoading,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const product = item.merchandise.product;
  const image = product.featuredImage;

  return (
    <div className="py-8 first:pt-0 flex flex-col sm:flex-row gap-6 relative group">
      {/* Картинка ведет на страницу товара /products/[handle] */}
      <Link
        href={`/products/${product.handle}`}
        className="aspect-[3/4] w-full sm:w-36 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden border border-border flex-shrink-0 transition-opacity hover:opacity-80"
      >
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="144px"
            className="object-contain p-4"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-700 text-[9px] font-bold">
            No Image
          </div>
        )}
      </Link>

      <div className="flex flex-col flex-1 justify-between pt-1">
        <div>
          <div className="flex justify-between items-start gap-4">
            <div>
              {product.vendor && (
                <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.15em] block mb-1">
                  {product.vendor}
                </span>
              )}
              <Link
                href={`/products/${product.handle}`}
                className="font-bold text-sm hover:text-gray-500 dark:hover:text-zinc-400 transition-colors tracking-widest block text-foreground"
              >
                {product.title}
              </Link>
              <p className="text-gray-400 dark:text-zinc-500 text-[11px] mt-1 tracking-normal normal-case font-sans">
                Size/Variant: {item.merchandise.title}
              </p>
            </div>

            <span className="font-bold text-sm text-foreground">
              {formatPrice(
                item.merchandise.price.amount,
                item.merchandise.price.currencyCode
              )}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center border border-foreground h-9">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={isLoading}
              className="px-3 h-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-200 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="px-4 text-xs font-bold font-mono min-w-[2.5rem] text-center text-foreground">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={isLoading}
              className="px-3 h-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-200 disabled:opacity-30 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            disabled={isLoading}
            className="text-gray-400 dark:text-zinc-500 hover:text-foreground dark:hover:text-white transition-colors duration-200 flex items-center gap-1 text-[10px] uppercase font-bold tracking-widest cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}
