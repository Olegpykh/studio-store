// lib/shopify-queries.ts
export const GET_PRODUCTS = `
  query {
    products(first: 5) {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`;