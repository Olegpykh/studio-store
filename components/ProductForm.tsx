'use client';

import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { ShopifyProductVariant } from '@/types/shopify';

interface ProductFormProps {
  variants: { node: ShopifyProductVariant }[];
}

export function ProductForm({ variants }: ProductFormProps) {
  const firstAvailableVariant =
    variants.find(({ node }) => node.availableForSale)?.node ||
    variants[0]?.node;

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    firstAvailableVariant?.id || ''
  );

  const currentVariant = variants.find(
    ({ node }) => node.id === selectedVariantId
  )?.node;

  if (!variants.length) return null;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] block">
          Available Options
        </h3>
        <div className="space-y-2.5">
          {variants.map(({ node }) => {
            const isSelected = selectedVariantId === node.id;
            const isAvailable = node.availableForSale; 

            return (
              <button
                key={node.id}
                type="button"
                disabled={!isAvailable}
                onClick={() => setSelectedVariantId(node.id)}
                className={`w-full flex items-center justify-between p-4 border rounded-xl text-left transition-all ${
                  !isAvailable
                    ? 'border-gray-100 opacity-40 bg-gray-50/50 cursor-not-allowed'
                    : isSelected
                    ? 'border-black bg-black/[0.02] ring-1 ring-black'
                    : 'border-gray-200/80 hover:border-black/35 bg-[#fafafa]/50'
                }`}
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-black">
                    {node.title}
                  </span>
                  <span className="text-xs text-gray-400 font-light">
                    {Number(node.priceV2.amount).toFixed(2)}{' '}
                    {node.priceV2.currencyCode === 'EUR'
                      ? '€'
                      : node.priceV2.currencyCode}
                  </span>
                </div>

                <div>
                  {isAvailable ? (
                    <span
                      className={`text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${
                        isSelected
                          ? 'text-black bg-white border-black/20'
                          : 'text-emerald-700 bg-emerald-50 border-emerald-100'
                      }`}
                    >
                      {isSelected ? 'Selected' : 'In Stock'}
                    </span>
                  ) : (
                    <span className="text-[9px] font-bold tracking-wider uppercase text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">
                      Sold Out
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          disabled={!currentVariant?.availableForSale}
          className="w-full h-14 bg-black disabled:bg-gray-100 disabled:text-gray-400 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 hover:bg-gray-800 disabled:hover:bg-gray-100 disabled:cursor-not-allowed active:scale-[0.99] transition-all shadow-md"
        >
          <ShoppingBag className="w-4 h-4" />
          {currentVariant?.availableForSale ? 'Add to Bag' : 'Sold Out'}
        </button>
      </div>
    </div>
  );
}
