import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify-queries';
import ProductDetails from '@/components/ProductDetails';
import { ProductGallery } from '@/components/ProductGallery';

interface ProductImageNode {
  url: string;
  altText: string | null;
}

interface ProductVariantNode {
  id: string;
  title: string;
  priceV2: {
    amount: string;
    currencyCode: string;
  };
  availableForSale: boolean;
}

interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor?: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: ProductImageNode;
    }[];
  };
  variants: {
    edges: {
      node: ProductVariantNode;
    }[];
  };
}

interface ShopifyProductResponse {
  product: ShopifyProduct | null;
}

interface ProductPageProps {
  params: Promise<{ handle: string }> | { handle: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const { handle } = resolvedParams;

  const data = await shopifyFetch<ShopifyProductResponse>(
    GET_PRODUCT_BY_HANDLE,
    { handle }
  );
  const product = data?.product;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono text-xs uppercase bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        Product Not Found
      </div>
    );
  }

  const images = product.images?.edges || [];

  return (
    <main className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-12 pb-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Карусель картинок (Client Component) */}
          <ProductGallery images={images} title={product.title} />

          {/* Детали товара */}
          <div className="space-y-8">
            <div>
              {product.vendor && (
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 tracking-[0.15em] block mb-2">
                  {product.vendor}
                </span>
              )}
              <h1 className="text-sm font-bold tracking-[0.2em] text-black dark:text-white">
                {product.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-sans tracking-normal normal-case mt-4 text-[11px] leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            <ProductDetails product={product} />
          </div>
        </div>
      </div>
    </main>
  );
}
