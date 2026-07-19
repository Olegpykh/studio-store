// lib/utils/formatAccountData.ts
import {
  ShopifyCustomer,
  ShopifyOrderNode,
  ShopifyAddressNode,
  FormattedOrder,
  FormattedAddress,
} from '@/types/account';

export function formatOrders(customer: ShopifyCustomer): FormattedOrder[] {
  return (customer.orders?.edges || []).map(
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
}

export function formatAddresses(customer: ShopifyCustomer): FormattedAddress[] {
  const defaultAddressId = customer.defaultAddress?.id;

  return (customer.addresses?.edges || []).map(
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
}

export function getProfileStats(
  customer: ShopifyCustomer,
  orders: FormattedOrder[]
) {
  const memberSinceDate = new Date(customer.createdAt).toLocaleDateString(
    'en-US',
    {
      month: 'long',
      year: 'numeric',
    }
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

  return {
    tier: orders.length > 3 ? 'LEVEL_02_USER' : 'BASIC_ACCESS',
    memberSince: memberSinceDate,
    spentThisYear: `€${spentThisYearNum.toFixed(2)}`,
  };
}
