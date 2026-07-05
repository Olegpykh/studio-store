// components/Header.tsx
'use client';

import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
            <div>
              <h1 className="font-bold text-2xl tracking-tight">SportGear</h1>
              <p className="text-[10px] text-gray-500 -mt-1">PREMIUM ATHLETIC</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm font-medium">
            <Link href="/collections" className="hover:text-black transition">Shop</Link>
            <Link href="/collections/snowboard" className="hover:text-black transition">Snowboards</Link>
            <Link href="/collections/apparel" className="hover:text-black transition">Apparel</Link>
            <Link href="/about" className="hover:text-black transition">About</Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-6">
            <button className="p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-5 h-5" />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <User className="w-5 h-5" />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-full transition relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
                <div className="w-6 h-0.5 bg-black"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}