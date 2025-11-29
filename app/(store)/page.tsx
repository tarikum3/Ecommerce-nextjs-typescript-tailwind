
// import { Hero } from "@/app/components/sections/Hero"
import  Hero  from "@/app/components/sections/hero/Hero"
import CategorySection from "@/app/components/Category/CategorySection";
import TestimonialsSection from "@/app/components/sections/testimonial/TestimonialsSection";
import FeaturedSection from "@/app/components/sections/featured/FeaturedSection";
import FavoritesSection from "@/app/components/sections/favorite/FavoritesSection";
//export const dynamic = "force-dynamic";

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
   <CategorySection />
   <TestimonialsSection />
   <FeaturedSection />
   <FavoritesSection />
    </>
  );
}



