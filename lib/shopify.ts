interface GraphQLResponse<T> {
  data: T;
  errors?: Array<{
    message: string;
  }>;
}

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const endpoint = domain ? `https://${domain}/api/2026-04/graphql.json` : '';
  const key = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!endpoint || !key) {
    throw new Error(
      'Shopify API URL or Access Token is missing in environment variables.'
    );
  }

  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
    });

    const json = (await result.json()) as GraphQLResponse<T>;

    if (json.errors) {
      throw new Error(`Shopify API Error: ${json.errors[0].message}`);
    }

    return json.data;
  } catch (error) {
    console.error('Error in shopifyFetch:', error);
    throw error;
  }
}
