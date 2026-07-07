import { shopifyFetch } from '../lib/shopify';
import { GET_PRODUCTS } from '../lib/shopify-queries';
import { ProductCard } from '@/components/ProductCard';
import { ShopifyProduct } from '@/types/shopify';

// 1. Выносим логику получения и очистки данных в отдельную функцию
async function getProducts(): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch(GET_PRODUCTS, {
      first: 100,
      sortKey: 'TITLE',
    });

    // Очищаем матрешку Shopify и возвращаем плоский массив товаров с картинками
    return (data?.products?.edges || [])
      .map((edge: { node: ShopifyProduct }) => edge.node)
      .filter((product: ShopifyProduct) =>
        Boolean(product.featuredImage?.url || product.images?.edges?.length)
      );
  } catch (err) {
    console.error('Error fetching products:', err);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();
  const hasProducts = products.length > 0;

  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Universal Premium Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-gray-900 via-black to-gray-900 px-8 py-20 shadow-2xl text-center sm:px-16 sm:py-28 overflow-hidden">
          {/* Subtle background grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="relative max-w-3xl mx-auto z-10">
            <span className="inline-flex items-center rounded-full bg-gray-800 px-4 py-1.5 text-xs font-medium text-gray-300 tracking-wider uppercase mb-6 ring-1 ring-white/10">
              New Season Release
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-6xl leading-none">
              Everything You Need.
              <br className="hidden sm:inline" /> All in One Place.
            </h2>
            <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
              Discover curated collections of premium electronics, apparel, home
              essentials, and more. Crafted for modern living.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button className="rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black hover:bg-gray-100 active:scale-95 transition-all shadow-lg">
                Explore Catalog
              </button>
              <button className="rounded-xl bg-transparent border border-gray-700 px-8 py-4 text-sm font-semibold text-white hover:bg-gray-800 hover:border-gray-600 active:scale-95 transition-all">
                Latest Deals
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Marketplace Categories Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            {
              name: 'Electronics',
              count: '120+ Items',
              bg: 'bg-blue-50 text-blue-700',
            },
            {
              name: 'Apparel',
              count: '340+ Items',
              bg: 'bg-purple-50 text-purple-700',
            },
            {
              name: 'Home Living',
              count: '80+ Items',
              bg: 'bg-amber-50 text-amber-700',
            },
            {
              name: 'Sports & Outdoors',
              count: '150+ Items',
              bg: 'bg-emerald-50 text-emerald-700',
            },
          ].map((category) => (
            <div
              key={category.name}
              className={`p-6 rounded-2xl ${category.bg} cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group flex flex-col justify-between h-32`}
            >
              <span className="font-bold text-lg tracking-tight">
                {category.name}
              </span>
              <span className="text-xs opacity-80 font-medium group-hover:underline">
                Shop Category →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Universal Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 border-b border-gray-100 pb-6">
          <div>
            <h3 className="text-3xl font-black tracking-tight text-black">
              Featured Products
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Our most popular items across all departments
            </p>
          </div>
          <button className="text-sm font-semibold text-black hover:underline hidden sm:block">
            View All Products →
          </button>
        </div>

        {hasProducts ? (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No products available yet.</p>
            <p className="text-sm text-gray-400 mt-1">
              Check back later or verify your Shopify sync.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
