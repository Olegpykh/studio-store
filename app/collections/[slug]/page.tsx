// app/collections/[slug]/page.tsx

import { shopifyFetch } from '@/lib/shopify';
import Link from 'next/link';
import Image from 'next/image';

const GET_COLLECTION_BY_HANDLE = `
  query GetCollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      description
      products(first: 20) {
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
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface Product {
  id: string;
  title: string;
  handle: string;
  priceRange: {
    minVariantPrice: {
      amount: string | number;
    };
  };
  images?: {
    edges: Array<{
      node: {
        src: string;
        altText?: string;
      };
    }>;
  };
}

interface Collection {
  id: string;
  title: string;
  description?: string;
  products?: {
    edges: Array<{
      node: Product;
    }>;
  };
}

interface CollectionData {
  collectionByHandle: Collection;
}

export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  let collection: Collection | null = null;
  let error: string | null = null;

  try {
    const data = await shopifyFetch<CollectionData>(GET_COLLECTION_BY_HANDLE, {
      handle: params.slug,
    });
    collection = data?.collectionByHandle;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to load collection';
  }

  if (error || !collection) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Collection Not Found</h1>
          <Link href="/collections" className="text-blue-600 hover:underline">
            Back to Collections
          </Link>
        </div>
      </main>
    );
  }

  const products: Product[] =
    collection.products?.edges?.map((edge) => edge.node) || [];

  return (
    <main className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Link href="/collections" className="text-blue-600 hover:underline">
          ← Back to Collections
        </Link>
      </div>

      {/* Collection Header */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-b border-gray-200">
        <h1 className="text-4xl font-bold mb-4">{collection.title}</h1>
        {collection.description && (
          <p className="text-gray-700 text-lg">{collection.description}</p>
        )}
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group"
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  {product.images?.edges?.[0]?.node && (
                    <div className="relative h-64 bg-gray-100">
                      <Image
                        src={product.images.edges[0].node.src}
                        alt={
                          product.images.edges[0].node.altText || product.title
                        }
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg group-hover:text-blue-600 transition">
                      {product.title}
                    </h3>
                    <p className="text-lg font-bold mt-2">
                      ${product.priceRange.minVariantPrice.amount}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No products in this collection
          </p>
        )}
      </section>
    </main>
  );
}
