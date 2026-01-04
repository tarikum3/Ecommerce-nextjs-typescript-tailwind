// // app/product/[handle]/page.tsx
// import ProductDetail from "@/app/components/Product/ProductDetail";

// // Fake API function - simulates fetching product data
// async function fetchProductData(handle: string) {
//   // Simulate API delay
//   await new Promise(resolve => setTimeout(resolve, 100));
  
//   // Sample product data
//   return {
//     id: `prod_${handle}`,
//     name: "Premium Wireless Headphones Pro",
//     brand: "AudioTech",
//     category: "Electronics",
//     price: 249.99,
//     originalPrice: 349.99,
//     discount: 29,
//     rating: 4.7,
//     reviewCount: 1287,
//     description: "High-quality wireless headphones with noise cancellation",
//     longDescription: "Experience premium sound quality with our Advanced Wireless Headphones Pro. Featuring industry-leading active noise cancellation, 40-hour battery life with quick charge, and ultra-comfortable memory foam ear cushions. Perfect for work, travel, and entertainment. Includes carrying case and 3.5mm audio cable.",
//     features: [
//       "Active Noise Cancellation (ANC)",
//       "40-hour battery life with fast charging",
//       "Memory foam ear cushions",
//       "Voice assistant compatible",
//       "Bluetooth 5.3 with multipoint connection",
//       "Foldable design with premium carrying case",
//       "Hi-Res Audio certification",
//       "Built-in microphone with echo cancellation"
//     ],
//     specifications: [
//       { label: "Model", value: "ATH-M50xBT3 Pro", highlight: true },
//       { label: "Driver", value: "45mm diameter", highlight: false },
//       { label: "Frequency Response", value: "5 - 40,000 Hz", highlight: false },
//       { label: "Battery Life", value: "40 hours (ANC on)", highlight: true },
//       { label: "Charging Time", value: "1.5 hours (fast charge)", highlight: false },
//       { label: "Weight", value: "285g", highlight: false },
//       { label: "Bluetooth Version", value: "5.3", highlight: false },
//       { label: "Water Resistance", value: "IPX4", highlight: false },
//       { label: "Microphone", value: "Built-in with noise reduction", highlight: false },
//       { label: "Wireless Range", value: "10 meters", highlight: false }
//     ],
//     variants: [
//       {
//         id: "var_001",
//         color: { 
//           name: "Matte Black", 
//           hex: "#1a1a1a", 
//           image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" 
//         },
//         size: "Standard",
//         price: 249.99,
//         stock: 45
//       },
//       {
//         id: "var_002",
//         color: { 
//           name: "Silver", 
//           hex: "#c0c0c0", 
//           image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w-400&h=400&fit=crop" 
//         },
//         size: "Standard",
//         price: 249.99,
//         stock: 28
//       },
//       {
//         id: "var_003",
//         color: { 
//           name: "Navy Blue", 
//           hex: "#000080", 
//           image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop" 
//         },
//         size: "Standard",
//         price: 249.99,
//         stock: 15
//       },
//       {
//         id: "var_004",
//         color: { 
//           name: "Deep Red", 
//           hex: "#8b0000", 
//           image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=400&fit=crop" 
//         },
//         size: "Standard",
//         price: 249.99,
//         stock: 8
//       },
//       {
//         id: "var_005",
//         color: { 
//           name: "Forest Green", 
//           hex: "#228b22", 
//           image: "https://images.unsplash.com/photo-1585298725525-8ef77c8c8dbb?w=400&h=400&fit=crop" 
//         },
//         size: "Standard",
//         price: 259.99,
//         stock: 0
//       }
//     ],
//     images: [
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop",
//       "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=1200&fit=crop",
//       "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=1200&fit=crop",
//       "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=1200&fit=crop",
//       "https://images.unsplash.com/photo-1585298725525-8ef77c8c8dbb?w=1200&h=1200&fit=crop"
//     ],
//     reviews: [
//       {
//         id: "rev_001",
//         author: "Alex Johnson",
//         initials: "AJ",
//         rating: 5,
//         date: "2 weeks ago",
//         comment: "These headphones are absolutely fantastic! The noise cancellation is incredible - I can't hear anything around me when I'm working. Battery life is as advertised, and the sound quality is superb for both music and calls. The quick charge feature saved me during my last trip. Highly recommended!",
//         verified: true
//       },
//       {
//         id: "rev_002",
//         author: "Maria Garcia",
//         initials: "MG",
//         rating: 4,
//         date: "1 month ago",
//         comment: "Great headphones overall. Comfortable for long sessions (wore them for 8 hours straight) and the sound quality is excellent. My only minor complaint is that the touch controls can be a bit sensitive sometimes. But definitely worth the price!",
//         verified: true
//       },
//       {
//         id: "rev_003",
//         author: "David Chen",
//         initials: "DC",
//         rating: 5,
//         date: "3 months ago",
//         comment: "I travel frequently for work and these have been a game-changer. The case is sturdy, battery lasts through long flights, and the noise cancellation makes airport lounges bearable. Best purchase I've made this year! The multipoint connection is perfect for switching between laptop and phone.",
//         verified: false
//       },
//       {
//         id: "rev_004",
//         author: "Sarah Miller",
//         initials: "SM",
//         rating: 4,
//         date: "2 months ago",
//         comment: "Very happy with this purchase. The audio quality is crisp and clear across all frequencies. They're comfortable enough to wear for hours without fatigue. The quick charge feature is super convenient when I forget to charge overnight - 15 minutes gives me 5 hours of playback!",
//         verified: true
//       },
//       {
//         id: "rev_005",
//         author: "James Wilson",
//         initials: "JW",
//         rating: 5,
//         date: "1 week ago",
//         comment: "Perfect for both work and entertainment. The noise cancellation helps me focus in open offices, and the sound quality for music is phenomenal. The battery life is incredible - I only charge once a week with daily use.",
//         verified: true
//       }
//     ],
//     stock: 96,
//     isNew: true,
//     isBestSeller: true,
//     sku: "AUDIO-PRO-2024",
//     tags: ["wireless", "noise-cancelling", "premium", "bluetooth", "hi-res", "travel"],
//     shippingInfo: {
//       freeShipping: true,
//       estimatedDelivery: "2-3 business days",
//       returnPolicy: "30-day return policy with free returns"
//     }
//   };
// }

// export default async function ProductPage({ 
//   params 
// }: { 
//   params: { handle: string } 
// }) {
//   // Fetch product data using fake API
//   const product = await fetchProductData(params.handle);
  
//   return <ProductDetail product={product} />;
// }






// app/product/[handle]/page.tsx
import ProductDetail from "@/app/components/Product/ProductDetail";

// Fake API function - simulates fetching product data matching Prisma schema
async function fetchProductData(handle: string) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Sample product data matching Prisma schema structure
  return {
    id: `prod_${handle}`,
    name: "Premium Wireless Headphones Pro",
    description: "Experience premium sound quality with our Advanced Wireless Headphones Pro. Featuring industry-leading active noise cancellation, 40-hour battery life with quick charge, and ultra-comfortable memory foam ear cushions. Perfect for work, travel, and entertainment. Includes carrying case and 3.5mm audio cable.",
    slug: handle,
    vendor: "AudioTech",
    tags: ["wireless", "noise-cancelling", "premium", "bluetooth", "hi-res", "travel"],
    availableForSale: true,
    sku: "AUDIO-PRO-2024",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-03-20T14:45:00Z",
    images: [
      {
        id: "img_001",
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=1200&fit=crop"
      },
      {
        id: "img_002",
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&h=1200&fit=crop"
      },
      {
        id: "img_003",
        url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=1200&fit=crop"
      },
      {
        id: "img_004",
        url: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=1200&fit=crop"
      },
      {
        id: "img_005",
        url: "https://images.unsplash.com/photo-1585298725525-8ef77c8c8dbb?w=1200&h=1200&fit=crop"
      }
    ],
    variants: [
      {
        id: "var_001",
        name: "Matte Black - Standard",
        price: 249.99,
        quantity: 45,
        availableForSale: true,
        variantOptions: [
          {
            id: "opt_001",
            optionValue: {
              id: "val_001",
              value: "Matte Black",
              option: {
                id: "opt_color",
                name: "Color",
                values: []
              }
            }
          },
          {
            id: "opt_002",
            optionValue: {
              id: "val_006",
              value: "Standard",
              option: {
                id: "opt_size",
                name: "Size",
                values: []
              }
            }
          }
        ]
      },
      {
        id: "var_002",
        name: "Silver - Standard",
        price: 249.99,
        quantity: 28,
        availableForSale: true,
        variantOptions: [
          {
            id: "opt_003",
            optionValue: {
              id: "val_002",
              value: "Silver",
              option: {
                id: "opt_color",
                name: "Color",
                values: []
              }
            }
          },
          {
            id: "opt_004",
            optionValue: {
              id: "val_006",
              value: "Standard",
              option: {
                id: "opt_size",
                name: "Size",
                values: []
              }
            }
          }
        ]
      },
      {
        id: "var_003",
        name: "Navy Blue - Standard",
        price: 249.99,
        quantity: 15,
        availableForSale: true,
        variantOptions: [
          {
            id: "opt_005",
            optionValue: {
              id: "val_003",
              value: "Navy Blue",
              option: {
                id: "opt_color",
                name: "Color",
                values: []
              }
            }
          },
          {
            id: "opt_006",
            optionValue: {
              id: "val_006",
              value: "Standard",
              option: {
                id: "opt_size",
                name: "Size",
                values: []
              }
            }
          }
        ]
      },
      {
        id: "var_004",
        name: "Deep Red - Standard",
        price: 249.99,
        quantity: 8,
        availableForSale: true,
        variantOptions: [
          {
            id: "opt_007",
            optionValue: {
              id: "val_004",
              value: "Deep Red",
              option: {
                id: "opt_color",
                name: "Color",
                values: []
              }
            }
          },
          {
            id: "opt_008",
            optionValue: {
              id: "val_006",
              value: "Standard",
              option: {
                id: "opt_size",
                name: "Size",
                values: []
              }
            }
          }
        ]
      },
      {
        id: "var_005",
        name: "Forest Green - Standard",
        price: 259.99,
        quantity: 0,
        availableForSale: false,
        variantOptions: [
          {
            id: "opt_009",
            optionValue: {
              id: "val_005",
              value: "Forest Green",
              option: {
                id: "opt_color",
                name: "Color",
                values: []
              }
            }
          },
          {
            id: "opt_010",
            optionValue: {
              id: "val_006",
              value: "Standard",
              option: {
                id: "opt_size",
                name: "Size",
                values: []
              }
            }
          }
        ]
      }
    ],
    options: [
      {
        id: "opt_color",
        name: "Color",
        values: [
          {
            id: "val_001",
            value: "Matte Black",
            option: {
              id: "opt_color",
              name: "Color",
              values: []
            }
          },
          {
            id: "val_002",
            value: "Silver",
            option: {
              id: "opt_color",
              name: "Color",
              values: []
            }
          },
          {
            id: "val_003",
            value: "Navy Blue",
            option: {
              id: "opt_color",
              name: "Color",
              values: []
            }
          },
          {
            id: "val_004",
            value: "Deep Red",
            option: {
              id: "opt_color",
              name: "Color",
              values: []
            }
          },
          {
            id: "val_005",
            value: "Forest Green",
            option: {
              id: "opt_color",
              name: "Color",
              values: []
            }
          }
        ]
      },
      {
        id: "opt_size",
        name: "Size",
        values: [
          {
            id: "val_006",
            value: "Standard",
            option: {
              id: "opt_size",
              name: "Size",
              values: []
            }
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev_001",
        rating: 5,
        title: "Absolutely fantastic!",
        body: "These headphones are absolutely fantastic! The noise cancellation is incredible - I can't hear anything around me when I'm working. Battery life is as advertised, and the sound quality is superb for both music and calls. The quick charge feature saved me during my last trip. Highly recommended!",
        isVerifiedPurchase: true,
        status: "approved" as const,
        helpfulVotes: 24,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
        user: {
          firstName: "Alex",
          lastName: "Johnson",
          email: "alex.johnson@example.com"
        }
      },
      {
        id: "rev_002",
        rating: 4,
        title: "Great headphones overall",
        body: "Great headphones overall. Comfortable for long sessions (wore them for 8 hours straight) and the sound quality is excellent. My only minor complaint is that the touch controls can be a bit sensitive sometimes. But definitely worth the price!",
        isVerifiedPurchase: true,
        status: "approved" as const,
        helpfulVotes: 12,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 1 month ago
        user: {
          firstName: "Maria",
          lastName: "Garcia",
          email: "maria.garcia@example.com"
        }
      },
      {
        id: "rev_003",
        rating: 5,
        title: "Game-changer for travel",
        body: "I travel frequently for work and these have been a game-changer. The case is sturdy, battery lasts through long flights, and the noise cancellation makes airport lounges bearable. Best purchase I've made this year! The multipoint connection is perfect for switching between laptop and phone.",
        isVerifiedPurchase: false,
        status: "approved" as const,
        helpfulVotes: 18,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 3 months ago
        user: {
          firstName: "David",
          lastName: "Chen",
          email: "david.chen@example.com"
        }
      },
      {
        id: "rev_004",
        rating: 4,
        title: "Very happy with this purchase",
        body: "Very happy with this purchase. The audio quality is crisp and clear across all frequencies. They're comfortable enough to wear for hours without fatigue. The quick charge feature is super convenient when I forget to charge overnight - 15 minutes gives me 5 hours of playback!",
        isVerifiedPurchase: true,
        status: "approved" as const,
        helpfulVotes: 8,
        createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 2 months ago
        user: {
          firstName: "Sarah",
          lastName: "Miller",
          email: "sarah.miller@example.com"
        }
      },
      {
        id: "rev_005",
        rating: 5,
        title: "Perfect for work and entertainment",
        body: "Perfect for both work and entertainment. The noise cancellation helps me focus in open offices, and the sound quality for music is phenomenal. The battery life is incredible - I only charge once a week with daily use.",
        isVerifiedPurchase: true,
        status: "approved" as const,
        helpfulVotes: 32,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
        user: {
          firstName: "James",
          lastName: "Wilson",
          email: "james.wilson@example.com"
        }
      }
    ],
    aggregate: {
      averageRating: 4.7,
      reviewCount: 1287,
      ratingDistribution: {
        "1": 12,
        "2": 25,
        "3": 89,
        "4": 415,
        "5": 746
      }
    },
    category: {
      id: "cat_electronics",
      name: "Electronics",
      slug: "electronics"
    }
  };
}

// Optional: Fetch wishlist status from your API
async function fetchWishlistStatus(productId: string): Promise<boolean> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 50));
  return false; // Default to not wishlisted
}

// Optional: Mock handlers for actions
const handleWishlistToggle = async () => {
  // In real implementation, this would call your API to toggle FavoriteProduct
  console.log("Toggling wishlist");
  // Example API call:
  // await fetch(`/api/wishlist/${productId}`, { method: 'POST' });
};

const handleAddToCart = async (variantId: string, quantity: number) => {
  // In real implementation, this would call your API to add to Cart/CartItem
  console.log(`Adding ${quantity} of variant ${variantId} to cart`);
  // Example API call:
  // await fetch('/api/cart', {
  //   method: 'POST',
  //   body: JSON.stringify({ variantId, quantity })
  // });
};

export default async function ProductPage({ 
  params 
}: { 
  params: { handle: string } 
}) {
  // Fetch product data using fake API
  const product = await fetchProductData(params.handle);
  
  // Optionally fetch wishlist status
  const isWishlisted = await fetchWishlistStatus(product.id);
  
  return (
    <ProductDetail 
      product={product} 
      isWishlisted={isWishlisted}
      onWishlistToggle={handleWishlistToggle}
      onAddToCart={handleAddToCart}
      shippingInfo={{
        freeShipping: true,
        estimatedDelivery: "2-3 business days",
        returnPolicy: "30-day return policy with free returns"
      }}
    />
  );
}