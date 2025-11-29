// components/TestimonialsContent.tsx
interface TestimonialsContentProps {
  title: string;
  description: string;
}

export default function TestimonialsContent({ title, description }: TestimonialsContentProps) {
  return (
    <div className="text-center mb-16 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}