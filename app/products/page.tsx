import { shopifyFetch } from '@/lib/shopify';
import { ProductsQuery } from '@/types/shopify';
import { ProductGrid } from '@/components/ProductGrid';
import { GET_ALL_PRODUCTS_QUERY } from '@/lib/shopify-queries';

async function getProductsData() {
  try {
    const data = await shopifyFetch<ProductsQuery>(GET_ALL_PRODUCTS_QUERY, {
      first: 100,
    });
    return data?.products?.edges?.map((edge) => edge.node) || [];
  } catch (err) {
    console.error('Error fetching products:', err);
    return null;
  }
}

export default async function ProductsPage() {
  const products = await getProductsData();
  const isError = products === null;
  const hasProducts = products && products.length > 0;

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-foreground bg-background min-h-screen selection:bg-foreground selection:text-background transition-colors duration-300">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase sm:text-5xl text-foreground">
          All Products
        </h1>
        <p className="text-gray-500 dark:text-zinc-400 font-light text-base">
          Discover our full collection
        </p>
      </div>

      {isError && (
        <div className="bg-rose-500/10 text-rose-500 p-4 rounded-xl mb-8 border border-rose-500/20 text-sm font-medium">
          Error: Failed to fetch products from the server. Please try refreshing
          the page.
        </div>
      )}

      {hasProducts ? (
        <ProductGrid products={products} />
      ) : (
        !isError && (
          <div className="text-center py-24 bg-zinc-50 dark:bg-zinc-900/40 rounded-3xl border border-dashed border-border transition-colors">
            <p className="text-gray-500 dark:text-zinc-400 text-lg font-medium">
              No products found
            </p>
            <p className="text-sm text-gray-400 dark:text-zinc-500 mt-1">
              Our latest drop is currently updating. Check back shortly.
            </p>
          </div>
        )
      )}
    </main>
  );
}
