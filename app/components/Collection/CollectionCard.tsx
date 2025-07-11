import Link from "next/link";
import Image from "next/image";

interface CollectionCardProps {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  altText: string;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  title,
  description,
  imageUrl,
  href,
  altText,
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg">
      <div className="aspect-w-4 aspect-h-5 w-full overflow-hidden rounded-lg bg-primary-200">
        <Image
          src={imageUrl}
          alt={altText}
          fill
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-6">
        <div>
          <h3 className="text-lg font-medium text-primary-0">
            <Link href={href}>
              <span className="absolute inset-0"></span>
              {title}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-primary-100">{description}</p>
          <Link
            href={href}
            className="mt-4 inline-flex items-center text-sm font-medium text-primary-0 group"
          >
            View Collection
            <svg
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};
