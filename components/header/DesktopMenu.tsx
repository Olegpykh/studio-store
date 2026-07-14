'use client';

import Link from 'next/link';
import { navigationConfig } from './config';

interface DesktopMenuProps {
  activeDropdown: string | null;
  onClose: () => void;
}

export function DesktopMenu({ activeDropdown, onClose }: DesktopMenuProps) {
  if (!activeDropdown) return null;

  return (
    <div className="hidden md:block absolute left-0 right-0 bg-background border-b border-border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] z-50 animate-in fade-in slide-in-from-top-2 duration-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {navigationConfig
          .filter((cat) => cat.trigger === activeDropdown)
          .map((cat) => (
            <div key={cat.trigger} className="grid grid-cols-3 gap-12">
              {cat.groups.map((group) => (
                <div key={group.groupName} className="space-y-4">
                  <h3 className="text-[10px] font-black text-gray-400 dark:text-zinc-500 uppercase tracking-[0.25em] leading-none">
                    {group.groupName}
                  </h3>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li key={item.handle}>
                        <Link
                          href={`/collections/${item.handle}`}
                          onClick={onClose}
                          className="text-xs font-bold text-gray-600 dark:text-zinc-300 hover:text-foreground dark:hover:text-white transition-colors block py-0.5 uppercase tracking-widest whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
