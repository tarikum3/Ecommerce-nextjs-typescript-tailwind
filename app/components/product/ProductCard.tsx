// "use client";
// import { FC } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import usePrice from "@/lib/use-price";
// import { Product } from "@lib/prisma";

// interface Props {
//   //product: Product;
//   product: Product;
//   imageProps?: React.ComponentProps<typeof Image>;
//   linkProps?: Partial<React.ComponentProps<typeof Link>>;
// }

// const placeholderImg = "/product-img-placeholder.svg";

// const ProductCard: FC<Props> = ({ product, imageProps, linkProps }) => {
//   const { price } = usePrice({
//     amount: product.price!.amount,
//     currencyCode: product.price!.currency!,
//   });
//   //console.log("productsnewwwfront", product);
//   return (
//     <Link
//       href={`/product/${product.slug}`}
//       className="relative w-full bg-primary-100 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out overflow-hidden cursor-pointer"
//       aria-label={product.name}
//       {...linkProps}
//     >
//       {/* Image Section */}
//       <div className="relative block overflow-hidden rounded-t-lg min-h-[400px]">
//         <Image
//           alt={product.name || "Product Image"}
//           src={product.images[0]?.url}
//           // width={540}
//           // height={540}
//           quality="85"
//           fill
//           sizes="(min-width: 768px) 33vw, 100vw"
//           style={{
//             objectFit: "contain", // cover, contain, none
//           }}
//           {...imageProps}
//         />
//       </div>

//       {/* Content Section */}
//       <div className="p-5 bg-primary-100 rounded-b-lg">
//         {/* Product Name */}
//         <h3 className="text-primary-900 text-base md:text-lg font-medium mb-1 leading-tight line-clamp-1">
//           {product.name}
//         </h3>

//         {/* Price */}
//         <div className="text-primary-600 text-sm md:text-md font-semibold mt-2">
//           {`${price} ${product.price?.currency}`}
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import usePrice from "@/lib/use-price";
import { Product } from "@lib/prisma";
import { AddToCart } from "@/app/components/cart/AddToCart";
import ToggleFavoriteButton from "@/app/components/common/ToggleFavoriteButton";
interface Props {
  product: Product;
  imageProps?: React.ComponentProps<typeof Image>;
  linkProps?: Partial<React.ComponentProps<typeof Link>>;
}

const placeholderImg = "/product-img-placeholder.svg";

const ProductCard: FC<Props> = ({ product, imageProps, linkProps }) => {
  const { price } = usePrice({
    amount: product.price!.amount,
    currencyCode: product.price!.currency!,
  });

  return (
    <Link
      href={`/product/${product.slug}`}
      aria-label={product.name}
      {...linkProps}
    >
      <div className="product-card bg-primary-0 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="aspect-square bg-primary-50 relative overflow-hidden">
          <Image
            alt={product.name || "Product Image"}
            src={product.images[0]?.url || placeholderImg}
            fill
            quality="85"
            className="object-cover object-center transition-transform duration-500 hover:scale-105"
            sizes="(min-width: 768px) 33vw, 100vw"
            {...imageProps}
          />
          <div className="absolute top-4 right-4">
            <button className="p-2 bg-primary-0/80 rounded-full shadow-md hover:bg-primary-0 transition-colors duration-300">
              <svg
                className="h-5 w-5 text-primary-900"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-primary-900">
                <Link href={`/product/${product.slug}`} {...linkProps}>
                  {product.name}
                </Link>
              </h3>
              {/* <p className="mt-1 text-sm text-primary-500">
              {product.category?.name || "Product"}
            </p> */}
            </div>
            <p className="text-sm font-medium text-primary-900">{price}</p>
          </div>
          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              <svg
                className="text-yellow-400 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs text-primary-500 ml-1">4.8 (32)</span>
            </div>
          </div>

          <AddToCart
            className="mt-4 w-full bg-primary-900 text-primary-0 py-2 px-4 rounded-sm text-sm font-medium hover:bg-primary-800 transition-colors duration-300"
            variants={product.variants}
            availableForSale={product.availableForSale}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
