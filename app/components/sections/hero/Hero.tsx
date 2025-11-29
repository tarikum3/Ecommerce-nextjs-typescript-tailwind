// Hero.tsx
import { HeroConfig } from "@/app/types/hero";
import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

interface HeroProps {
  data?: HeroConfig;
}

export default function Hero({ data }: HeroProps) {
  const heroConfig = data || defaultHeroData;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-6 h-6 rounded-full bg-primary-500 opacity-30 animate-pulse" />
      <div 
        className="absolute top-40 right-20 w-10 h-10 rounded-full bg-accent-500 opacity-20 animate-pulse" 
        style={{ animationDelay: "1s" }} 
      />
      <div 
        className="absolute bottom-32 left-1/4 w-8 h-8 rounded-full bg-primary-500 opacity-20 animate-pulse" 
        style={{ animationDelay: "2s" }} 
      />
      
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center">
          <HeroContent content={heroConfig.content} />
          <HeroVisual visual={heroConfig.visual} />
        </div>
      </div>
    </section>
  );
}

const defaultHeroData: HeroConfig = {
  content: {
    badge: { text: "New Summer Collection", show: true },
    title: { 
      part1: "Summer styles are", 
      highlighted: "finally here", 
      part2: "" 
    },
    description: "This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you live or die.",
    buttons: {
      primary: { text: "Shop Collection", href: "/collection" },
      secondary: { text: "Explore Lookbook", href: "/lookbook" }
    },
    stats: [
      { value: "200+", label: "New Arrivals" },
      { value: "50+", label: "Designer Brands" },
      { value: "2K+", label: "Happy Customers" }
    ]
  },
  visual: {
    mainImage: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg",
    badge: { text: "Summer '23", show: true },
    features: [
      {
        position: "bottom-left",
        icon: "shipping",
        title: "Free Shipping",
        description: "On orders over $75",
        delay: 0,
        show: true
      },
      {
        position: "top-right",
        icon: "security",
        title: "Secure Payment",
        description: "100% protected",
        delay: 2,
        show: true
      }
    ]
  }
};