interface WishlistIconProps {
    count: number;
  }
  
  export default function WishlistIcon({ count }: WishlistIconProps) {
    return (
      <button className="p-2 text-gray-500 hover:text-primary-500 transition-colors rounded-full hover:bg-gray-100 relative">
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {count}
        </span>
      </button>
    );
  }