'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function getShopifyConfig() {
  const domain =
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ||
    'sportgear-dev-store.myshopify.com';

  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!token) {
    console.error(
      '❌ CRITICAL ERROR: NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined in your .env.local file!'
    );
  }

  return { domain, token };
}

async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('customer_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  });
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please fill in all fields.' };
  }

  const { domain, token } = getShopifyConfig();

  try {
    const response = await fetch(`https://${domain}/api/2026-04/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token!,
      },
      body: JSON.stringify({
        query: `
          mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken {
                accessToken
                expiresAt
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `,
        variables: {
          input: { email, password },
        },
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        error: `Failed to communicate with Shopify. Status: ${response.status}`,
      };
    }

    const result = await response.json();

    if (result.errors) {
      return { error: 'Invalid server request structure.' };
    }

    const loginData = result.data?.customerAccessTokenCreate;
    const errors = loginData?.customerUserErrors || [];
    const userToken = loginData?.customerAccessToken?.accessToken;

    if (errors.length > 0) {
      return { error: errors[0].message };
    }

    if (!userToken) {
      return { error: 'Authentication failed. Please verify credentials.' };
    }

    await setSessionCookie(userToken);
  } catch (error) {
    console.error('LOGIN PROCESS FAILED:', error);
    return { error: 'Network error. Connection failed.' };
  }

  redirect('/account');
}

export async function registerAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'Please fill in all fields.' };
  }

  const nameParts = name.trim().split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || 'Customer';

  const { domain, token } = getShopifyConfig();
  let accessTokenToSet: string | null = null;
  let shouldRedirectToLogin = false;

  try {
    const registerResponse = await fetch(
      `https://${domain}/api/2026-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token!,
        },
        body: JSON.stringify({
          query: `
          mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer {
                id
                email
              }
              customerUserErrors {
                code
                field
                message
              }
            }
          }
        `,
          variables: {
            input: {
              firstName,
              lastName,
              email,
              password,
            },
          },
        }),
        cache: 'no-store',
      }
    );

    if (!registerResponse.ok) {
      console.error(
        `❌ HTTP Error during registration: ${registerResponse.status} ${registerResponse.statusText}`
      );
      return {
        error: `Failed to communicate with Shopify during registration. Status: ${registerResponse.status}`,
      };
    }

    const registerResult = await registerResponse.json();

    if (registerResult.errors) {
      return {
        error: registerResult.errors[0]?.message || 'GraphQL Query Error.',
      };
    }

    const createData = registerResult.data?.customerCreate;
    const registerErrors = createData?.customerUserErrors || [];

    if (registerErrors.length > 0) {
      return { error: registerErrors[0].message };
    }

    const loginResponse = await fetch(
      `https://${domain}/api/2026-04/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token!,
        },
        body: JSON.stringify({
          query: `
          mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken {
                accessToken
              }
            }
          }
        `,
          variables: {
            input: { email, password },
          },
        }),
        cache: 'no-store',
      }
    );

    if (loginResponse.ok) {
      const loginResult = await loginResponse.json();
      accessTokenToSet =
        loginResult.data?.customerAccessTokenCreate?.customerAccessToken
          ?.accessToken || null;
    }

    if (accessTokenToSet) {
      await setSessionCookie(accessTokenToSet);
    } else {
      shouldRedirectToLogin = true;
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Check terminal logs.';
    console.error('❌ CRITICAL REGISTRATION EXCEPTION:', errorMessage);
    return {
      error: `Process failed: ${errorMessage}`,
    };
  }

  if (shouldRedirectToLogin) {
    redirect('/login');
  }

  redirect('/account');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('customer_token');
  redirect('/login');
}
