import Link from "next/link";

export default function MobileMenuFooter() {
  return (
    <div className="border-t border-gray-200">
      <div className="space-y-6 px-4 py-6">
        <div className="flow-root">
          <Link href="#" className="-m-2 block p-2 font-medium text-gray-900 hover:text-primary-600 transition-colors">
            Company
          </Link>
        </div>
        <div className="flow-root">
          <Link href="#" className="-m-2 block p-2 font-medium text-gray-900 hover:text-primary-600 transition-colors">
            Stores
          </Link>
        </div>
      </div>

      <div className="space-y-6 border-t border-gray-200 px-4 py-6">
        <div className="flow-root">
          <Link href="#" className="-m-2 block p-2 font-medium text-gray-900 hover:text-primary-600 transition-colors">
            Sign in
          </Link>
        </div>
        <div className="flow-root">
          <Link href="#" className="-m-2 block p-2 font-medium text-gray-900 hover:text-primary-600 transition-colors">
            Create account
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 px-4 py-6">
        <Link href="#" className="-m-2 flex items-center p-2">
          <img 
            src="https://tailwindcss.com/plus-assets/img/flags/flag-canada.svg" 
            alt="Canadian Flag" 
            className="block h-auto w-5 flex-shrink-0"
          />
          <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
          <span className="sr-only">, change currency</span>
        </Link>
      </div>
    </div>
  );
}