
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from './PageHeader';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav className={cn('flex', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  'text-sm transition-colors hover:text-primary-600',
                  index === items.length - 1
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500'
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  'text-sm',
                  index === items.length - 1
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-500'
                )}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}