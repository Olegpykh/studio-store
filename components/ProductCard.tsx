export function ProductCard({ product }: { product: any }) {
    const image = product.images?.edges?.[0]?.node;
    const price = product.priceRange?.minVariantPrice;
  
    return (
      <div className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition">
        <div className="aspect-square bg-gray-100 relative">
          {image ? (
            <img 
              src={image.url || image.src} 
              alt={image.altText || product.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              No image
            </div>
          )}
        </div>
  
        <div className="p-4">
          <h3 className="font-semibold text-lg">{product.title}</h3>
          {price && (
            <p className="text-xl font-bold mt-1">
              {price.amount} {price.currencyCode}
            </p>
          )}
        </div>
      </div>
    );
  }