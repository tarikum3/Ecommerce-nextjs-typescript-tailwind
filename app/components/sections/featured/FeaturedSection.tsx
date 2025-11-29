// components/FeaturedSection.tsx
import { FeaturedConfig } from "@/app/types/featured";

interface FeaturedSectionProps {
  data?: FeaturedConfig;
}

export default function FeaturedSection({ data }: FeaturedSectionProps) {
  const featuredConfig = data || defaultFeaturedData;

  return (
    <section aria-labelledby="cause-heading" className="relative">
      <div className="relative bg-gray-800 px-6 py-32 sm:px-12 sm:py-40 lg:px-16">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={featuredConfig.background.image} 
            alt="" 
            className="h-full w-full object-cover object-center"
          />
        </div>
        
        {/* Overlay */}
        {featuredConfig.background.overlay && (
          <div aria-hidden="true" className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        )}
        
        {/* Content */}
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 id="cause-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {featuredConfig.heading}
          </h2>
          <p className="mt-3 text-xl text-white">
            {featuredConfig.description}
          </p>
          <a 
            href={featuredConfig.cta.href}
            className="mt-8 block w-full rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto transition-colors duration-200"
          >
            {featuredConfig.cta.text}
          </a>
        </div>
      </div>
    </section>
  );
}

// Default data fallback
const defaultFeaturedData: FeaturedConfig = {
  heading: "Long-term thinking",
  description: "We're committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows us to focus on quality and reduce our impact. We're doing our best to delay the inevitable heat-death of the universe.",
  cta: {
    text: "Read our story",
    href: "/story"
  },
  background: {
    image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-feature-section-full-width.jpg",
    overlay: true
  }
};