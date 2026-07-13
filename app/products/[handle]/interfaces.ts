
export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ProductImageNode {
  url: string;
  altText: string | null;
}

export interface ProductVariantNode {
  id: string;
  title: string;
  priceV2: MoneyV2;
  availableForSale: boolean;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  vendor?: string;
  priceRange: {
    minVariantPrice: MoneyV2;
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

export interface ShopifyProductResponse {
  product: ShopifyProduct | null;
}

export interface ProductPageProps {
  params: Promise<{ handle: string }> | { handle: string };
}
