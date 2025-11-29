// components/FooterContent.tsx
import { FooterConfig } from "@/app/types/footer";
import FooterSections from "./FooterSections";
import FooterNewsletter from "./FooterNewsletter";

interface FooterContentProps {
  content: FooterConfig;
}

export default function FooterContent({ content }: FooterContentProps) {
  const { sections, newsletter, copyright } = content;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-20 xl:grid xl:grid-cols-3 xl:gap-8">
        <FooterSections sections={sections} />
        <FooterNewsletter newsletter={newsletter} />
      </div>

      <div className="border-t border-gray-200 py-10">
        <p className="text-sm text-gray-500">{copyright}</p>
      </div>
    </div>
  );
}