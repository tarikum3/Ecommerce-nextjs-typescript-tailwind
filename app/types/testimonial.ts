// types/testimonials.ts
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  content: string;
  product: string;
  avatar?: string;
  initials: string;
}

export interface TestimonialStats {
  rating: string;
  customers: string;
  recommendation: string;
  support: string;
}

export interface TestimonialsConfig {
  title: string;
  description: string;
  testimonials: Testimonial[];
  stats: TestimonialStats;
}