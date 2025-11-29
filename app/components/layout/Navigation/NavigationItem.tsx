import Link from "next/link";

interface NavigationItemProps {
  label: string;
  href: string;
}

export default function NavigationItem({ label, href }: NavigationItemProps) {
  return (
    <Link
      href={href}
      className="nav-link text-gray-700 hover:text-primary-600 font-medium transition-colors"
    >
      {label}
    </Link>
  );
}