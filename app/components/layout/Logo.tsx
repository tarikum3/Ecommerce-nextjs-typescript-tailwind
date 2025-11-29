import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center space-x-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
          <span className="text-white font-bold text-sm">SH</span>
        </div>
        <span className="text-xl font-bold text-gray-900">StyleHub</span>
      </Link>
    </div>
  );
}