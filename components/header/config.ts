export interface SubCategory {
  name: string;
  handle: string;
}

export interface MegaMenuCategory {
  title: string;
  trigger: 'women' | 'men' | 'bicycles' | 'winter' | 'other';
  groups: Array<{
    groupName: string;
    items: SubCategory[];
  }>;
}

export const navigationConfig: MegaMenuCategory[] = [
  {
    title: 'Women',
    trigger: 'women',
    groups: [
      {
        groupName: 'Apparel',
        items: [
          { name: 'Dresses', handle: 'womens-dresses' },
          { name: 'Tops & T-Shirts', handle: 'womens-tops' },
          { name: 'Knitwear', handle: 'womens-knitwear' },
          { name: 'Button-ups', handle: 'womens-button-ups' },
          { name: 'Skirts & Shorts', handle: 'womens-skirts' },
          { name: 'Coats & Jackets', handle: 'womens-coats-jackets' },
          { name: 'Lingerie', handle: 'womens-lingerie' },
        ],
      },
      {
        groupName: 'Shoes & Bags',
        items: [
          { name: 'Shoes', handle: 'womens-shoes' },
          { name: 'Bags', handle: 'womens-bags' },
        ],
      },
      {
        groupName: 'Jewelry & Accessories',
        items: [
          { name: 'Rings', handle: 'womens-rings' },
          { name: 'Bracelets', handle: 'womens-bracelets' },
          { name: 'Necklaces', handle: 'womens-necklaces' },
          { name: 'Scarves & Hats', handle: 'womens-scarves' },
          { name: 'Belts', handle: 'womens-belts' },
        ],
      },
    ],
  },
  {
    title: 'Men',
    trigger: 'men',
    groups: [
      {
        groupName: 'Apparel',
        items: [
          { name: 'Coats & Jackets', handle: 'mens-coats-jackets' },
          { name: 'Shirts & Button-ups', handle: 'mens-button-ups' },
          { name: 'Jeans & Denim', handle: 'mens-denim' },
          { name: 'Pants', handle: 'mens-pants' },
          { name: 'Knitwear', handle: 'mens-knitwear' },
          { name: 'Vests', handle: 'mens-vests' },
        ],
      },
      {
        groupName: 'Underwear & Socks',
        items: [
          { name: 'Briefs', handle: 'mens-briefs' },
          { name: 'Socks', handle: 'mens-socks' },
        ],
      },
      {
        groupName: 'Accessories',
        items: [{ name: 'All Accessories', handle: 'mens-accessories' }],
      },
    ],
  },
  {
    title: 'Bicycles',
    trigger: 'bicycles',
    groups: [
      {
        groupName: 'Bikes & Framesets',
        items: [
          { name: 'Fixed Gear Bicycles', handle: 'fixed-gear-bicycle' },
          { name: 'Framesets', handle: 'framesets' },
        ],
      },
      {
        groupName: 'Components',
        items: [
          { name: 'Wheelsets', handle: 'wheelsets' },
          { name: 'Saddles', handle: 'saddle' },
          { name: 'Lighting', handle: 'light' },
        ],
      },
      {
        groupName: 'Gear & Equipment',
        items: [
          { name: 'Bike Accessories', handle: 'bike-accessories' },
          { name: 'Pumps', handle: 'pumps' },
          { name: 'Locks', handle: 'lock' },
        ],
      },
    ],
  },
  {
    title: 'Winter Sports',
    trigger: 'winter',
    groups: [
      {
        groupName: 'Equipment & Wear',
        items: [
          { name: 'Snowboards', handle: 'snowboard' },
          { name: 'Ski Boots', handle: 'ski-boots' },
          { name: 'Helmets', handle: 'helmets' },
          { name: 'Jackets', handle: 'jackets' },
        ],
      },
    ],
  },
  {
    title: 'Other',
    trigger: 'other',
    groups: [
      {
        groupName: 'Miscellaneous',
        items: [
          { name: 'Tools', handle: 'tools' },
          { name: 'Scooters', handle: 'scooter' },
        ],
      },
    ],
  },
];
