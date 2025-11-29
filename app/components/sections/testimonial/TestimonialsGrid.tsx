// components/TestimonialsGrid.tsx
import { Testimonial, TestimonialStats } from "@/app/types/testimonial";
import TestimonialCard from "./TestimonialCard";
import  Stats from "./TestimonialStats";

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  stats: TestimonialStats;
}

export default function TestimonialsGrid({ testimonials, stats }: TestimonialsGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-animation">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
      
      <Stats stats={stats} />
    </>
  );
}