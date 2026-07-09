import { shopifyFetch } from '@/lib/shopify';
import { ProductsQuery, ShopifyProduct } from '@/types/shopify';
import { ProductCard } from '@/components/ProductCard';

export default async function ProductsPage() {
  const query = `
    {
      products(first: 12) {
        edges {
          node {
            id
            title
            handle
            vendor
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            featuredImage {
              url
              altText
            }
          }
        }
      }
    }
  `;

  let products: ShopifyProduct[] = [];
  let error: string | null = null;

  try {
    const data = await shopifyFetch<ProductsQuery>(query);
    products = data?.products?.edges?.map((edge) => edge.node) || [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch products';
    console.error('Error fetching products:', err);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-black bg-white min-h-screen">
      <h1 className="text-4xl font-black tracking-tight mb-2">All Products</h1>
      <p className="text-gray-500 mb-10">Discover our full collection</p>

      {error && (
        <div className="bg-rose-50 text-rose-700 p-4 rounded-xl mb-8 border border-rose-100">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && !error && (
        <p className="text-center text-gray-500 py-12">No products found</p>
      )}
    </div>
  );
}
