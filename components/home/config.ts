export interface CollectionCategory {
  name: string;
  count: string;
  href: string;
}

export const CORE_CATEGORIES: CollectionCategory[] = [
  {
    name: "Women's Fashion",
    count: 'Dresses, Tops & Accessories',
    href: '/collections/womens-tops',
  },
  {
    name: "Men's Wardrobe",
    count: 'Premium Casual & Outerwear',
    href: '/collections/mens-coats-jackets',
  },
  {
    name: 'Urban Bicycles',
    count: 'Fixed Gear & Components',
    href: '/collections/fixed-gear-bicycle',
  },
  {
    name: 'Active & Winter',
    count: 'Snowboards & Equipment',
    href: '/collections/snowboard',
  },
];
