import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CORE_CATEGORIES } from './config';

export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-widest">
          Core Collections
        </h3>
        <div className="h-[1px] bg-border flex-1 ml-6"></div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_CATEGORIES.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative p-8 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-border hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between h-44 cursor-pointer"
          >
            <div>
              <span className="text-[10px] text-gray-400 dark:text-zinc-500 block mb-1 font-semibold uppercase tracking-wider">
                {category.count}
              </span>
              <span className="font-bold text-xl tracking-tight text-foreground block uppercase">
                {category.name}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-400 dark:text-zinc-500 group-hover:text-foreground transition-colors font-bold tracking-wider uppercase mt-4">
              <span>Explore Collection</span>
              <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
