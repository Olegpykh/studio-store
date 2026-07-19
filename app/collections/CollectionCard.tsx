// components/collections/CollectionCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { ShopifyCollectionsResponse } from '@/app/collections/interfaces';

type Collection =
  ShopifyCollectionsResponse['collections']['edges'][number]['node'];

interface CollectionCardProps {
  collection: Collection;
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const collectionLink = `/collections/${collection.handle}`;

  const imageUrl =
    collection.image?.url ||
    collection.products?.edges?.[0]?.node?.featuredImage?.url;

  const imageAlt =
    collection.image?.altText ||
    collection.products?.edges?.[0]?.node?.featuredImage?.altText ||
    collection.title;

  return (
    <Link href={collectionLink} className="group block cursor-pointer">
      <div className="aspect-[4/3] w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/80 rounded-2xl relative overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:bg-background dark:group-hover:bg-zinc-900 group-hover:border-zinc-300 dark:group-hover:border-zinc-700">
        {imageUrl ? (
          <div className="relative w-full h-full p-6 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-4"
            />
          </div>
        ) : (
          <div className="text-zinc-300 dark:text-zinc-600 font-bold text-[10px] tracking-widest">
            No Cover Image
          </div>
        )}
      </div>

      <div className="mt-4 space-y-1 px-1">
        <h3 className="font-bold text-sm text-foreground group-hover:text-gray-500 dark:group-hover:text-zinc-400 transition-colors duration-300">
          {collection.title}
        </h3>
        {collection.description && (
          <p className="text-[11px] text-gray-400 dark:text-zinc-500 font-sans normal-case tracking-normal font-light line-clamp-2 leading-relaxed">
            {collection.description}
          </p>
        )}
        <div className="pt-2 flex items-center text-foreground font-bold text-[10px]">
          Explore Collection
          <span className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
