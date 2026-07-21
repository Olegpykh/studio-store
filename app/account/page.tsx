import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getShopifyAccountData } from '@/lib/shopify/getAccountData';
import {
  formatOrders,
  formatAddresses,
  getProfileStats,
} from '@/lib/utils/formatAccountData';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { OrderLogistics } from '@/components/account/OrderLogistics';
import { ShippingCoordinates } from '@/components/account/ShippingCoordinates';
import { WishlistSection } from '@/components/WishlistSection';
import { Heart } from 'lucide-react';

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

  const orders = formatOrders(customer);
  const addresses = formatAddresses(customer);
  const profileStats = getProfileStats(customer, orders);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-32 sm:px-6 lg:px-8 relative min-h-screen">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-zinc-200/40 dark:bg-zinc-800/10 rounded-full blur-[160px] pointer-events-none transition-colors duration-300" />

      <div className="relative w-full py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px] text-zinc-950/[0.02] dark:text-white/[0.015] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <AccountSidebar
            firstName={customer.firstName}
            email={customer.email}
            tier={profileStats.tier}
            memberSince={profileStats.memberSince}
            spentThisYear={profileStats.spentThisYear}
            currentYear={profileStats.currentYear}
          />

          <div className="lg:col-span-8 space-y-12 border-l border-border/80 pl-6 lg:pl-10 w-full">
            <OrderLogistics orders={orders} />
            <ShippingCoordinates addresses={addresses} />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-foreground/75" />
                  <h3 className="text-sm font-bold tracking-[0.25em] text-foreground uppercase font-mono">
                    Saved System Gear
                  </h3>
                </div>
              </div>
              <WishlistSection />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
