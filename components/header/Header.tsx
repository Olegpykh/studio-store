'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search, ChevronDown, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { navigationConfig } from './config';
import { DesktopMenu } from './DesktopMenu';
import { MobileMenu } from './MobileMenu';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart'; 
import { ThemeToggle } from '@/components/ThemeToggle'; 

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const totalQuantity = useCart((state) => state.totalQuantity);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    const currentQuery = searchQuery;
    setSearchQuery('');
    router.push(`/search?q=${encodeURIComponent(currentQuery)}`);
  };

  const toggleDropdown = (trigger: string) => {
    setActiveDropdown(activeDropdown === trigger ? null : trigger);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border text-foreground tracking-tight transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 group"
            onClick={() => {
              setActiveDropdown(null);
              setIsMenuOpen(false);
            }}
          >
            <div className="w-9 h-9 bg-foreground text-background rounded-lg flex items-center justify-center transition-transform group-hover:scale-95 duration-300">
              <span className="font-black text-xl tracking-tighter">S</span>
            </div>
            <div>
              <h1 className="font-black text-lg tracking-widest leading-none uppercase text-foreground">
                STUDIO STORE
              </h1>
              <p className="text-[8px] text-gray-400 dark:text-zinc-500 tracking-[0.25em] uppercase mt-1 font-bold">
                Curated Est. 2026
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navigationConfig.map((cat) => (
              <div key={cat.trigger} className="relative">
                <button
                  onClick={() => toggleDropdown(cat.trigger)}
                  className={`flex items-center gap-1.5 py-2 text-xs font-bold tracking-[0.15em] uppercase transition-colors ${
                    activeDropdown === cat.trigger
                      ? 'text-gray-400 dark:text-zinc-500'
                      : 'text-foreground hover:text-gray-500 dark:hover:text-zinc-400'
                  }`}
                >
                  <span>{cat.title}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${
                      activeDropdown === cat.trigger ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center justify-end flex-1 max-w-xs mx-4">
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex items-center group w-full justify-end"
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-0 opacity-0 focus:w-full focus:opacity-100 group-hover:w-full group-hover:opacity-100 bg-transparent border-b border-border py-1 text-xs font-medium tracking-wide focus:border-foreground focus:outline-none transition-all duration-300 text-foreground placeholder-gray-400 dark:placeholder-zinc-600 absolute right-0 pr-6"
              />
              <button
                type="submit"
                className="p-2 text-gray-500 dark:text-zinc-400 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors z-10 cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button className="p-2 text-gray-500 dark:text-zinc-400 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors lg:hidden cursor-pointer">
              <Search className="w-4 h-4" />
            </button>

            <button className="p-2 text-gray-500 dark:text-zinc-400 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors flex items-center justify-center cursor-pointer">
              <User className="w-4 h-4" />
            </button>

            <ThemeToggle />

            <Link
              href="/cart"
              className="p-2 text-gray-500 dark:text-zinc-400 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors relative flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4" />
              {totalQuantity > 0 && (
                <span className="absolute top-1 right-1 bg-foreground text-background text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center ring-2 ring-background animate-fade-in">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 text-gray-500 dark:text-zinc-400 hover:text-foreground hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                setActiveDropdown(null);
              }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <DesktopMenu
        activeDropdown={activeDropdown}
        onClose={() => setActiveDropdown(null)}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
}