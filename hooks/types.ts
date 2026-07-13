
export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface CartImage {
  url: string;
  altText: string | null;
}

export interface CartProduct {
  title: string;
  handle: string;
  vendor: string;
  featuredImage: CartImage | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
  product: CartProduct;
  image: CartImage | null; 
}

export interface CartItem {
  id: string; 
  quantity: number;
  merchandise: ProductVariant;
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    edges: {
      node: CartItem;
    }[];
  };
  cost: {
    totalAmount: MoneyV2;
    subtotalAmount: MoneyV2;
  };
}

export interface GetCartResponse {
  cart: ShopifyCart | null;
}

export interface CreateCartResponse {
  cartCreate: {
    cart: ShopifyCart | null;
  } | null;
}

export interface AddToCartResponse {
  cartLinesAdd: {
    cart: ShopifyCart | null;
  } | null;
}

export interface UpdateCartResponse {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
  } | null;
}

export interface RemoveFromCartResponse {
  cartLinesRemove: {
    cart: ShopifyCart | null;
  } | null;
}
