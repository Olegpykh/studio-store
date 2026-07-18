// Ключ для хранения в LocalStorage
const WISHLIST_KEY = 'shopify_wishlist';

// Описываем структуру товара, которую мы сохраняем в вишлист
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

// 1. Получить список сохраненных товаров
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

// 2. Добавить товар в вишлист
export function addToWishlist(product: WishlistItem): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getWishlist();
    // Проверяем, нет ли уже этого товара в списке
    if (current.some((item) => item.id === product.id)) return current;

    const updated = [...current, product];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));

    // Генерируем событие для мгновенного обновления хедера и других компонентов
    window.dispatchEvent(new Event('wishlist-updated'));
    return updated;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    return [];
  }
}

// 3. Удалить товар из вишлиста
export function removeFromWishlist(productId: string): WishlistItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getWishlist();
    const updated = current.filter((item) => item.id !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));

    // Генерируем событие для мгновенного обновления хедера и других компонентов
    window.dispatchEvent(new Event('wishlist-updated'));
    return updated;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    return [];
  }
}

// 4. Проверить, находится ли товар в избранном (по ID)
export function isInWishlist(productId: string): boolean {
  return getWishlist().some((item) => item.id === productId);
}
