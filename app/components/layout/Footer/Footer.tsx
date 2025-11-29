// components/Footer.tsx
import { FooterConfig } from "@/app/types/footer";
import FooterContent from "./FooterContent";

interface FooterProps {
  data?: FooterConfig;
}

export default function Footer({ data }: FooterProps) {
  const footerConfig = data || defaultFooterData;

  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <FooterContent content={footerConfig} />
    </footer>
  );
}

// Default data fallback
const defaultFooterData: FooterConfig = {
  sections: [
    {
      title: "Shop",
      links: [
        { text: "Bags", href: "/bags" },
        { text: "Tees", href: "/tees" },
        { text: "Objects", href: "/objects" },
        { text: "Home Goods", href: "/home-goods" },
        { text: "Accessories", href: "/accessories" }
      ]
    },
    {
      title: "Company",
      links: [
        { text: "Who we are", href: "/about" },
        { text: "Sustainability", href: "/sustainability" },
        { text: "Press", href: "/press" },
        { text: "Careers", href: "/careers" },
        { text: "Terms & Conditions", href: "/terms" },
        { text: "Privacy", href: "/privacy" }
      ]
    },
    {
      title: "Account",
      links: [
        { text: "Manage Account", href: "/account" },
        { text: "Returns & Exchanges", href: "/returns" },
        { text: "Redeem a Gift Card", href: "/gift-cards" }
      ]
    },
    {
      title: "Connect",
      links: [
        { text: "Contact Us", href: "/contact" },
        { text: "Facebook", href: "https://facebook.com" },
        { text: "Instagram", href: "https://instagram.com" },
        { text: "Pinterest", href: "https://pinterest.com" }
      ]
    }
  ],
  newsletter: {
    title: "Sign up for our newsletter",
    description: "The latest deals and savings, sent to your inbox weekly.",
    placeholder: "Email address",
    buttonText: "Sign up"
  },
  copyright: "Copyright © 2023 StyleHub, Inc."
};