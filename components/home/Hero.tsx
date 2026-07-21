import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 pb-12 sm:pt-12 sm:pb-32 sm:px-6 lg:px-8 relative border-b border-border/60">
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-zinc-200/40 dark:bg-zinc-800/10 rounded-full blur-[160px] pointer-events-none transition-colors duration-300"></div>

      <div className="relative py-8 sm:py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px] text-zinc-950/[0.02] dark:text-white/[0.015] pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-foreground rounded-none animate-pulse" />
              <span className="text-[10px] font-bold text-foreground tracking-[0.3em] uppercase font-mono">
                Studio Store — Collection 2026
              </span>
            </div>

            <h1 className="text-4xl font-black tracking-tighter text-foreground sm:text-5xl lg:text-7xl xl:text-8xl leading-[0.9] uppercase flex flex-col">
              <span>Curated Style.</span>
              <span className="text-transparent [text-stroke:1.5px_var(--foreground)] sm:[text-stroke:2px_var(--foreground)] [-webkit-text-stroke:1.5px_var(--foreground)] sm:[-webkit-text-stroke:2px_var(--foreground)]">
                Urban Motion.
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:mt-16 space-y-6 lg:space-y-10 border-l border-border/80 pl-6 lg:pl-8">
            <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 leading-relaxed font-light font-sans tracking-wide normal-case">
              A precise architectural study of contemporary silhouettes.
              High-performance technical apparel engineered alongside elite
              urban mobility systems. Forged for active adaptation, tailored for
              permanent comfort.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/collections/womens-tops"
                className="group flex items-center justify-between rounded-none bg-foreground text-background px-6 py-4 text-[11px] font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all tracking-[0.2em] uppercase cursor-pointer"
              >
                Shop Apparel
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link
                href="/collections/fixed-gear-bicycle"
                className="group flex items-center justify-between rounded-none bg-transparent border border-border px-6 py-4 text-[11px] font-bold text-foreground hover:bg-foreground hover:text-background active:scale-[0.99] transition-all tracking-[0.2em] uppercase cursor-pointer"
              >
                Explore Gear
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
