export interface HeroContent {
  badge: {
    text: string;
    show: boolean;
  };
  title: {
    part1: string;
    highlighted: string;
    part2: string;
  };
  description: string;
  buttons: {
    primary: {
      text: string;
      href: string;
    };
    secondary: {
      text: string;
      href: string;
    };
  };
  stats: {
    value: string;
    label: string;
  }[];
}

export interface HeroFeature {
  position: "bottom-left" | "top-right";
  icon: "shipping" | "security" | "support" | "return";
  title: string;
  description: string;
  delay: number;
  show: boolean;
}

export interface HeroVisual {
  mainImage: string;
  badge: {
    text: string;
    show: boolean;
  };
  features: HeroFeature[];
}

export interface HeroConfig {
  content: HeroContent;
  visual: HeroVisual;
}