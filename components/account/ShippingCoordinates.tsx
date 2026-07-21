import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { FormattedAddress } from '@/types/account';
import { DeleteAddressButton } from '@/components/account/DeleteAddressButton';
import { deleteAddressAction } from '@/lib/actions/address';

interface ShippingCoordinatesProps {
  addresses: FormattedAddress[];
}

export function ShippingCoordinates({ addresses }: ShippingCoordinatesProps) {
  return (
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
            <Link
              href="/account/addresses/new"
              className="text-[9px] font-bold tracking-[0.15em] text-foreground uppercase hover:underline font-mono inline-flex items-center gap-1"
            >
              Register Coordinates
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          addresses.map((address: FormattedAddress) => (
            <div
              key={address.id}
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
                <p className="font-bold text-foreground">{address.name}</p>
                <p>{address.street}</p>
                <p>{address.cityCountry}</p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <Link
                  href={`/account/addresses/${address.id}/edit`}
                  className="text-[9px] font-bold tracking-[0.15em] text-foreground uppercase hover:underline font-mono inline-flex items-center gap-1"
                >
                  Modify Coordinates
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <DeleteAddressButton
                  action={deleteAddressAction.bind(null, address.rawId)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
