import { shopifyFetch } from '@/lib/shopify';
import { ProductsQuery} from '@/types/shopify';
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
    <main className="max-w-7xl mx-auto px-6 py-12 text-black bg-white min-h-screen selection:bg-black selection:text-white">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2 uppercase sm:text-5xl">
          All Products
        </h1>
        <p className="text-gray-500 font-light text-base">
          Discover our full collection
        </p>
      </div>

      {isError && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl mb-8 border border-rose-100 text-sm font-medium">
          Error: Failed to fetch products from the server. Please try refreshing
          the page.
        </div>
      )}

      {hasProducts ? (
        <ProductGrid products={products} />
      ) : (
        !isError && (
          <div className="text-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg font-medium">
              No products found
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Our latest drop is currently updating. Check back shortly.
            </p>
          </div>
        )
      )}
    </main>
  );
}
