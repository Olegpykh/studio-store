import Link from 'next/link';
import Image from 'next/image';
import { ShopifyProduct } from '@/types/shopify';

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const productLink = product.handle ? `/products/${product.handle}` : '/';

  return (
    <Link href={productLink} className="group cursor-pointer block">
      <div className="overflow-hidden rounded-2xl bg-gray-50 aspect-square border border-gray-100 relative p-4 flex items-center justify-center">
        {product.featuredImage?.url ? (
          <Image
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="p-4 object-contain group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      <div className="mt-4">
        {product.vendor && (
          <span className="text-xs text-gray-400 uppercase font-bold tracking-wider block">
            {product.vendor}
          </span>
        )}
        <h4 className="font-bold text-base text-black mt-1 group-hover:text-gray-700 transition line-clamp-2 min-h-[3rem]">
          {product.title}
        </h4>
        <p className="text-sm font-extrabold text-black mt-1">
          {product.priceRange?.minVariantPrice?.amount
            ? `${Number(product.priceRange.minVariantPrice.amount).toFixed(
                2
              )} ${product.priceRange.minVariantPrice.currencyCode}`
            : 'View Details'}
        </p>
      </div>
    </Link>
  );
}
