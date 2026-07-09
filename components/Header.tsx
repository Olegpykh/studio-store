'use client';

import Link from 'next/link';
import {
  ShoppingCart,
  User,
  Search,
  ChevronDown,
  Menu,
  X,
  Grid,
} from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const categories = [
    { name: 'Electronics & Gadgets', href: '/collections/electronics' },
    { name: 'Clothing & Apparel', href: '/collections/apparel' },
    { name: 'Home & Living', href: '/collections/home' },
    { name: 'Sports & Outdoors', href: '/collections/sport' },
    { name: 'Beauty & Health', href: '/collections/beauty' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 text-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* 1. LOGO */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-2xl">M</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-black text-xl tracking-tight leading-none">
                MEGASTORE
              </h1>
              <p className="text-[9px] text-gray-400 tracking-widest uppercase mt-0.5">
                Everything you need
              </p>
            </div>
          </Link>

          {/* 2. CATALOG DROPDOWN */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsCatalogOpen(!isCatalogOpen)}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-xl font-medium text-sm transition-all active:scale-95"
            >
              <Grid className="w-4 h-4" />
              <span>Catalog</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isCatalogOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCatalogOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    onClick={() => setIsCatalogOpen(false)}
                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 3. CENTER SEARCH BAR */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-md mx-4 hidden sm:block relative"
          >
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:bg-white focus:border-black focus:outline-none transition-all text-black placeholder-gray-400"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* 4. ACTIONS (PROFILE / CART / BURGER) */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Mobile Search Button (shows on screens < 640px) */}
            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition sm:hidden">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition flex items-center justify-center">
              <User className="w-5 h-5" />
            </button>

            <button className="p-2.5 hover:bg-gray-50 rounded-xl transition relative flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center ring-2 ring-white">
                0
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2.5 hover:bg-gray-50 rounded-xl transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-6 space-y-4 shadow-inner">
          {/* Mobile Search Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative sm:hidden pb-2"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none text-black"
            />
            <button
              type="submit"
              className="absolute right-3 top-4 text-gray-400"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Categories
            </p>
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 rounded-xl text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
