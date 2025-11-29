// components/TestimonialsSection.tsx
import { TestimonialsConfig } from "@/app/types/testimonial";
import TestimonialsContent from "./TestimonialsContent";
import TestimonialsGrid from "./TestimonialsGrid";

interface TestimonialsSectionProps {
  data?: TestimonialsConfig;
}

export default function TestimonialsSection({ data }: TestimonialsSectionProps) {
  const testimonialsConfig = data || defaultTestimonialsData;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <TestimonialsContent 
          title={testimonialsConfig.title}
          description={testimonialsConfig.description}
        />
        
        <TestimonialsGrid 
          testimonials={testimonialsConfig.testimonials}
          stats={testimonialsConfig.stats}
        />
      </div>
    </section>
  );
}

// Default data fallback
const defaultTestimonialsData: TestimonialsConfig = {
  title: "What Our Customers Say",
  description: "Hear from fashion enthusiasts who love our products and service",
  testimonials: [
    {
      id: "1",
      name: "Emma Sullivan",
      role: "Fashion Blogger",
      rating: 5,
      content: "The quality of the materials is exceptional. I've purchased several pieces from StyleHub and they've all become staples in my wardrobe. The minimalist watch is my absolute favorite!",
      product: "Minimalist Watch",
      initials: "ES"
    },
    {
      id: "2",
      name: "Marcus Johnson",
      role: "Designer",
      rating: 4.5,
      content: "I'm always impressed with StyleHub's attention to detail. The organic cotton t-shirt is the most comfortable I've ever worn. The fit is perfect and the fabric feels luxurious.",
      product: "Organic Cotton T-Shirt",
      initials: "MJ"
    },
    {
      id: "3",
      name: "Sophia Rodriguez",
      role: "Marketing Executive",
      rating: 5,
      content: "The leather crossbody bag exceeded my expectations. It's both stylish and functional, with perfect compartments for all my essentials. I've received so many compliments!",
      product: "Leather Crossbody Bag",
      initials: "SR"
    }
  ],
  stats: {
    rating: "4.9/5",
    customers: "10K+",
    recommendation: "98%",
    support: "24/7"
  }
};