"use client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Product } from "@lib/prisma";
import { useSession } from "next-auth/react";
import { toggleFavourite } from "@lib/actions/actions";

export default function ToggleFavoriteButton({
  product,
  // isFavorited,
  className,
}: {
  product: Product;
  // isFavorited: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data: session } = useSession();
  const isFavorited = product.favoritedBy.length > 0;
  return (
    <button
      aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
      disabled={isPending || !session}
      title={!session ? "Please sign in to save favorites" : undefined}
      className={`p-2 rounded-full shadow-md transition-colors duration-300 ${
        isFavorited
          ? "bg-primary-100 hover:bg-primary-200"
          : "bg-primary-0/80 hover:bg-primary-0"
      } ${className}`}
      onClick={() => {
        if (!session) return;

        startTransition(async () => {
          const error = await toggleFavourite(null, {
            productId: product.id,
            isCurrentlyFavorited: isFavorited,
          });

          if (error) {
            throw new Error(error.toString());
          }

          router.refresh();
        });
      }}
    >
      <svg
        className={`h-5 w-5 ${
          isFavorited ? "text-primary-900 fill-primary-900" : "text-primary-900"
        }`}
        stroke="currentColor"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    </button>
  );
}
