import { CategoryConfig } from "@/app/types/category";

interface CategoryContentProps {
  content: CategoryConfig;
}

export default function CategoryContent({ content }: CategoryContentProps) {
  const { badge, title, description } = content;

  return (
    <div className="text-center mb-16 animate-slide-up">
      {badge.show && (
        <span className="inline-block px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-sm font-medium mb-4">
          {badge.text}
        </span>
      )}
      <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
}