import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-border text-foreground tracking-tight mt-auto transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-16 pb-16 border-b border-border">
          <div className="md:col-span-1 space-y-4">
            <span className="text-lg font-black tracking-widest uppercase block text-foreground">
              SPORTGEAR
            </span>
            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-light max-w-xs">
              Contemporary wardrobe essentials and urban mobility gear.
              Carefully selected materials, refined silhouettes, and enduring
              aesthetic.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.2em] uppercase mb-5">
              Shop
            </h4>
            <ul className="space-y-3 text-xs font-medium text-gray-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/collections"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  All Collections / Shop All
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/fixed-gear-bicycle"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Urban Bicycles
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/womens-tops"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  {"Women's Apparel"}
                </Link>
              </li>
              <li>
                <Link
                  href="/collections/mens-coats-jackets"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  {"Men's Wardrobe"}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.2em] uppercase mb-5">
              Support
            </h4>
            <ul className="space-y-3 text-xs font-medium text-gray-600 dark:text-zinc-400">
              <li>
                <Link
                  href="/pages/faq"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  FAQ & Care
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/shipping"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/contact"
                  className="hover:text-foreground dark:hover:text-white transition-colors"
                >
                  Concierge Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-[0.2em] uppercase mb-4">
              Stay Updated
            </h4>
            <p className="text-xs text-gray-500 dark:text-zinc-400 font-light mb-5">
              Subscribe to receive curated drops, private sales, and seasonal
              updates.
            </p>

            <form className="flex max-w-sm gap-4 items-end">
              <div className="flex-1 relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b border-border pb-2 text-xs font-medium tracking-wide focus:border-foreground focus:outline-none transition-colors text-foreground placeholder:text-gray-400 dark:placeholder:text-zinc-600"
                />
              </div>
              <button
                type="submit"
                className="pb-2 text-xs font-bold text-foreground hover:text-gray-500 dark:text-white dark:hover:text-zinc-400 uppercase tracking-widest border-b border-foreground dark:border-white hover:border-gray-400 transition-colors active:translate-y-0.5 duration-200 shrink-0 cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-[10px] font-medium text-gray-400 dark:text-zinc-500 tracking-wider">
            © {new Date().getFullYear()} SPORTGEAR. Crafted for modern living.
          </p>
          <div className="flex gap-8 text-[10px] font-medium text-gray-400 dark:text-zinc-500 tracking-wider">
            <Link
              href="/pages/privacy-policy"
              className="hover:text-foreground dark:hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/pages/terms-of-service"
              className="hover:text-foreground dark:hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
