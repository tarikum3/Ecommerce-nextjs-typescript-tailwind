// types/featured.ts
export interface FeaturedConfig {
    heading: string;
    description: string;
    cta: {
      text: string;
      href: string;
    };
    background: {
      image: string;
      overlay: boolean;
    };
  }
  
  export const defaultFeaturedData: FeaturedConfig = {
    heading: "Long-term thinking",
    description: "We're committed to responsible, sustainable, and ethical manufacturing. Our small-scale approach allows us to focus on quality and reduce our impact. We're doing our best to delay the inevitable heat-death of the universe.",
    cta: {
      text: "Read our story",
      href: "/story"
    },
    background: {
      image: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-feature-section-full-width.jpg",
      overlay: true
    }
  };