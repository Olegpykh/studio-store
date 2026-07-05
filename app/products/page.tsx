// app/products/page.tsx

import { shopifyFetch } from "@/lib/shopify";

interface Product {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
    };
  };
  images: {
    edges: Array<{
      node: {
        src: string;
        alt: string;
      };
    }>;
  };
}

interface ShopifyResponse {
  products: {
    edges: Array<{
      node: Product;
    }>;
  };
}

export default async function ProductsPage() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                  alt
                }
              }
            }
          }
        }
      }
    }
  `;

  let products: Product[] = [];
  let error: string | null = null;

  try {
    const data = await shopifyFetch(query) as ShopifyResponse;
    products = data.products.edges.map(edge => edge.node);
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch products";
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">SportGear Products</h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
            {/* Картинка товара */}
            {product.images.edges[0] && (
              <img 
                src={product.images.edges[0].node.src} 
                alt={product.images.edges[0].node.alt}
                className="w-full h-48 object-cover"
              />
            )}

            {/* Информация товара */}
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2">{product.title}</h2>
              
              <p className="text-green-600 font-bold mb-4">
                ${product.priceRange.minVariantPrice.amount}
              </p>

              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>

      {products.length === 0 && !error && (
        <p className="text-gray-500">No products found</p>
      )}
    </div>
  );
}