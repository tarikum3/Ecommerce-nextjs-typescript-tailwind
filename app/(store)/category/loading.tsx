// app/products/loading.tsx
export default function Loading() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(12)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-neutral-100 dark:bg-neutral-900 rounded-lg"
          >
            <div className="aspect-square bg-neutral-200 dark:bg-neutral-800 rounded-t-lg"></div>
            <div className="p-4 space-y-2">
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-3/4"></div>
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded w-1/2"></div>
              <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded w-1/4"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
