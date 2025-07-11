import { ProductCard, ProductsSkeleton } from "@/app/components/product";

import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "@lib/services/prismaServices";

export default async function FinalStockSection() {
  const productsPromise = await fetchProducts({});
  const { products } = productsPromise;

  if (!products.length) return null;

  return (
    <section className="relative bg-[#1e2939] text-primary-0 py-1">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center relative z-10">
        {/* Left Text Section */}
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Final Stock. Up to 50% off.
          </h2>
          <p className="text-lg mb-6">Don't miss out on our exclusive sale!</p>
          <Link
            href="/search?discount=true"
            className="inline-block text-lg font-semibold bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md transition-colors"
          >
            Shop the sale →
          </Link>
        </div>

        {/* Right Grid Section */}
        <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {products.slice(0, 6).map((product, index) => (
            <div
              key={product.id}
              className={`relative overflow-hidden rounded-lg shadow-lg transition-transform ${
                index % 3 === 1
                  ? "-translate-y-16 z-10" // Offset for middle row
                  : "translate-y-0"
              }`}
            >
              <Image
                src={product.images[0]?.url || "/placeholder.png"}
                alt={product.name}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-xl font-semibold">{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlap Effect for middle row */}
      <div className="absolute -top-8 inset-x-0 h-8 bg-[#1e2939]" />
    </section>
  );
}
