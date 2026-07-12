import Link from 'next/link';
import { CORE_CATEGORIES } from './config';


export function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.25em]">
          Core Collections
        </h3>
        <div className="h-[1px] bg-gray-100 flex-1 ml-6"></div>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {CORE_CATEGORIES.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="relative p-8 rounded-3xl bg-[#fafafa] border border-gray-100 hover:border-black/20 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transition-all duration-500 group flex flex-col justify-between h-44 overflow-hidden"
          >
            <div>
              <span className="text-[10px] text-gray-400 block mb-1 font-bold uppercase tracking-wider">
                {category.count}
              </span>
              <span className="font-bold text-xl tracking-tight text-black block group-hover:text-gray-800 transition-colors">
                {category.name}
              </span>
            </div>
            <div className="flex items-center text-xs text-black/40 group-hover:text-black font-bold tracking-wider uppercase transition-colors mt-4">
              <span>Explore Collection</span>
              <span className="transform translate-x-1 group-hover:translate-x-2 transition-transform duration-300 ml-1">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
