'use client';

import Link from 'next/link';
import { navigationConfig } from './config';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
    </div>
  );
}
