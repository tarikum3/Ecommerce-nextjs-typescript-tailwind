// components/layout/page-header.tsx

import { Breadcrumb } from './Breadcrumb';
import { cn } from '@/lib/utils';
export interface BreadcrumbItem {
    label: string;
    href?: string;
  }
  
  export interface PageHeaderProps {
    title: string;
    description?: string;
    breadcrumbs?: BreadcrumbItem[];
    className?: string;
  }
export default function PageHeader({
  title,
  description,
  breadcrumbs = [],
  className,
}: PageHeaderProps) {
  const defaultBreadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: title },
  ];

  const displayBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs;

  return (
    <div className={cn('bg-gradient-to-r from-primary-50 to-primary-100 py-12', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Title and Description */}
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 text-lg">{description}</p>
            )}
          </div>

          {/* Breadcrumb */}
          {displayBreadcrumbs.length > 0 && (
            <div className="mt-4 md:mt-0 md:ml-8">
              <Breadcrumb items={displayBreadcrumbs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}