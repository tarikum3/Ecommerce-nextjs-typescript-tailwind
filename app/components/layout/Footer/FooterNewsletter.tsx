// components/FooterNewsletter.tsx
import { FooterNewsletter as FooterNewsletterType } from "@/app/types/footer";

interface FooterNewsletterProps {
  newsletter: FooterNewsletterType;
}

export default function FooterNewsletter({ newsletter }: FooterNewsletterProps) {
  const { title, description, placeholder, buttonText } = newsletter;

  return (
    <div className="mt-16 md:mt-16 xl:mt-0">
      <h3 className="text-sm font-medium text-gray-900">{title}</h3>
      <p className="mt-6 text-sm text-gray-500">{description}</p>
      <form className="mt-2 flex sm:max-w-md">
        <input 
          id="email-address" 
          type="email" 
          required 
          autoComplete="email" 
          aria-label="Email address" 
          placeholder={placeholder}
          className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        />
        <div className="ml-4 flex-shrink-0">
          <button 
            type="submit" 
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors"
          >
            {buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}