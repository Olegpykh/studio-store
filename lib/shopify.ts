// lib/shopify.ts

const domain = "sportgear-dev-store.myshopify.com";
const token = "b119aaa21f1577d7e1d898bc2976fa10"; // Public token

export async function shopifyFetch(query: string, variables: any = {}) {
  console.log("🔧 Fetching from Shopify:", domain);

  const response = await fetch(`https://${domain}/api/2025-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await response.json();

  if (json.errors) {
    console.error("Shopify GraphQL Errors:", json.errors);
    throw new Error(json.errors[0]?.message || "GraphQL Error");
  }

  return json.data;
}