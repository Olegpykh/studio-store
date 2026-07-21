// types/shopify.ts
export type ShopifyImage = {
  url: string;
  altText?: string;
};

export type ShopifyPrice = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2: ShopifyPrice;
};

export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  vendor?: string;
  description?: string;
  descriptionHtml?: string;
  featuredImage?: ShopifyImage;
  images?: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  priceRange: {
    minVariantPrice: ShopifyPrice;
  };
  variants?: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
};

export type ProductsQuery = {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
};

export type SingleProductQuery = {
  product: ShopifyProduct | null;
};

export type ShopifySearchResponse = {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
};

export type ShopifyCollection = {
  id: string;
  title: string;
  handle: string;
  description: string;
  image?: {
    url: string;
    altText?: string;
  };
};

export type CollectionsQuery = {
  collections: {
    edges: Array<{
      node: ShopifyCollection;
    }>;
  };
};

export type CollectionQueryResponse = {
  collection: {
    title: string;
    description: string;
    products: {
      edges: Array<{
        node: ShopifyProduct;
      }>;
    };
  } | null;
};
