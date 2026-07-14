'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Minus, Plus, X, ArrowRight, Loader2 } from 'lucide-react';

export default function CartPage() {
  const {
    items,
    totalAmount,
    isLoading,
    updateQuantity,
    removeItem,
    checkoutUrl,
  } = useCart();

  const formatPrice = (amount: string, currencyCode: string) => {
    const value = Number(amount).toFixed(2);
    if (currencyCode === 'EUR') return `${value} €`;
    return `${value} ${currencyCode}`;
  };

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
              {items.map((item) => {
                const product = item.merchandise.product;
                const image = product.featuredImage;

                return (
                  <div
                    key={item.id}
                    className="py-8 first:pt-0 flex flex-col sm:flex-row gap-6 relative group"
                  >
                    <div className="aspect-[3/4] w-full sm:w-36 bg-zinc-50 dark:bg-zinc-900/50 relative overflow-hidden border border-border flex-shrink-0 dark:opacity-90">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText || product.title}
                          fill
                          sizes="144px"
                          className="object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-zinc-700 text-[9px] font-bold">
                          No Image
                        </div>
                      )}
                    </div>

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
                              href={`/product/${product.handle}`}
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
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={isLoading}
                            className="px-3 h-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-200 disabled:opacity-30 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-4 text-xs font-bold font-mono min-w-[2.5rem] text-center text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={isLoading}
                            className="px-3 h-full flex items-center justify-center hover:bg-foreground hover:text-background transition-colors duration-200 disabled:opacity-30 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
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
              })}
            </div>

            <div className="lg:col-span-4 bg-zinc-50 dark:bg-zinc-900/30 border border-border p-8 space-y-6 relative transition-colors">
              <h2 className="text-xs font-bold tracking-[0.2em] border-b border-border pb-4 text-foreground">
                Order Summary
              </h2>

              <div className="space-y-4 font-light text-gray-600 dark:text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-foreground font-medium">
                    {totalAmount
                      ? formatPrice(
                          totalAmount.amount,
                          totalAmount.currencyCode
                        )
                      : '0.00 €'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 tracking-wider">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Duties & Taxes</span>
                  <span className="text-[10px] text-gray-400 dark:text-zinc-500 tracking-wider">
                    Included
                  </span>
                </div>
              </div>

              <div className="border-t border-border pt-4 flex justify-between items-baseline font-bold text-sm tracking-[0.15em] text-foreground">
                <span>Total</span>
                <span className="text-lg font-mono">
                  {totalAmount
                    ? formatPrice(totalAmount.amount, totalAmount.currencyCode)
                    : '0.00 €'}
                </span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isLoading || items.length === 0}
                className="w-full bg-foreground text-background py-4 font-bold hover:opacity-90 transition-opacity duration-300 flex items-center justify-center gap-2 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 dark:disabled:text-zinc-600 disabled:cursor-not-allowed cursor-pointer"
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

              <div className="text-[10px] tracking-normal normal-case text-gray-400 dark:text-zinc-500 font-sans leading-relaxed pt-2 text-center">
                Secure checkout powered by Shopify. Returns are available within
                14 days of delivery.
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
