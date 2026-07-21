import Link from 'next/link';
import { ArrowUpRight, Package } from 'lucide-react';
import { FormattedOrder } from '@/types/account';

interface OrderLogisticsProps {
  orders: FormattedOrder[];
}

export function OrderLogistics({ orders }: OrderLogisticsProps) {
  return (
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
              href="/products"
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

              <div className="flex items-center md:justify-end w-full md:w-auto border-t md:border-none pt-3 md:pt-0 border-border/40">
                <span className="font-mono text-sm font-bold text-foreground">
                  {order.total}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
