// app/products/page.tsx

import Image from 'next/image';
import { shopifyFetch } from '@/lib/shopify';

interface ShopifyImage {
  src: string;
  alt: string;
}

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
      node: ShopifyImage;
    }>;
  };
}

export default async function ProductsPage() {
  const query = `
    {
      products(first: 12) {
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
    const data: any = await shopifyFetch(query);
    products = data?.products?.edges?.map((edge: any) => edge.node) || [];
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch products';
    console.error('Error fetching products:', err);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">All Products</h1>
      <p className="text-gray-600 mb-10">Discover our full collection</p>

      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-8">
          Error: {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const image = product.images.edges[0]?.node;

          return (
            <div
              key={product.id}
              className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="aspect-square bg-gray-100 relative">
                {image ? (
                  <Image
                    src={image.src}
                    alt={image.alt || product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="p-5">
                <h2 className="font-semibold text-lg mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <p className="text-2xl font-bold text-black mb-4">
                  ${product.priceRange.minVariantPrice.amount}
                </p>

                <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 transition">
                  View Product
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {products.length === 0 && !error && (
        <p className="text-center text-gray-500 py-12">No products found</p>
      )}
    </div>
  );
}
