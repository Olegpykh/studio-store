import Header from "@/components/Header";
import { shopifyFetch } from "../lib/shopify";
import { GET_PRODUCTS } from "../lib/shopify-queries";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "SportGear Store | Premium Athletic Apparel",
  description: "Premium sports apparel engineered for performance",
};

export default async function Home() {
  console.log("🔧 DEBUG: DOMAIN =", process.env.SHOPIFY_STORE_DOMAIN);
  console.log("🔧 DEBUG: TOKEN loaded =", !!process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN);

  let products: any[] = [];
  let error = null;

  try {
    const data: any = await shopifyFetch(GET_PRODUCTS, { first: 12 });
    
    products = data?.products?.edges
      ?.map((edge: any) => edge.node)
      ?.filter((product: any) => 
        product.featuredImage?.url || product.images?.edges?.length > 0
      ) || [];
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch products";
    console.error("Error fetching products:", err);
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-black">Elevate Your Athletic Game</h2>
          <p className="mt-6 text-xl text-gray-600">Premium sports apparel for athletes who demand excellence</p>
          <button className="mt-8 rounded-lg bg-black px-8 py-3 text-white font-semibold hover:bg-gray-800 transition">
            Shop Collection
          </button>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-black mb-12">Featured Products</h3>
        
        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-700 mb-8">
            <p>Error loading products: {error}</p>
            <p className="text-sm mt-2">Check your Shopify store domain and token in .env.local</p>
          </div>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            {error ? "Unable to load products" : "No products available yet"}
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="text-center text-gray-400">© 2026 SportGear Store. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}