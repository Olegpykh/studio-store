export interface ShopifyCollectionsResponse {
  collections: {
    edges: {
      node: {
        id: string;
        title: string;
        handle: string;
        description: string;
        image: {
          url: string;
          altText: string | null;
        } | null;
        products: {
          edges: {
            node: {
              featuredImage: {
                url: string;
                altText: string | null;
              } | null;
            };
          }[];
        };
      };
    }[];
  };
}
