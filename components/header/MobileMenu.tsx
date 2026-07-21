'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, User, ArrowUpRight } from 'lucide-react';
import { navigationConfig } from './config';
import { getWishlist } from '@/lib/wishlist';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [wishlistCount, setWishlistCount] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      return getWishlist().length;
    }
    return 0;
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleWishlistUpdate = () => {
      setWishlistCount(getWishlist().length);
    };

    window.addEventListener('wishlist-updated', handleWishlistUpdate);
    return () => {
      window.removeEventListener('wishlist-updated', handleWishlistUpdate);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden border-t border-border bg-background/95 dark:bg-zinc-950/95 backdrop-blur-md px-6 py-8 space-y-8 shadow-xl max-h-[calc(100vh-80px)] overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300 transition-colors">
      {navigationConfig.map((cat) => (
        <div key={cat.trigger} className="space-y-4">
          <h2 className="text-xs font-bold text-foreground uppercase tracking-[0.2em] border-b border-border pb-2">
            {cat.title}
          </h2>

          <div className="flex flex-col gap-3.5 pl-1">
            {cat.groups
              .flatMap((g) => g.items)
              .map((item) => (
                <Link
                  key={item.handle}
                  href={`/collections/${item.handle}`}
                  onClick={onClose}
                  className="text-sm font-medium text-gray-500 dark:text-zinc-400 hover:text-foreground active:text-foreground active:translate-x-1 transition-all duration-200 block cursor-pointer"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      ))}

      <div className="space-y-4 pt-4 border-t border-border/60">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-[0.2em] pb-1">
          User Panel
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center justify-between p-3 border border-border/80 bg-background/50 hover:border-foreground/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Vault
              </span>
            </div>
            {wishlistCount > 0 ? (
              <span className="bg-foreground text-background text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-none">
                {wishlistCount}
              </span>
            ) : (
              <ArrowUpRight className="w-3 h-3 text-gray-400" />
            )}
          </Link>

          <Link
            href="/account"
            onClick={onClose}
            className="flex items-center justify-between p-3 border border-border/80 bg-background/50 hover:border-foreground/40 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400 dark:text-zinc-500" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider">
                Profile
              </span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
