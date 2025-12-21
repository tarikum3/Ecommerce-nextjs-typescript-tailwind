// app/product/[handle]/page.tsx
import ProductDetail from "@/app/components/Product/ProductDetail";

// Fake API function - simulates fetching product data
async function fetchProductData(handle: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Sample product data
  return {
    id: `prod_${handle}`,
    name: "Premium Wireless Headphones Pro",
    brand: "AudioTech",
    category: "Electronics",
    price: 249.99,
    originalPrice: 349.99,
    discount: 29,
    rating: 4.7,
    reviewCount: 1287,
    description: "High-quality wireless headphones with noise cancellation",
    longDescription: "Experience premium sound quality with our Advanced Wireless Headphones Pro. Featuring industry-leading active noise cancellation, 40-hour battery life with quick charge, and ultra-comfortable memory foam ear cushions. Perfect for work, travel, and entertainment. Includes carrying case and 3.5mm audio cable.",
    features: [
      "Active Noise Cancellation (ANC)",
      "40-hour battery life with fast charging",
      "Memory foam ear cushions",
      "Voice assistant compatible",
      "Bluetooth 5.3 with multipoint connection",
      "Foldable design with premium carrying case",
      "Hi-Res Audio certification",
      "Built-in microphone with echo cancellation"
    ],
    specifications: [
      { label: "Model", value: "ATH-M50xBT3 Pro", highlight: true },
      { label: "Driver", value: "45mm diameter", highlight: false },
      { label: "Frequency Response", value: "5 - 40,000 Hz", highlight: false },
      { label: "Battery Life", value: "40 hours (ANC on)", highlight: true },
      { label: "Charging Time", value: "1.5 hours (fast charge)", highlight: false },
      { label: "Weight", value: "285g", highlight: false },
      { label: "Bluetooth Version", value: "5.3", highlight: false },
      { label: "Water Resistance", value: "IPX4", highlight: false },
      { label: "Microphone", value: "Built-in with noise reduction", highlight: false },
      { label: "Wireless Range", value: "10 meters", highlight: false }
    ],
    variants: [
      {
        id: "var_001",
        color: { 
          name: "Matte Black", 
          hex: "#1a1a1a", 
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" 
        },
        size: "Standard",
        price: 249.99,
        stock: 45
      },
      {
        id: "var_002",
        color: { 
          name: "Silver", 
          hex: "#c0c0c0", 
          image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w-400&h=400&fit=crop" 
        },
        size: "Standard",
        price: 249.99,
        stock: 28
      },
      {
        id: "var_003",
        color: { 
          name: "Navy Blue", 
          hex: "#000080", 
          image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop" 
        },
        size: "Standard",
        price: 249.99,
        stock: 15
      },
      {
        id: "var_004",
        color: { 
          name: "Deep Red", 
          hex: "#8b0000", 
          image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=400&fit=crop" 
        },
        size: "Standard",
        price: 249.99,
        stock: 8
      },
      {
        id: "var_005",
        color: { 
          name: "Forest Green", 
          hex: "#228b22", 
          image: "https://images.unsplash.com/photo-1585298725525-8ef77c8c8dbb?w=400&h=400&fit=crop" 
        },
        size: "Standard",
        price: 259.99,
        stock: 0
      }
    ],
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1585298725525-8ef77c8c8dbb?w=1200&h=1200&fit=crop"
    ],
    reviews: [
      {
        id: "rev_001",
        author: "Alex Johnson",
        initials: "AJ",
        rating: 5,
        date: "2 weeks ago",
        comment: "These headphones are absolutely fantastic! The noise cancellation is incredible - I can't hear anything around me when I'm working. Battery life is as advertised, and the sound quality is superb for both music and calls. The quick charge feature saved me during my last trip. Highly recommended!",
        verified: true
      },
      {
        id: "rev_002",
        author: "Maria Garcia",
        initials: "MG",
        rating: 4,
        date: "1 month ago",
        comment: "Great headphones overall. Comfortable for long sessions (wore them for 8 hours straight) and the sound quality is excellent. My only minor complaint is that the touch controls can be a bit sensitive sometimes. But definitely worth the price!",
        verified: true
      },
      {
        id: "rev_003",
        author: "David Chen",
        initials: "DC",
        rating: 5,
        date: "3 months ago",
        comment: "I travel frequently for work and these have been a game-changer. The case is sturdy, battery lasts through long flights, and the noise cancellation makes airport lounges bearable. Best purchase I've made this year! The multipoint connection is perfect for switching between laptop and phone.",
        verified: false
      },
      {
        id: "rev_004",
        author: "Sarah Miller",
        initials: "SM",
        rating: 4,
        date: "2 months ago",
        comment: "Very happy with this purchase. The audio quality is crisp and clear across all frequencies. They're comfortable enough to wear for hours without fatigue. The quick charge feature is super convenient when I forget to charge overnight - 15 minutes gives me 5 hours of playback!",
        verified: true
      },
      {
        id: "rev_005",
        author: "James Wilson",
        initials: "JW",
        rating: 5,
        date: "1 week ago",
        comment: "Perfect for both work and entertainment. The noise cancellation helps me focus in open offices, and the sound quality for music is phenomenal. The battery life is incredible - I only charge once a week with daily use.",
        verified: true
      }
    ],
    stock: 96,
    isNew: true,
    isBestSeller: true,
    sku: "AUDIO-PRO-2024",
    tags: ["wireless", "noise-cancelling", "premium", "bluetooth", "hi-res", "travel"],
    shippingInfo: {
      freeShipping: true,
      estimatedDelivery: "2-3 business days",
      returnPolicy: "30-day return policy with free returns"
    }
  };
}

export default async function ProductPage({ 
  params 
}: { 
  params: { handle: string } 
}) {
  // Fetch product data using fake API
  const product = await fetchProductData(params.handle);
  
  return <ProductDetail product={product} />;
}


