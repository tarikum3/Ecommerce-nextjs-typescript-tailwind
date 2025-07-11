import { ProductCard, ProductsSkeleton } from "@/app/components/product";

import Link from "next/link";

import { fetchProducts } from "@lib/services/prismaServices";

export default async function ExploreProducts() {
  const productsPromise = await fetchProducts({});
  const { products } = productsPromise;

  if (!products.length) return null;

  return (
    <section className="py-24 bg-primary-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 fade-in">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary-900 sm:text-4xl">
            Explore Products
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-primary-600 mx-auto">
            Discover our carefully curated selection of quality products for
            every need.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
              linkProps={{ prefetch: false }}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center px-6 py-3 border border-primary-900 text-sm font-medium rounded-sm text-primary-900 hover:bg-primary-100 transition-colors duration-300"
          >
            Browse All Products
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
