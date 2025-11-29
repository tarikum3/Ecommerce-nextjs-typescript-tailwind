"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FavoriteItem {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: string;
  rating: number;
}

interface FavoritesSectionProps {
  title?: string;
  description?: string;
  items?: FavoriteItem[];
}

export default function FavoritesSection({ 
  title = "Our Favorites", 
  description = "Discover the most loved products from our collection, handpicked by our community of fashion enthusiasts.",
  items = defaultFavorites
}: FavoritesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 hero-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-6 h-6 rounded-full bg-primary-500 opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-10 h-10 rounded-full bg-primary-600 opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-1/4 w-8 h-8 rounded-full bg-primary-500 opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Favorites Content */}
          <div className={`lg:w-1/2 mb-12 lg:mb-0 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-600 border border-primary-200 mb-6">
              <span className="h-2 w-2 rounded-full bg-primary-500 mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">Customer Favorites</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              {title.split(' ')[0]}
              <span className="bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-text text-transparent"> {title.split(' ').slice(1).join(' ')}</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
              {description}
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#" className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg font-semibold text-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                Shop All Favorites
              </Link>
              <Link href="#" className="px-8 py-3 border border-gray-300 rounded-lg font-semibold text-center hover:bg-gray-50 transition-colors">
                View Lookbook
              </Link>
            </div>
            
            <div className="mt-12 flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">98%</div>
                <div className="text-sm text-gray-500">Would Recommend</div>
              </div>
            </div>
          </div>
          
          {/* Favorites Visual */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10">
              {/* Main favorites grid */}
              <div className="grid grid-cols-2 gap-4">
                {items.map((item, index) => (
                  <FavoriteCard 
                    key={item.id}
                    item={item}
                    isLarge={index === items.length - 1} // Make last item span full width
                  />
                ))}
              </div>
              
              {/* Floating card 1 */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-4 max-w-xs animate-float">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Most Loved</div>
                    <div className="text-sm text-gray-500">Based on customer reviews</div>
                  </div>
                </div>
              </div>
              
              {/* Floating card 2 */}
              <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-2xl p-4 max-w-xs animate-float" style={{ animationDelay: '2s' }}>
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Top Rated</div>
                    <div className="text-sm text-gray-500">4.9/5 average rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Favorite Card Component
function FavoriteCard({ item, isLarge = false }: { item: FavoriteItem, isLarge?: boolean }) {
  return (
    <div className={`group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${isLarge ? 'col-span-2' : ''}`}>
      <img 
        src={item.image} 
        alt={item.name} 
        className={`w-full ${isLarge ? 'h-48' : 'h-64'} object-cover group-hover:scale-105 transition-transform duration-500`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
        <h3 className="text-white font-semibold text-lg">{item.name}</h3>
        <p className="text-white/80">{item.price}</p>
      </div>
      
      {/* Rating stars */}
      <div className="absolute top-4 left-4 flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i}
            className={`h-4 w-4 ${i < Math.floor(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      {/* Favorite badge */}
      {item.badge && (
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full py-1 px-3 border border-white/20">
          <span className="text-xs font-semibold text-white">{item.badge}</span>
        </div>
      )}
    </div>
  );
}

// Default data
const defaultFavorites: FavoriteItem[] = [
  {
    id: '1',
    name: 'Black Basic Tee',
    price: '$32.00',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-01.jpg',
    badge: 'Bestseller',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Off-White Basic Tee',
    price: '$32.00',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-02.jpg',
    badge: 'Trending',
    rating: 4.7
  },
  {
    id: '3',
    name: 'Mountains Artwork Tee',
    price: '$36.00',
    image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-favorite-03.jpg',
    badge: 'New',
    rating: 4.8
  }
];