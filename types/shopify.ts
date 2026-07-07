export type ShopifyImage = {
  url: string;
  altText?: string;
};

export type ShopifyPrice = {
  amount: string;
  currencyCode: string;
};

// 1. Добавляем тип для одного варианта товара (размер, цвет и т.д.)
export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  priceV2: ShopifyPrice;
};

// 2. Прокачиваем основной тип продукта
export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  vendor?: string; // Добавили бренд/производителя
  description: string; // Делаем обязательным (для страницы товара)
  featuredImage?: ShopifyImage;
  images?: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  priceRange: {
    // Делаем обязательным, чтобы не писать везде проверки `?`
    minVariantPrice: ShopifyPrice;
  };
  // Добавляем список вариантов (опций) товара для детальной страницы
  variants?: {
    edges: Array<{
      node: ShopifyProductVariant;
    }>;
  };
};

// Тип для ответа запроса списка товаров (то, что на главной)
export type ProductsQuery = {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
};

// 3. Добавляем тип для ответа запроса ОДНОГО товара по хэндлу
export type SingleProductQuery = {
  product: ShopifyProduct | null;
};
