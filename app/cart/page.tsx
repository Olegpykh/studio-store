'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { ArrowRight } from 'lucide-react';
import { CartItemRow } from '@/components/cart/CartItemRow';
import { OrderSummary } from '@/components/cart/OrderSummary';

export default function CartPage() {
  const {
    items,
    totalAmount,
    isLoading,
    updateQuantity,
    removeItem,
    checkoutUrl,
  } = useCart();

  const handleCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-32 uppercase tracking-wider font-mono text-xs transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-foreground pb-4 mb-12 flex justify-between items-baseline">
          <h1 className="text-sm font-bold tracking-[0.2em]">Shopping Bag</h1>
          <span className="text-gray-400 dark:text-zinc-500 font-sans tracking-normal normal-case text-[11px]">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-32 max-w-sm mx-auto">
            <p className="text-gray-500 dark:text-zinc-400 mb-8 font-light tracking-widest">
              Your shopping bag is empty.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center w-full bg-foreground text-background py-4 px-6 font-bold hover:opacity-90 transition-opacity duration-300 gap-2 cursor-pointer"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-8 space-y-0 divide-y divide-border">
              {items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  isLoading={isLoading}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>

            <OrderSummary
              totalAmount={totalAmount}
              isLoading={isLoading}
              itemsCount={items.length}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </div>
    </main>
  );
}
