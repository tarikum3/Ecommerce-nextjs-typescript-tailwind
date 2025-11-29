// components/TestimonialCard.tsx
import { Testimonial } from "@/app/types/testimonial";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  const { name, role, rating, content, product, initials } = testimonial;

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  return (
    <div 
      className="testimonial-card bg-white rounded-xl shadow-md overflow-hidden"
      style={{ animationDelay: `${0.1 + index * 0.1}s` }}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-sm mr-4">
            <span className="text-white font-bold">{initials}</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
        
        <div className="flex text-amber-400 mb-4">
          {renderStars(rating)}
        </div>
        
        <p className="text-gray-600 mb-4">"{content}"</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Purchased: {product}</span>
        </div>
      </div>
    </div>
  );
}