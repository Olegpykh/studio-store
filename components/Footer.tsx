import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Верхняя часть: Сетка с навигацией и подпиской */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4 lg:gap-8 pb-12 border-b border-gray-800">
          {/* Колонка 1: О бренде */}
          <div className="md:col-span-1">
            <span className="text-xl font-extrabold tracking-tight">
              SPORTGEAR
            </span>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Engineered for performance, designed for style. Premium sports
              apparel for those who demand excellence.
            </p>
          </div>

          {/* Колонка 2: Магазин */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Shop
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/catalog" className="hover:text-white transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/new"
                  className="hover:text-white transition"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/catalog/sale"
                  className="hover:text-white transition"
                >
                  Sale & Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 3: Помощь */}
          <div>
            <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Support
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка 4: Рассылка */}
          <div className="md:col-span-1">
            <h4 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
              Stay Updated
            </h4>
            <p className="mt-4 text-sm text-gray-400">
              Subscribe to get special offers and updates.
            </p>
            <form
              className="mt-4 flex max-w-md gap-2"
             
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full min-w-0 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-base text-white placeholder-gray-500 focus:border-white focus:outline-none focus:ring-1 focus:ring-white text-sm"
              />
              <button className="flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 active:scale-95 transition">
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Нижняя часть: Копирайт и Юридические ссылки */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} SportGear Store. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-400 transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400 transition">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
