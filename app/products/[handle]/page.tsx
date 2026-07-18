import { shopifyFetch } from '@/lib/shopify';
import { GET_PRODUCT_BY_HANDLE } from '@/lib/shopify-queries';
import ProductDetails from '@/components/ProductDetails';

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
  descriptionHtml?: string;
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
      <div className="min-h-screen flex items-center justify-center font-mono text-xs uppercase bg-background text-foreground transition-colors duration-300">
        Product Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground pt-12 pb-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Передаем всё управление отображением в ProductDetails */}
        <ProductDetails product={product} />
      </div>
    </main>
  );
}
