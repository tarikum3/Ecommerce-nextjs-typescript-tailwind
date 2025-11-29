// FloatingCard.tsx
interface FloatingCardProps {
  position: "bottom-left" | "top-right";
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

export default function FloatingCard({ position, icon, title, description, delay }: FloatingCardProps) {
  const positionClasses = {
    "bottom-left": "-bottom-6 -left-6",
    "top-right": "-top-6 -right-6"
  };

  return (
    <div 
      className={`absolute ${positionClasses[position]} bg-white rounded-xl shadow-2xl p-4 max-w-xs animate-float`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center space-x-3">
        <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{title}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </div>
      </div>
    </div>
  );
}