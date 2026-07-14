'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Loader2 } from 'lucide-react';

interface VariantNode {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2?: {
    amount: string;
    currencyCode: string;
  };
  price?: {
    amount: string;
    currencyCode: string;
  };
}

interface ProductDetailsProps {
  product: {
    title: string;
    vendor?: string;
    variants: {
      edges: {
        node: VariantNode;
      }[];
    };
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const variants = product?.variants?.edges || [];
  const [selectedVariant, setSelectedVariant] = useState<
    VariantNode | undefined
  >(variants[0]?.node);

  const { addItem, isLoading } = useCart();

  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return;
    await addItem(selectedVariant.id, 1);
  };

  if (!product) {
    return (
      <div className="text-xs font-mono p-4 uppercase text-foreground bg-background">
        Product not found
      </div>
    );
  }

  return (
    <div className="space-y-6 uppercase tracking-wider font-mono text-xs max-w-sm text-foreground">
      {variants.length > 0 && (
        <div>
          <span className="text-xs uppercase tracking-wider block mb-2 text-zinc-400 dark:text-zinc-500">
            Size: (FR/EUR)
          </span>
          <div className="relative">
            <select
              value={selectedVariant?.id}
              onChange={(e) => {
                const variant = variants.find(
                  (edge) => edge.node.id === e.target.value
                )?.node;
                setSelectedVariant(variant);
              }}
              className="w-full border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-foreground px-4 py-3 uppercase tracking-widest text-xs font-mono focus:border-zinc-500 dark:focus:border-zinc-400 outline-none appearance-none rounded-none transition-colors duration-300"
            >
              {variants.map((edge) => (
                <option
                  key={edge.node.id}
                  value={edge.node.id}
                  className="bg-white dark:bg-zinc-900"
                >
                  {edge.node.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/70">
              ▼
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isLoading || !selectedVariant?.availableForSale}
        className="w-full bg-foreground text-background py-4 text-xs font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-zinc-100 dark:disabled:bg-zinc-800/60 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : selectedVariant?.availableForSale ? (
          'Add to Cart'
        ) : (
          'Sold Out'
        )}
      </button>
    </div>
  );
}
