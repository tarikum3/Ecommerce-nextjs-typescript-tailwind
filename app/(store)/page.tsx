
// import { Hero } from "@/app/components/sections/Hero"
import  Hero  from "@/app/components/sections/hero/Hero"
import CategorySection from "@/app/components/Category/CategorySection";
import TestimonialsSection from "@/app/components/sections/testimonial/TestimonialsSection";
import FeaturedSection from "@/app/components/sections/featured/FeaturedSection";
import FavoritesSection from "@/app/components/sections/favorite/FavoritesSection";
//export const dynamic = "force-dynamic";

//export const revalidate = 3600;
//export const revalidate = 3600;
export const metadata = {
  description: "Modalinda shop.",
  openGraph: {
    type: "website",
  },
};
export default async function Home() {
  return (
    <>
   <Hero />
   <CategorySection />
   <TestimonialsSection />
   <FeaturedSection />
   <FavoritesSection />
    </>
  );
}










// "use client";

// import ProductDetail from "@/app/components/Product/ProductDetail";


// export default function ProductDetailPage() {
//   // Sample product data matching the Product interface
//   const sampleProduct = {
//     id: "prod_001",
//     name: "Classic Minimalist Watch",
//     brand: "TimeCraft",
//     category: "Watches",
//     price: 149.99,
//     originalPrice: 199.99,
//     discount: 25,
//     rating: 4.9,
//     reviewCount: 142,
//     description: "Timeless design meets modern functionality",
//     longDescription: "The Classic Minimalist Watch combines timeless design with modern functionality. Featuring a sleek stainless steel case, genuine leather strap, and precision quartz movement, this watch is perfect for both casual and formal occasions. Engineered for durability and style, it's built to last with scratch-resistant mineral crystal and water resistance up to 50 meters.",
    
//     features: [
//       "Stainless steel case - Durable and corrosion-resistant",
//       "Genuine leather strap - Comfortable and long-lasting",
//       "Quartz movement - Precise timekeeping",
//       "Water resistant - Up to 50 meters",
//       "Scratch-resistant mineral crystal - Clear visibility and protection"
//     ],
    
//     specifications: [
//       { label: "Brand", value: "TimeCraft", highlight: true },
//       { label: "Model", value: "Classic Minimalist", highlight: true },
//       { label: "Case Material", value: "Stainless Steel" },
//       { label: "Strap Material", value: "Genuine Leather" },
//       { label: "Movement", value: "Japanese Quartz", highlight: true },
//       { label: "Water Resistance", value: "50 meters" },
//       { label: "Crystal", value: "Mineral Glass" },
//       { label: "Case Diameter", value: "40mm" },
//       { label: "Case Thickness", value: "9mm" },
//       { label: "Weight", value: "68g" },
//       { label: "Warranty", value: "2 Years", highlight: true },
//       { label: "SKU", value: "TC-CMW-001" }
//     ],
    
//     variants: [
//       {
//         id: "var_001",
//         color: {
//           name: "Black",
//           hex: "#1f2937",
//           image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
//         },
//         size: "38mm",
//         price: 149.99,
//         stock: 15
//       },
//       {
//         id: "var_002",
//         color: {
//           name: "Black",
//           hex: "#1f2937",
//           image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
//         },
//         size: "40mm",
//         price: 149.99,
//         stock: 25
//       },
//       {
//         id: "var_003",
//         color: {
//           name: "Black",
//           hex: "#1f2937",
//           image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg"
//         },
//         size: "42mm",
//         price: 159.99,
//         stock: 8
//       },
//       {
//         id: "var_004",
//         color: {
//           name: "Silver",
//           hex: "#d1d5db",
//           image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg"
//         },
//         size: "38mm",
//         price: 149.99,
//         stock: 12
//       },
//       {
//         id: "var_005",
//         color: {
//           name: "Silver",
//           hex: "#d1d5db",
//           image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg"
//         },
//         size: "40mm",
//         price: 149.99,
//         stock: 18
//       },
//       {
//         id: "var_006",
//         color: {
//           name: "Rose Gold",
//           hex: "#f9a8d4",
//           image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg"
//         },
//         size: "38mm",
//         price: 169.99,
//         stock: 5
//       },
//       {
//         id: "var_007",
//         color: {
//           name: "Rose Gold",
//           hex: "#f9a8d4",
//           image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg"
//         },
//         size: "40mm",
//         price: 169.99,
//         stock: 9
//       }
//     ],
    
//     images: [
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg",
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-02.jpg",
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-03.jpg",
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-04.jpg",
//       "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
//     ],
    
//     reviews: [
//       {
//         id: "rev_001",
//         author: "Emma Sullivan",
//         initials: "ES",
//         rating: 5,
//         date: "2 days ago",
//         comment: "I absolutely love this watch! The minimalist design is exactly what I was looking for. It's comfortable to wear all day and goes with everything in my wardrobe. The quality is exceptional for the price. The leather strap broke in nicely after a couple of days and now feels like it was made for my wrist.",
//         verified: true
//       },
//       {
//         id: "rev_002",
//         author: "Marcus Johnson",
//         initials: "MJ",
//         rating: 5,
//         date: "1 week ago",
//         comment: "This watch exceeded my expectations. The build quality is solid, and the leather strap is comfortable. I've received multiple compliments since I started wearing it. Definitely worth the investment! The timekeeping is incredibly accurate - only gained 2 seconds over the past week.",
//         verified: true
//       },
//       {
//         id: "rev_003",
//         author: "Sophia Rodriguez",
//         initials: "SR",
//         rating: 4.5,
//         date: "3 weeks ago",
//         comment: "Beautiful watch with a clean design. The only reason I'm not giving 5 stars is that the strap was a bit stiff initially, but it's breaking in nicely. The watch itself keeps perfect time. The minimalist dial is very readable, and the silver case goes well with both casual and business attire.",
//         verified: true
//       },
//       {
//         id: "rev_004",
//         author: "Alex Chen",
//         initials: "AC",
//         rating: 5,
//         date: "1 month ago",
//         comment: "As someone who owns several watches, this has quickly become my daily wear. The 40mm size is perfect for my wrist, and the weight distribution is excellent. Water resistance works as advertised - survived a surprise rainstorm without any issues. Highly recommend!",
//         verified: true
//       },
//       {
//         id: "rev_005",
//         author: "Olivia Parker",
//         initials: "OP",
//         rating: 4,
//         date: "2 months ago",
//         comment: "Good value for money. The watch looks more expensive than it is. The crystal is clear and hasn't scratched despite daily wear. My only minor complaint is the buckle could be a bit more refined, but it's functional and secure. Overall very satisfied with the purchase.",
//         verified: false
//       }
//     ],
    
//     stock: 100,
//     isNew: true,
//     isBestSeller: true,
//     sku: "TC-CMW-001-BLK-40",
    
//     tags: ["minimalist", "classic", "leather", "analog", "dress-watch", "men", "women", "unisex"],
    
//     shippingInfo: {
//       freeShipping: true,
//       estimatedDelivery: "3-5 business days",
//       returnPolicy: "30-day return policy"
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       {/* Optional: Add header */}


//       {/* Main Product Detail Component */}
//       <ProductDetail product={sampleProduct} />




//     </div>
//   );
// }