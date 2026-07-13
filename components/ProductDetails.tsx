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

  if (!product)
    return (
      <div className="text-xs font-mono p-4 uppercase">Product not found</div>
    );

  return (
    <div className="space-y-6 uppercase tracking-wider font-mono text-xs max-w-sm">
      {variants.length > 0 && (
        <div>
          <span className="text-xs uppercase tracking-wider block mb-2">
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
              className="w-full border border-black bg-white px-4 py-3 uppercase tracking-widest text-xs font-mono focus:border-gray-500 outline-none appearance-none rounded-none"
            >
              {variants.map((edge) => (
                <option key={edge.node.id} value={edge.node.id}>
                  {edge.node.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black">
              ▼
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        disabled={isLoading || !selectedVariant?.availableForSale}
        className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-900 transition-colors duration-300 flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-gray-400"
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
