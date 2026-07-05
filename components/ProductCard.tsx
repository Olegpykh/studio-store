export function ProductCard({ product }: { product: any }) {
    const image = product.featuredImage || product.images?.edges?.[0]?.node;
  
    if (!image?.url) {
      return null; // полностью скрыть карточку без фото
    }
  
    const price = product.priceRange?.minVariantPrice;
  
    return (
      <div className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
        <div className="aspect-square bg-gray-100 relative">
          <img 
            src={image.url} 
            alt={image.altText || product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
  
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2">{product.title}</h3>
          
          {price && (
            <p className="text-2xl font-bold text-black">
              {parseFloat(price.amount).toFixed(2)} {price.currencyCode}
            </p>
          )}
        </div>
      </div>
    );
  }