import { create } from 'zustand';
import { shopifyFetch } from '@/lib/shopify';
import {
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_LINES_MUTATION,
  REMOVE_FROM_CART_MUTATION,
  GET_CART_QUERY,
} from '@/lib/shopify-queries';
import {
  MoneyV2,
  CartItem,
  GetCartResponse,
  CreateCartResponse,
  AddToCartResponse,
  UpdateCartResponse,
  RemoveFromCartResponse,
} from "./types"; 

interface CartState {
  cartId: string | null;
  items: CartItem[];
  totalQuantity: number;
  totalAmount: MoneyV2 | null;
  checkoutUrl: string | null;
  isLoading: boolean;

  initCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

export const useCart = create<CartState>((set, get) => ({
  cartId: null,
  items: [],
  totalQuantity: 0,
  totalAmount: null,
  checkoutUrl: null,
  isLoading: false,

  initCart: async () => {
    if (typeof window === 'undefined') return;
    const savedCartId = localStorage.getItem('shopify_cart_id');
    if (!savedCartId) return;

    set({ isLoading: true });
    try {
      const data = await shopifyFetch<GetCartResponse>(GET_CART_QUERY, {
        cartId: savedCartId,
      });
      if (data?.cart) {
        const lines = data.cart.lines.edges.map(
          (edge: { node: CartItem }) => edge.node
        );
        set({
          cartId: data.cart.id,
          items: lines,
          totalQuantity: data.cart.totalQuantity,
          totalAmount: data.cart.cost.totalAmount,
          checkoutUrl: data.cart.checkoutUrl,
        });
      } else {
        localStorage.removeItem('shopify_cart_id');
      }
    } catch (error) {
      console.error('Failed to init cart:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (variantId: string, quantity = 1) => {
    set({ isLoading: true });
    const currentCartId = get().cartId;

    try {
      if (!currentCartId) {
        const data = await shopifyFetch<CreateCartResponse>(
          CREATE_CART_MUTATION,
          {
            input: { lines: [{ merchandiseId: variantId, quantity }] },
          }
        );
        const cart = data?.cartCreate?.cart;

        if (cart) {
          localStorage.setItem('shopify_cart_id', cart.id);
          const lines = cart.lines.edges.map(
            (edge: { node: CartItem }) => edge.node
          );
          set({
            cartId: cart.id,
            items: lines,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.cost.totalAmount,
            checkoutUrl: cart.checkoutUrl,
          });
        }
      } else {
        const data = await shopifyFetch<AddToCartResponse>(
          ADD_TO_CART_MUTATION,
          {
            cartId: currentCartId,
            lines: [{ merchandiseId: variantId, quantity }],
          }
        );
        const cart = data?.cartLinesAdd?.cart;

        if (cart) {
          const lines = cart.lines.edges.map(
            (edge: { node: CartItem }) => edge.node
          );
          set({
            cartId: cart.id,
            items: lines,
            totalQuantity: cart.totalQuantity,
            totalAmount: cart.cost.totalAmount,
            checkoutUrl: cart.checkoutUrl,
          });
        }
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateQuantity: async (lineId: string, quantity: number) => {
    const { cartId } = get();
    if (!cartId) return;

    if (quantity <= 0) {
      get().removeItem(lineId);
      return;
    }

    set({ isLoading: true });
    try {
      const data = await shopifyFetch<UpdateCartResponse>(
        UPDATE_CART_LINES_MUTATION,
        {
          cartId,
          lines: [{ id: lineId, quantity }],
        }
      );
      const cart = data?.cartLinesUpdate?.cart;

      if (cart) {
        const lines = cart.lines.edges.map(
          (edge: { node: CartItem }) => edge.node
        );
        set({
          items: lines,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.cost.totalAmount,
          checkoutUrl: cart.checkoutUrl,
        });
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (lineId: string) => {
    const { cartId } = get();
    if (!cartId) return;

    set({ isLoading: true });
    try {
      const data = await shopifyFetch<RemoveFromCartResponse>(
        REMOVE_FROM_CART_MUTATION,
        {
          cartId,
          lineIds: [lineId],
        }
      );
      const cart = data?.cartLinesRemove?.cart;

      if (cart) {
        const lines = cart.lines.edges.map(
          (edge: { node: CartItem }) => edge.node
        );
        set({
          items: lines,
          totalQuantity: cart.totalQuantity,
          totalAmount: cart.cost.totalAmount,
          checkoutUrl: cart.checkoutUrl,
        });
      }
    } catch (error) {
      console.error('Failed to remove item:', error);
    } finally {
      set({ isLoading: false });
    }
  },
}));