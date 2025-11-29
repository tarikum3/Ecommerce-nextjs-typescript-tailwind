// HeroVisual.tsx
import { HeroVisual as HeroVisualType } from "@/app/types/hero";
import FloatingCard from "./FloatingCard";
import { Truck, Shield } from "lucide-react";

interface HeroVisualProps {
  visual: HeroVisualType;
}

export default function HeroVisual({ visual }: HeroVisualProps) {
  const { mainImage, badge, features } = visual;

  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "shipping":
        return <Truck className="h-6 w-6 text-white" />;
      case "security":
        return <Shield className="h-6 w-6 text-white" />;
      default:
        return <Truck className="h-6 w-6 text-white" />;
    }
  };

  return (
    <div className="lg:w-1/2 relative">
      <div className="relative z-10">
        {/* Main product image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src={mainImage} 
            alt="Summer fashion collection" 
            className="w-full h-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
          
          {/* Floating badge */}
          {badge.show && (
            <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md rounded-full py-2 px-4 border border-white/20">
              <span className="text-sm font-semibold">{badge.text}</span>
            </div>
          )}
        </div>
        
        {/* Floating cards */}
        {features
          .filter(feature => feature.show)
          .map((feature, index) => (
            <FloatingCard 
              key={index}
              position={feature.position}
              icon={getIconComponent(feature.icon)}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
      </div>
    </div>
  );
}