export const GET_PRODUCTS = /* GraphQL */ `
  query GetProducts($first: Int!, $sortKey: ProductSortKeys, $query: String) {
    products(first: $first, sortKey: $sortKey, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
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
          images(first: 3) {
            edges {
              node {
                url
                altText
              }
            }
          }
        }
      }
    }
  }
`;


export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
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
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;
