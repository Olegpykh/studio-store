const WISHLIST_KEY = 'shopify_wishlist';

export interface WishlistItem {
  id: string;
  title: string;
  handle: string;
  vendor?: string;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  images: {
    edges: {
      node: {
        url: string;
        altText: string | null;
      };
    }[];
  };
}

export function getWishlist(): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading wishlist from localStorage:', error);
    return [];
  }
}

export function addToWishlist(product: WishlistItem): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getWishlist();
    if (current.some((item) => item.id === product.id)) return current;

    const updated = [...current, product];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));

    window.dispatchEvent(new Event('wishlist-updated'));
    return updated;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return [];
  }
}

export function removeFromWishlist(productId: string): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getWishlist();
    const updated = current.filter((item) => item.id !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));

    window.dispatchEvent(new Event('wishlist-updated'));
    return updated;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return [];
  }
}

export function isInWishlist(productId: string): boolean {
  return getWishlist().some((item) => item.id === productId);
}
