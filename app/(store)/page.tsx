import { ProductsSkeleton } from "@/app/components/product";

import { Suspense } from "react";
import Hero from "@/app/components/home/Hero";

import { FeaturedCollections } from "@/app/components/home/FeaturedCollections";
import ExploreProducts from "@/app/components/home/ExploreProducts";
import Newsletter from "@/app/components/home/Newsletter";
export const dynamic = "force-dynamic";

//export const revalidate = 3600;
//export const revalidate = 3600;
export const metadata = {
  description: "Modalinda shop.",
  openGraph: {
    type: "website",
  },
};
export default async function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <div className=" mx-auto mb-12  px-10 py-5">
        <Suspense fallback={<ProductsSkeleton></ProductsSkeleton>}>
          <ExploreProducts />
        </Suspense>
      </div>

      <Newsletter />
    </>
  );
}
