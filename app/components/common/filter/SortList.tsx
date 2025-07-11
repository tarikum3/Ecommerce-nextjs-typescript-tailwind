"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SortFilterItem } from "lib/const";

export default function SortList({
  list,
  title = "Sort by",
}: {
  list: SortFilterItem[];
  title?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentSort = searchParams.get("sort");
  const currentOrder = searchParams.get("order");

  // Find the current active sort option
  const activeItem =
    list.find(
      (item) =>
        item.slug === currentSort && item.reverse === (currentOrder === "desc")
    ) || list[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSort = (item: SortFilterItem) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (!item.slug) {
      newParams.delete("sort");
      newParams.delete("order");
    } else {
      newParams.set("sort", item.slug);
      newParams.set("order", item.reverse ? "desc" : "asc");
    }

    router.push(`?${newParams.toString()}`, { scroll: false });
    setOpenSelect(false);
  };

  return (
    <div className="relative" ref={ref}>
      <label className="sr-only">{title}</label>
      <button
        onClick={() => setOpenSelect(!openSelect)}
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-primary-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-sm text-left"
      >
        <div className="flex items-center justify-between pr-2">
          <span>{activeItem.title}</span>
          <svg
            className={`h-4 w-4 transition-transform ${
              openSelect ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {openSelect && (
        <div className="absolute z-10 mt-1 w-full bg-primary-0 shadow-lg rounded-sm border border-primary-300">
          <ul className="py-1">
            {list.map((item) => (
              <li key={item.title}>
                <button
                  onClick={() => handleSort(item)}
                  className={`block w-full text-left pl-3 pr-10 py-2 text-base hover:bg-primary-100 transition-colors ${
                    activeItem.title === item.title
                      ? "bg-primary-100 font-medium"
                      : ""
                  }`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
