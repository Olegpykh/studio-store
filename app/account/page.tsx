import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { logoutAction } from '@/lib/actions/auth';
import Link from 'next/link';
import {
  ArrowUpRight,
  Package,
  MapPin,
  Heart,
  Shield,
  LogOut,
} from 'lucide-react';
import { WishlistSection } from '@/components/WishlistSection';

interface ShopifyOrderNode {
  id: string;
  orderNumber: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
}

interface ShopifyAddressNode {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  country: string;
}

// Интерфейс для преобразованного объекта заказа (для рендера)
interface FormattedOrder {
  id: string;
  date: string;
  total: string;
  status: string;
  rawStatus: string;
}

// Интерфейс для преобразованного объекта адреса (для рендера)
interface FormattedAddress {
  label: string;
  name: string;
  street: string;
  cityCountry: string;
  isDefault: boolean;
}

async function getShopifyAccountData(customerToken: string) {
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

export default async function AccountPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('customer_token')?.value;

  if (!token) {
    redirect('/login');
  }

  const customer = await getShopifyAccountData(token);

  if (!customer) {
    redirect('/login');
  }

  const memberSinceDate = new Date(customer.createdAt).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      year: 'numeric',
    }
  );

  const orders: FormattedOrder[] = (customer.orders?.edges || []).map(
    ({ node }: { node: ShopifyOrderNode }): FormattedOrder => {
      const formattedDate = new Date(node.processedAt)
        .toISOString()
        .split('T')[0];
      const currencySymbol =
        node.totalPrice.currencyCode === 'EUR'
          ? '€'
          : `${node.totalPrice.currencyCode} `;

      return {
        id: `#${node.orderNumber}`,
        date: formattedDate,
        total: `${currencySymbol}${parseFloat(node.totalPrice.amount).toFixed(
          2
        )}`,
        status:
          node.fulfillmentStatus === 'UNFULFILLED'
            ? 'Processing'
            : node.fulfillmentStatus,
        rawStatus: node.fulfillmentStatus,
      };
    }
  );

  const defaultAddressId = customer.defaultAddress?.id;
  const addresses: FormattedAddress[] = (customer.addresses?.edges || []).map(
    ({ node }: { node: ShopifyAddressNode }): FormattedAddress => ({
      label:
        node.id === defaultAddressId
          ? 'Primary Coordinates'
          : 'Backup Location',
      name:
        `${node.firstName} ${node.lastName}`.trim() ||
        `${customer.firstName} ${customer.lastName}`,
      street: node.address1 + (node.address2 ? `, ${node.address2}` : ''),
      cityCountry: `${node.zip} ${node.city}, ${node.country}`,
      isDefault: node.id === defaultAddressId,
    })
  );

  const spentThisYearNum = (customer.orders?.edges || [])
    .filter(
      ({ node }: { node: ShopifyOrderNode }) =>
        new Date(node.processedAt).getFullYear() === 2026
    )
    .reduce(
      (sum: number, { node }: { node: ShopifyOrderNode }) =>
        sum + parseFloat(node.totalPrice.amount),
      0
    );

  const profileStats = {
    tier: orders.length > 3 ? 'LEVEL_02_USER' : 'BASIC_ACCESS',
    memberSince: memberSinceDate,
    spentThisYear: `€${spentThisYearNum.toFixed(2)}`,
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-32 sm:px-6 lg:px-8 relative min-h-screen">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-zinc-200/40 dark:bg-zinc-800/10 rounded-full blur-[160px] pointer-events-none transition-colors duration-300" />

      <div className="relative w-full py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px] text-zinc-950/[0.02] dark:text-white/[0.015] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* ================= ЛЕВАЯ КОЛОНКА ================= */}
          <div className="lg:col-span-4 space-y-8">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse" />
              <span className="text-[10px] font-bold text-foreground tracking-[0.3em] uppercase font-mono">
                System Active // Server Auth
              </span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl leading-[0.9] uppercase flex flex-col">
              <span>{customer.firstName || 'Client'}</span>
              <span className="text-transparent [text-stroke:1.5px_var(--foreground)] [-webkit-text-stroke:1.5px_var(--foreground)]">
                Hub.
              </span>
            </h1>

            <div className="border border-border/85 bg-background/50 backdrop-blur-md p-6 space-y-6">
              <div className="border-b border-border/40 pb-4">
                <p className="text-[9px] font-bold tracking-[0.25em] text-gray-400 dark:text-zinc-500 font-mono uppercase">
                  User Identification
                </p>
                <p className="text-xs font-bold text-foreground mt-2 tracking-wide font-mono break-all">
                  {customer.email}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 dark:text-zinc-500 font-light">
                    Clearance Rank:
                  </span>
                  <span className="font-mono font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
                    <Shield className="w-3 h-3 text-foreground" />
                    {profileStats.tier}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 dark:text-zinc-500 font-light">
                    Established:
                  </span>
                  <span className="font-mono text-foreground font-bold">
                    {profileStats.memberSince}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-400 dark:text-zinc-500 font-light">
                    2026 Volume:
                  </span>
                  <span className="font-mono text-foreground font-bold">
                    {profileStats.spentThisYear}
                  </span>
                </div>
              </div>

              <form action={logoutAction} className="pt-2">
                <button
                  type="submit"
                  className="group w-full flex items-center justify-between rounded-none bg-transparent border border-border px-4 py-3 text-[10px] font-bold text-foreground hover:bg-foreground hover:text-background active:scale-[0.99] transition-all tracking-[0.2em] uppercase cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="w-3.5 h-3.5" />
                    Terminate Session
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </form>
            </div>
          </div>

          {/* ================= ПРАВАЯ КОЛОНКА ================= */}
          <div className="lg:col-span-8 space-y-12 border-l border-border/80 pl-6 lg:pl-10 w-full">
            {/* Секция 1: Order Logistics */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-foreground/75" />
                  <h3 className="text-sm font-bold tracking-[0.25em] text-foreground uppercase font-mono">
                    Order Logistics
                  </h3>
                </div>
                <span className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">
                  {orders.length} Records Found
                </span>
              </div>

              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="border border-dashed border-border/80 p-12 text-center flex flex-col items-center justify-center gap-4">
                    <span className="text-[10px] font-mono tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
                      No active transport records found.
                    </span>
                    <Link
                      href="/catalog"
                      className="inline-flex items-center gap-2 border border-foreground/30 px-4 py-2.5 text-[9px] font-bold tracking-widest uppercase hover:bg-foreground hover:text-background transition-all font-mono"
                    >
                      Initialize Purchase
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  orders.map((order: FormattedOrder) => (
                    <div
                      key={order.id}
                      className="border border-border/85 bg-background/30 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-foreground/45 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold tracking-wider text-foreground">
                            {order.id}
                          </span>
                          <span
                            className={`px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase rounded-none font-mono ${
                              order.rawStatus === 'FULFILLED'
                                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-border'
                                : 'bg-foreground text-background font-black'
                            }`}
                          >
                            {order.status}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 dark:text-zinc-500 font-mono">
                          DISPATCH DATE: {order.date}
                        </p>
                      </div>

                      <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-6 border-t md:border-none pt-3 md:pt-0 border-border/40">
                        <span className="font-mono text-sm font-bold text-foreground">
                          {order.total}
                        </span>
                        <button className="text-[9px] font-bold tracking-[0.15em] text-foreground uppercase hover:underline inline-flex items-center gap-1 font-mono">
                          Track Shipment
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Секция 2: Shipping Coordinates */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-foreground/75" />
                  <h3 className="text-sm font-bold tracking-[0.25em] text-foreground uppercase font-mono">
                    Shipping Coordinates
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.length === 0 ? (
                  <div className="col-span-2 border border-dashed border-border/80 p-8 text-center flex flex-col items-center justify-center gap-3">
                    <span className="text-[9px] font-mono tracking-widest text-gray-400 dark:text-zinc-500 uppercase">
                      No coordinates registered in master system.
                    </span>
                    <button className="text-[9px] font-bold tracking-[0.15em] text-foreground uppercase hover:underline font-mono inline-flex items-center gap-1">
                      Register Coordinates
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  addresses.map((address: FormattedAddress, idx: number) => (
                    <div
                      key={idx}
                      className="border border-border/85 bg-background/30 p-5 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase font-mono text-foreground">
                          {address.label}
                        </span>
                        {address.isDefault && (
                          <span className="text-[8px] font-bold font-mono tracking-widest text-gray-400 dark:text-zinc-500 uppercase border border-border/60 px-1.5 py-0.5">
                            Default
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 text-xs text-gray-500 dark:text-zinc-400 font-light font-mono">
                        <p className="font-bold text-foreground">
                          {address.name}
                        </p>
                        <p>{address.street}</p>
                        <p>{address.cityCountry}</p>
                      </div>

                      <button className="text-[9px] font-bold tracking-[0.15em] text-foreground uppercase hover:underline font-mono inline-flex items-center gap-1">
                        Modify Coordinates
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Секция 3: Saved Gear (Избранное) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-foreground/75" />
                  <h3 className="text-sm font-bold tracking-[0.25em] text-foreground uppercase font-mono">
                    Saved System Gear
                  </h3>
                </div>
              </div>

              {/* Наш интерактивный клиентский вишлист */}
              <WishlistSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
