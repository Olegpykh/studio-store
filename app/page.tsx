// app/page.tsx

import { siteConfig } from "./config";

export const metadata = {
  title: `${siteConfig.name} | Premium Athletic Apparel`,
  description: siteConfig.description,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <nav className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">
            {siteConfig.name}
          </h1>
          <p className="mt-1 text-sm text-gray-600">{siteConfig.description}</p>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-black">
            Elevate Your Athletic Game
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            Premium sports apparel engineered for performance. Built for athletes who demand excellence.
          </p>
          <button className="mt-8 rounded-lg bg-black px-8 py-3 text-white font-semibold hover:bg-gray-800 transition">
            Shop Collection
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-gray-50">
        <h3 className="text-3xl font-bold text-black mb-12">Shop by Category</h3>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
          {siteConfig.categories.map((category) => (
            <div
              key={category.slug}
              className="rounded-lg border border-gray-200 bg-white p-8 hover:border-black transition cursor-pointer"
            >
              <h4 className="text-lg font-semibold text-black">
                {category.name}
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                Explore {category.name.toLowerCase()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">
            © 2026 {siteConfig.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}