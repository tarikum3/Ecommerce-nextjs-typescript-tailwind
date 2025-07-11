import { CollectionCard } from "@/app/components/Collection/CollectionCard";
export const FeaturedCollections = () => {
  const collections = [
    {
      title: "Men's Essentials",
      description: "Timeless pieces for the modern gentleman",
      imageUrl: "/assets/t-shirt-1.png",
      href: "/collection/men",
      altText: "Men's Collection",
    },
    {
      title: "Women's Couture",
      description: "Elegance redefined in every stitch",
      imageUrl: "/assets/t-shirt-2.png",
      href: "/collection/women",
      altText: "Women's Collection",
    },
    {
      title: "New Arrival",
      description: "The perfect finishing touches",
      imageUrl: "/assets/t-shirt-2.png",
      href: "/collection/new-arrival",
      altText: "New Arrival Collection",
    },
  ];

  return (
    <section className="py-24 bg-primary-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <span className="text-sm font-semibold tracking-wider text-primary-600 uppercase">
            Collections
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Curated for the Discerning
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-primary-600 mx-auto">
            Each collection tells a story of craftsmanship and timeless
            elegance.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 min-h-80">
          {collections.map((collection, index) => (
            <CollectionCard
              key={index}
              title={collection.title}
              description={collection.description}
              imageUrl={collection.imageUrl}
              href={collection.href}
              altText={collection.altText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
