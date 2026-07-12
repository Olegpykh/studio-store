import { shopifyFetch } from '../lib/shopify';
import { GET_PRODUCTS } from '../lib/shopify-queries';
import { ProductGrid } from '@/components/ProductGrid';
import { ShopifyProduct, ProductsQuery } from '@/types/shopify';
import { Hero } from '@/components/home/Hero';
import { Categories } from '@/components/home/Categories';

async function getProducts(): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<ProductsQuery>(GET_PRODUCTS, {
      first: 250,
      sortKey: 'TITLE',
    });

    return (data?.products?.edges || [])
      .map((edge) => edge.node)
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
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white overflow-hidden">
      <Hero />

      <Categories />

      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-gray-100 pb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-black uppercase sm:text-3xl">
              Featured Drops
            </h3>
            <p className="text-xs text-gray-400 mt-2 tracking-wide">
              Our latest arrivals and most wanted essentials
            </p>
          </div>
        </div>

        {hasProducts ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 text-base font-light">
              No current drops available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
