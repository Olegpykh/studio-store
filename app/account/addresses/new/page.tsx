import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AddressForm } from '@/components/account/AddressForm';
import { createAddressAction } from '@/lib/actions/address';

export default function NewAddressPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
      <Link
        href="/account"
        className="inline-flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 hover:text-foreground transition-colors mb-8 font-mono"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Hub
      </Link>

      <h1 className="text-2xl font-black tracking-tight uppercase text-foreground mb-8 font-mono">
        Register New Coordinates
      </h1>

      <AddressForm action={createAddressAction} submitLabel="Save Address" />
    </section>
  );
}
