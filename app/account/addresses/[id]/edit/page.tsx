import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getShopifyAccountData } from '@/lib/shopify/getAccountData';
import { AddressForm } from '@/components/account/AddressForm';
import { updateAddressAction } from '@/lib/actions/address';
import { extractNumericId } from '@/lib/utils/shopifyId';

interface EditAddressPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAddressPage({
  params,
}: EditAddressPageProps) {
  const { id: numericId } = await params;

  const cookieStore = await cookies();
  const token = cookieStore.get('customer_token')?.value;

  if (!token) {
    redirect('/login');
  }

  const customer = await getShopifyAccountData(token);

  if (!customer) {
    redirect('/login');
  }

  const address = customer.addresses?.edges.find(
    (edge) => extractNumericId(edge.node.id) === numericId
  )?.node;

  if (!address) {
    notFound();
  }

  const boundUpdateAction = updateAddressAction.bind(null, address.id);

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
        Modify Coordinates
      </h1>

      <AddressForm
        action={boundUpdateAction}
        defaultValues={{
          firstName: address.firstName,
          lastName: address.lastName,
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          zip: address.zip,
          country: address.country,
        }}
        submitLabel="Update Address"
      />
    </section>
  );
}
