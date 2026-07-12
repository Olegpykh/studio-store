import Link from 'next/link';

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8 relative">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gray-100 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="relative rounded-[2.5rem] bg-[#fcfcfc] border border-gray-100 px-8 py-28 text-center sm:px-16 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] [background-size:32px_32px]"></div>
        <div className="relative max-w-3xl mx-auto z-10">
          <span className="inline-flex items-center rounded-full bg-black/[0.03] border border-black/[0.05] px-4 py-1.5 text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-8">
            New Season Arrival
          </span>
          <h2 className="text-5xl font-extrabold tracking-tight text-black sm:text-7xl leading-[1.05] uppercase">
            Curated Style.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-black via-gray-700 to-gray-400">
              Urban Motion.
            </span>
          </h2>
          <p className="mt-8 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed font-light">
            Discover a premium selection of contemporary menswear, womenswear,
            and urban mobility gear. Designed for modern living, crafted for
            comfort.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <Link
              href="/collections/womens-tops"
              className="rounded-xl bg-black px-8 py-4 text-xs font-bold text-white hover:bg-gray-800 active:scale-[0.97] transition-all tracking-widest uppercase shadow-md"
            >
              Shop Apparel
            </Link>
            <Link
              href="/collections/fixed-gear-bicycle"
              className="rounded-xl bg-transparent border border-black/10 px-8 py-4 text-xs font-bold text-black hover:bg-black hover:text-white active:scale-[0.97] transition-all tracking-widest uppercase"
            >
              Explore Gear
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
