// app/collections/page.tsx
// Это главная страница ВСЕХ коллекций
// URL: http://localhost:3000/collections

import { shopifyFetch } from '@/lib/shopify';
import Link from 'next/link';

// GraphQL query для получения списка коллекций
const GET_COLLECTIONS = `
  {
    collections(first: 10) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            src
            altText
          }
        }
      }
    }
  }
`;

// Metadata для SEO (заголовок страницы и description)
export const metadata = {
  title: 'Collections | SportGear Store',
  description: 'Browse our curated collections of premium sports gear',
};

// Основная функция компонента (async компонент на сервере)
export default async function CollectionsPage() {
  let collections = [];
  let error = null;

  try {
    // Отправляем GraphQL query на Shopify
    const data: any = await shopifyFetch(GET_COLLECTIONS);

    // DEBUG логирование (посмотри в терминал)
    console.log('📦 Collections RAW data:', data);
    console.log('📦 Collections edges:', data?.collections?.edges);
    console.log('📦 Collections count:', data?.collections?.edges?.length);

    // Если есть первая коллекция - посмотри её структуру
    if (data?.collections?.edges?.length > 0) {
      const firstCollection = data.collections.edges[0].node;
      console.log('🏷️ First collection:', firstCollection);
      console.log('🏷️ First collection image:', firstCollection.image);
    }

    // Преобразуем edges в простой массив [item1, item2, item3, ...]
    collections = data?.collections?.edges?.map((edge: any) => edge.node) || [];
    console.log('✅ Collections mapped:', collections.length);
  } catch (err) {
    // Если произошла ошибка
    console.error('❌ Error fetching collections:', err);
    error = err instanceof Error ? err.message : 'Failed to load collections';
  }

  return (
    <main className="min-h-screen bg-white">
      {/* СЕКЦИЯ 1: ЗАГОЛОВОК СТРАНИЦЫ */}
      <section className="border-b border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Collections</h1>
          <p className="text-gray-600">
            Explore our carefully curated collections
          </p>
        </div>
      </section>

      {/* СЕКЦИЯ 2: СЕТКА КОЛЛЕКЦИЙ */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* ЕСЛИ ПРОИЗОШЛА ОШИБКА - ПОКАЗАТЬ СООБЩЕНИЕ ОБ ОШИБКЕ */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded mb-8">
              Error loading collections: {error}
            </div>
          )}

          {/* ЕСЛИ ЕСТЬ КОЛЛЕКЦИИ - ПОКАЗАТЬ ИХ СЕТКУ */}
          {collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* ЦИКЛ ПО КАЖДОЙ КОЛЛЕКЦИИ */}
              {collections.map((collection: any) => (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  className="group"
                >
                  {/* КАРТОЧКА КОЛЛЕКЦИИ */}
                  <div className="rounded-lg overflow-hidden hover:shadow-xl transition">
                    {/* ЕСЛИ ЕСТЬ ИЗОБРАЖЕНИЕ - ПОКАЗАТЬ ЕГО */}
                    {collection.image && (
                      <div className="relative h-72 bg-gray-100 overflow-hidden">
                        {/* САМО ИЗОБРАЖЕНИЕ */}
                        <img
                          src={collection.image.src}
                          alt={collection.image.altText || collection.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition"
                        />

                        {/* ЗАТЕМНЕНИЕ ПОВЕРХ ИЗОБРАЖЕНИЯ */}
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition flex items-center justify-center">
                          {/* НАЗВАНИЕ КОЛЛЕКЦИИ В ЦЕНТРЕ */}
                          <h2 className="text-3xl font-bold text-white text-center px-4">
                            {collection.title}
                          </h2>
                        </div>
                      </div>
                    )}

                    {/* ИНФОРМАЦИЯ О КОЛЛЕКЦИИ СНИЗУ */}
                    <div className="p-4 bg-gray-50">
                      {/* ОПИСАНИЕ КОЛЛЕКЦИИ */}
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {collection.description || 'No description'}
                      </p>

                      {/* КНОПКА "VIEW COLLECTION" */}
                      <button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition font-medium">
                        View Collection
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* ЕСЛИ НЕТ КОЛЛЕКЦИЙ - ПОКАЗАТЬ СООБЩЕНИЕ */
            <p className="text-center text-gray-600 py-12">
              {error
                ? 'Unable to load collections'
                : 'No collections available'}
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
