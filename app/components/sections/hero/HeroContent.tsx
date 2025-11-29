// HeroContent.tsx
import Link from "next/link";
import { HeroContent as HeroContentType } from "@/app/types/hero";

interface HeroContentProps {
  content: HeroContentType;
}

export default function HeroContent({ content }: HeroContentProps) {
  const { badge, title, description, buttons, stats } = content;

  return (
    <div className="lg:w-1/2 mb-12 lg:mb-0 animate-slide-up">
      {badge.show && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <span className="h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse" />
          <span className="text-sm font-medium">{badge.text}</span>
        </div>
      )}
      
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
        {title.part1}{" "}
        <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          {title.highlighted}
        </span>
        {title.part2 && ` ${title.part2}`}
      </h1>
      
      <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Link
          href={buttons.primary.href}
          className="px-8 py-3 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg font-semibold text-center shadow-lg hover:shadow-xl transition-all hover:scale-105"
        >
          {buttons.primary.text}
        </Link>
        <Link
          href={buttons.secondary.href}
          className="px-8 py-3 border border-white/30 rounded-lg font-semibold text-center backdrop-blur-sm hover:bg-white/10 transition-colors"
        >
          {buttons.secondary.text}
        </Link>
      </div>
      
      <div className="mt-12 flex items-center space-x-6">
        <Stat value={stats[0]?.value || "200+"} label={stats[0]?.label || "New Arrivals"} />
        <div className="h-8 w-px bg-gray-700" />
        <Stat value={stats[1]?.value || "50+"} label={stats[1]?.label || "Designer Brands"} />
        <div className="h-8 w-px bg-gray-700" />
        <Stat value={stats[2]?.value || "2K+"} label={stats[2]?.label || "Happy Customers"} />
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
    </div>
  );
}