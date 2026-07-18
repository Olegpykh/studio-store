'use client';

import { useState } from 'react';
import { loginAction } from '@/lib/actions/auth';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-32 sm:px-6 lg:px-8 relative min-h-[calc(100vh-80px)] flex items-center justify-center">
      {/* Твоя фирменная размытая сфера на фоне */}
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-zinc-200/40 dark:bg-zinc-800/10 rounded-full blur-[160px] pointer-events-none transition-colors duration-300" />

      {/* Контейнер с такой же фоновой сеткой */}
      <div className="relative w-full max-w-4xl py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px] text-zinc-950/[0.02] dark:text-white/[0.015] pointer-events-none" />

        {/* Сетка на 12 колонок, повторяющая раскладку Hero */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Левая колонка: Крупный заголовок в твоем стиле */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-foreground rounded-none animate-pulse" />
              <span className="text-[10px] font-bold text-foreground tracking-[0.3em] uppercase font-mono">
                Access Gateway
              </span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl xl:text-7xl leading-[0.9] uppercase flex flex-col">
              <span>My</span>
              <span className="text-transparent [text-stroke:1.5px_var(--foreground)] sm:[text-stroke:2px_var(--foreground)] [-webkit-text-stroke:1.5px_var(--foreground)] sm:[-webkit-text-stroke:2px_var(--foreground)]">
                Account.
              </span>
            </h1>

            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-light tracking-wide normal-case max-w-sm">
              Sign in to manage your curated orders, track high-performance
              technical apparel shipments, and update your active profile
              settings.
            </p>
          </div>

          {/* Правая колонка: Форма авторизации за вертикальной чертой */}
          <div className="lg:col-span-6 space-y-8 border-l border-border/80 pl-6 lg:pl-10 w-full">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="border border-border/80 p-4 text-[10px] font-mono tracking-widest uppercase text-foreground bg-zinc-50 dark:bg-zinc-900/50">
                  Error // {error}
                </div>
              )}

              <div className="space-y-5">
                {/* Email Field */}
                <div className="flex flex-col">
                  <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400 dark:text-zinc-500 mb-1.5 font-mono">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full bg-transparent border-b border-border/80 py-2.5 text-xs tracking-widest text-foreground focus:border-foreground focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-300 dark:placeholder-zinc-700"
                    placeholder="ENTER YOUR EMAIL"
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col">
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400 dark:text-zinc-500 font-mono">
                      Password
                    </label>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="w-full bg-transparent border-b border-border/80 py-2.5 text-xs tracking-widest text-foreground focus:border-foreground focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-300 dark:placeholder-zinc-700"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex items-center justify-between rounded-none bg-foreground text-background px-6 py-4 text-[11px] font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all tracking-[0.2em] uppercase cursor-pointer"
                >
                  {loading ? 'Processing' : 'Sign In'}
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>

            {/* Footer inside the right section */}
            <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="text-[9px] text-gray-400 dark:text-zinc-500 tracking-[0.2em] uppercase font-mono">
                No account yet?
              </span>
              <Link
                href="/register"
                className="group inline-flex items-center gap-1 text-[10px] font-bold text-foreground tracking-[0.2em] uppercase hover:underline"
              >
                Create One
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
