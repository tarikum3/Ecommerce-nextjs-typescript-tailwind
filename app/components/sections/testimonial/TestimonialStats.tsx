// components/TestimonialStats.tsx
import { TestimonialStats as TestimonialStatsType } from "@/app/types/testimonial";

interface TestimonialStatsProps {
  stats: TestimonialStatsType;
}

export default function TestimonialStats({ stats }: TestimonialStatsProps) {
  const { rating, customers, recommendation, support } = stats;

  return (
    <div className="mt-20 bg-gradient-to-r from-primary-50 to-primary-100 rounded-2xl p-8 md:p-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <StatItem value={rating} label="Average Rating" />
        <StatItem value={customers} label="Happy Customers" />
        <StatItem value={recommendation} label="Recommend to Friends" />
        <StatItem value={support} label="Customer Support" />
      </div>
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
        {value}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
}