// src/components/layout/AnnouncementBar.tsx
export function AnnouncementBar() {
    return (
      <div className="bg-gradient-to-r from-primary-500 to-accent-500 py-2 text-center text-sm text-white">
        <div className="container mx-auto px-4">
          <p className="inline-block animate-pulse">
            ✨ Free shipping on all orders over $75! Limited time offer.
          </p>
        </div>
      </div>
    )
  }