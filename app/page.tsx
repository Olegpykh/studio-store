import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
    <main className="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-hidden transition-colors duration-300">
      <Hero />

      <Categories />

      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 flex justify-center">
        <Link
          href="/collections"
          className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 hover:text-gray-500 dark:hover:text-zinc-400 hover:border-gray-400 transition-all duration-300 cursor-pointer"
        >
          View All Collections
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 border-b border-border pb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground uppercase sm:text-3xl">
              Featured Drops
            </h3>
            <p className="text-xs text-gray-400 dark:text-zinc-500 mt-2 tracking-wide">
              Our latest arrivals and most wanted essentials
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-foreground border-b border-foreground pb-1 hover:text-gray-500 dark:hover:text-zinc-400 hover:border-gray-400 transition-all duration-300 cursor-pointer self-start sm:self-auto"
          >
            View All Products
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {hasProducts ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-border transition-colors">
            <p className="text-gray-400 dark:text-zinc-500 text-base font-light">
              No current drops available.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
