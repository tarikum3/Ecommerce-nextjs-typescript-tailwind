// components/FooterSections.tsx
import { FooterSection } from "@/app/types/footer";
import Link from "next/link";

interface FooterSectionsProps {
  sections: FooterSection[];
}

export default function FooterSections({ sections }: FooterSectionsProps) {
  return (
    <div className="grid grid-cols-2 gap-8 xl:col-span-2">
      <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        <Section section={sections[0]} />
        <Section section={sections[1]} />
      </div>
      <div className="space-y-16 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        <Section section={sections[2]} />
        <Section section={sections[3]} />
      </div>
    </div>
  );
}

function Section({ section }: { section: FooterSection }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-900">{section.title}</h3>
      <ul role="list" className="mt-6 space-y-6">
        {section.links.map((link, index) => (
          <li key={index} className="text-sm">
            <Link 
              href={link.href} 
              className="text-gray-500 hover:text-gray-600 transition-colors"
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}