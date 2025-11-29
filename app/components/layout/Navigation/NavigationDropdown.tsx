"use client";

import { useState } from "react";
import Link from "next/link";

interface NavigationDropdownProps {
  label: string;
  items: string[];
}

export default function NavigationDropdown({
  label,
  items,
}: NavigationDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="nav-link text-gray-700 hover:text-primary-600 font-medium flex items-center transition-colors">
        {label}
        <svg
          className="ml-1 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-xl transition-all duration-300 z-50 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible"
        }`}
      >
        <div className="py-2">
          {items.map((item) => (
            <Link
              key={item}
              href="#"
              className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}