import Link from "next/link";
import { ScrollArea } from "@radix-ui/react-scroll-area";

interface MobileMenuContentProps {
  gender: "women" | "men";
}

export default function MobileMenuContent({ gender }: MobileMenuContentProps) {
  const content = {
    women: {
      featured: [
        {
          image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-01.jpg",
          title: "New Arrivals",
          description: "Shop now"
        },
        {
          image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/mega-menu-category-02.jpg",
          title: "Basic Tees",
          description: "Shop now"
        }
      ],
      clothing: ["Tops", "Dresses", "Pants", "Denim", "Sweaters", "T-Shirts", "Jackets", "Activewear", "Browse All"],
      accessories: ["Watches", "Wallets", "Bags", "Sunglasses", "Hats", "Belts"],
      brands: ["Full Nelson", "My Way", "Re-Arranged", "Counterfeit", "Significant Other"]
    },
    men: {
      featured: [
        {
          image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          title: "New Arrivals",
          description: "Shop now"
        },
        {
          image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-02-image-card-06.jpg",
          title: "Artwork Tees",
          description: "Shop now"
        }
      ],
      clothing: ["Tops", "Pants", "Sweaters", "T-Shirts", "Jackets", "Activewear", "Browse All"],
      accessories: ["Watches", "Wallets", "Bags", "Sunglasses", "Hats", "Belts"],
      brands: ["Re-Arranged", "Counterfeit", "Full Nelson", "My Way"]
    }
  };

  const currentContent = content[gender];

  return (
    <ScrollArea className="flex-1 px-4 pb-8 pt-10">
      <div className="space-y-10">
        {/* Featured Items */}
        <div className="grid grid-cols-2 gap-x-4">
          {currentContent.featured.map((item, index) => (
            <div key={index} className="group relative text-sm">
              <img 
                src={item.image} 
                alt={item.title}
                className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75 transition-opacity"
              />
              <Link href="#" className="mt-6 block font-medium text-gray-900">
                <span className="absolute inset-0 z-10" aria-hidden="true" />
                {item.title}
              </Link>
              <p aria-hidden="true" className="mt-1 text-sm text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Categories */}
        <CategorySection title="Clothing" items={currentContent.clothing} />
        <CategorySection title="Accessories" items={currentContent.accessories} />
        <CategorySection title="Brands" items={currentContent.brands} />
      </div>
    </ScrollArea>
  );
}

function CategorySection({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-medium text-gray-900">{title}</p>
      <ul className="mt-6 flex flex-col space-y-6">
        {items.map((item) => (
          <li key={item} className="flow-root">
            <Link href="#" className="-m-2 block p-2 text-gray-500 hover:text-primary-600 transition-colors">
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}