
export const siteConfig = {
    name: "SportGear Store",
    description: "Premium sports apparel engineered for performance",
    url: "http://localhost:3000",
    
    categories: [
      { name: "Running", slug: "running" },
      { name: "Training", slug: "training" },
      { name: "Yoga", slug: "yoga" },
      { name: "Accessories", slug: "accessories" },
      { name: "Footwear", slug: "footwear" },
    ],
    
    shopify: {
      storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE || "",
      accessToken: process.env.NEXT_PUBLIC_SHOPIFY_TOKEN || "",
    },
  };