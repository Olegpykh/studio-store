import { ShopifyCustomer } from '@/types/account';

export async function getShopifyAccountData(
  customerToken: string
): Promise<ShopifyCustomer | null> {
  const domain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    'sportgear-dev-store.myshopify.com';
  const storefrontToken =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!storefrontToken) {
    console.error('❌ Shopify Storefront token is missing in environments.');
    return null;
  }

  try {
    const response = await fetch(`https://${domain}/api/2026-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontToken,
      },
      body: JSON.stringify({
        query: `
            query getCustomerDashboard($customerAccessToken: String!) {
              customer(customerAccessToken: $customerAccessToken) {
                firstName
                lastName
                email
                createdAt
                orders(first: 5) {
                  edges {
                    node {
                      id
                      orderNumber
                      processedAt
                      financialStatus
                      fulfillmentStatus
                      totalPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                addresses(first: 3) {
                  edges {
                    node {
                      id
                      firstName
                      lastName
                      address1
                      address2
                      city
                      zip
                      country
                    }
                  }
                }
                defaultAddress {
                  id
                }
              }
            }
          `,
        variables: {
          customerAccessToken: customerToken,
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) return null;

    const result = await response.json();
    return result.data?.customer || null;
  } catch (error) {
    console.error('❌ Error fetching Shopify account data:', error);
    return null;
  }
}
