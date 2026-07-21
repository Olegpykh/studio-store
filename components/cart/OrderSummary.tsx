'use client';

import { ArrowRight, Loader2 } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatPrice';
import type { MoneyV2 } from '@/hooks/types';

interface OrderSummaryProps {
  totalAmount: MoneyV2 | null;
  isLoading: boolean;
  itemsCount: number;
  onCheckout: () => void;
}

export function OrderSummary({
  totalAmount,
  isLoading,
  itemsCount,
  onCheckout,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900/30 border border-border p-8 space-y-6">
      <h2 className="text-xs font-bold tracking-[0.2em] uppercase border-b border-border pb-4 text-foreground font-mono">
        Order Summary
      </h2>

      <div className="space-y-4 text-xs font-mono text-gray-600 dark:text-zinc-400">
        <div className="flex justify-between">
          <span className="uppercase tracking-wider">Subtotal</span>
          <span className="font-bold text-foreground">
            {totalAmount
              ? formatPrice(totalAmount.amount, totalAmount.currencyCode)
              : '0.00 €'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase tracking-wider">Shipping</span>
          <span className="text-gray-400 dark:text-zinc-500 tracking-wider">
            Calculated at checkout
          </span>
        </div>
        <div className="flex justify-between">
          <span className="uppercase tracking-wider">Taxes</span>
          <span className="text-gray-400 dark:text-zinc-500 tracking-wider">
            Included
          </span>
        </div>
      </div>

      <div className="border-t border-border pt-4 flex justify-between items-center font-bold text-foreground font-mono">
        <span className="text-xs tracking-[0.2em] uppercase">Total</span>
        <span className="text-lg">
          {totalAmount
            ? formatPrice(totalAmount.amount, totalAmount.currencyCode)
            : '0.00 €'}
        </span>
      </div>

      <button
        onClick={onCheckout}
        disabled={isLoading || itemsCount === 0}
        className="w-full bg-foreground text-background py-3.5 text-xs font-bold tracking-[0.15em] uppercase font-mono hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 cursor-pointer"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
}
