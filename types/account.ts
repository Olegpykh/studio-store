export interface ShopifyOrderNode {
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

export interface ShopifyAddressNode {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zip: string;
  country: string;
}

export interface FormattedOrder {
  id: string;
  date: string;
  total: string;
  status: string;
  rawStatus: string;
}

export interface FormattedAddress {
  label: string;
  name: string;
  street: string;
  cityCountry: string;
  isDefault: boolean;
}

export interface ShopifyCustomer {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  orders: {
    edges: { node: ShopifyOrderNode }[];
  };
  addresses: {
    edges: { node: ShopifyAddressNode }[];
  };
  defaultAddress?: {
    id: string;
  };
}
