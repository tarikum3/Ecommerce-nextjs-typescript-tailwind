// import { FC } from "react";
// import Link from "next/link";
// import { Github } from "@/app/components/icons";
// import { Logo } from "@/app/components";

// const links = [
//   {
//     name: "Privacy Policy",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/privacy-policy`,
//   },
//   {
//     name: "About",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/about`,
//   },
//   {
//     name: "Terms of use",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/terms-of-use`,
//   },
//   {
//     name: "shipping ",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/shipping`,
//   },
// ];

// const Footer: FC = () => {
//   return (
//     <footer
//       //className={rootClassName}
//       className=" bg-primary-100 p-4 h-min-[50vh] "
//     >
//       <div className="  grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 md:text-left h-full  ">
//         <div className="  p-4 flex flex-col justify-center ">
//           <Link
//             href="/"
//             className="  flex flex-initial items-center justify-center  font-bold  "
//           >
//             <span className="rounded-full border border-primary-900 mr-2">
//               <Logo />
//             </span>
//             <span>Modalinda</span>
//           </Link>
//         </div>

//         <div className="flex flex-col flex-initial items-center md:items-start  px-4  mt-20  ">
//           <span className="font-semibold tracking-widest uppercase text-primary-900  text-sm ">
//             platform
//           </span>
//           {/* {[...links, ...sitePages].map((page) => ( */}
//           {[...links].map((page) => (
//             <span key={page.url} className="mt-5 ">
//               <Link
//                 href={page.url!}
//                 className="font-medium tracking-normal  text-primary-900 text-sm  hover:text-primary-500 transition ease-in-out duration-150"
//               >
//                 {page.name}
//               </Link>
//             </span>
//           ))}
//         </div>

//         <div className="flex flex-col flex-initial items-center md:items-start px-4 mt-20   ">
//           <span className="font-bold tracking-widest uppercase text-primary-900  text-sm">
//             contact
//           </span>

//           <span className="font-medium  text-primary-900 mt-5 text-sm ">
//             tarikum3@gmail.com
//           </span>
//         </div>
//         <div className="flex flex-col flex-initial  items-center md:items-start  px-4 mt-20   ">
//           <span className="font-bold tracking-widest uppercase text-primary-900  text-sm">
//             support
//           </span>
//           <a
//             className="flex flex-initial justify-center items-center mt-5"
//             aria-label="Github Repository"
//             href="https://github.com/tarikum3/Ecommerce-nextjs-typescript-tailwind"
//           >

//             <Github />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// import { FC } from "react";
// import Link from "next/link";
// import { Github } from "@/app/components/icons";
// import { Logo } from "@/app/components";

// const links = [
//   {
//     name: "Privacy Policy",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/privacy-policy`,
//   },
//   {
//     name: "About",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/about`,
//   },
//   {
//     name: "Terms of use",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/terms-of-use`,
//   },
//   {
//     name: "Shipping",
//     url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/shipping`,
//   },
// ];

// const Footer: FC = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300">
//       <div className="max-w-7xl mx-auto px-6 py-16">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//           <div className="col-span-2">
//             <h3 className="text-lg font-serif font-medium text-primary-0 mb-6">
//               <Link href="/" className="flex items-center">
//                 <span className="rounded-full border border-gray-300 mr-2">
//                   <Logo className="text-primary-0" />
//                 </span>
//                 <span>Modalinda</span>
//               </Link>
//             </h3>
//             <p className="text-sm text-gray-400 mb-6 leading-relaxed">
//               Your premier destination for fashion and style. We bring you the
//               latest trends with exceptional quality.
//             </p>
//             <div className="flex space-x-6">
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-primary-0 transition-colors duration-300"
//               >
//                 <span className="sr-only">Instagram</span>
//                 <svg
//                   className="h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748 1.857.344.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-primary-0 transition-colors duration-300"
//               >
//                 <span className="sr-only">Twitter</span>
//                 <svg
//                   className="h-5 w-5"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
//                 </svg>
//               </a>
//               <a
//                 href="https://github.com/tarikum3/Ecommerce-nextjs-typescript-tailwind"
//                 className="text-gray-400 hover:text-primary-0 transition-colors duration-300"
//               >
//                 <span className="sr-only">GitHub</span>
//                 <Github className="h-5 w-5" />
//               </a>
//             </div>
//           </div>
//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-0">
//               Shop
//             </h3>
//             <ul className="mt-4 space-y-4">
//               <li>
//                 <Link
//                   href="/women"
//                   className="text-sm text-gray-400 hover:text-primary-0 transition-colors duration-300"
//                 >
//                   Women
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/men"
//                   className="text-sm text-gray-400 hover:text-primary-0 transition-colors duration-300"
//                 >
//                   Men
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/accessories"
//                   className="text-sm text-gray-400 hover:text-primary-0 transition-colors duration-300"
//                 >
//                   Accessories
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/new-arrivals"
//                   className="text-sm text-gray-400 hover:text-primary-0 transition-colors duration-300"
//                 >
//                   New Arrivals
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/sale"
//                   className="text-sm text-gray-400 hover:text-primary-0 transition-colors duration-300"
//                 >
//                   Sale
//                 </Link>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-0">
//               Company
//             </h3>
//             <ul className="mt-4 space-y-4">
//               {links.map((page) => (
//                 <li key={page.url}>
//                   <Link
//                     href={page.url}
//                     className="text-sm text-gray-400 hover:text-primary-0 transition-colors duration-300"
//                   >
//                     {page.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//         <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
//           <p className="text-sm text-gray-400">
//             &copy; {new Date().getFullYear()} Modalinda. All rights reserved.
//           </p>
//           <div className="mt-4 md:mt-0 flex space-x-6">
//             <img
//               src="https://tailwindui.com/img/logos/visa.svg"
//               alt="Visa"
//               className="h-8"
//             />
//             <img
//               src="https://tailwindui.com/img/logos/mastercard.svg"
//               alt="Mastercard"
//               className="h-8"
//             />
//             <img
//               src="https://tailwindui.com/img/logos/amex.svg"
//               alt="American Express"
//               className="h-8"
//             />
//             <img
//               src="https://tailwindui.com/img/logos/paypal.svg"
//               alt="PayPal"
//               className="h-8"
//             />
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { FC } from "react";
import Link from "next/link";
import { Github } from "@/app/components/icons";
import { Logo } from "@/app/components";

const links = [
  {
    name: "Privacy Policy",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/privacy-policy`,
  },
  {
    name: "About",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/about`,
  },
  {
    name: "Terms of use",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/terms-of-use`,
  },
  {
    name: "Shipping",
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/shipping`,
  },
];

const Footer: FC = () => {
  return (
    <footer className="bg-primary-900 text-primary-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h3 className="text-lg font-serif font-medium text-primary-0 mb-6">
              <Link href="/" className="flex items-center">
                <span className="rounded-full border border-primary-300 mr-2">
                  <Logo className="text-primary-0" />
                </span>
                <span>Modalinda</span>
              </Link>
            </h3>
            <p className="text-sm text-primary-400 mb-6 leading-relaxed">
              Your premier destination for fashion and style. We bring you the
              latest trends with exceptional quality.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-primary-400 hover:text-primary-0 transition-colors duration-300"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748 1.857.344.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-primary-400 hover:text-primary-0 transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="https://github.com/tarikum3/Ecommerce-nextjs-typescript-tailwind"
                className="text-primary-400 hover:text-primary-0 transition-colors duration-300"
              >
                <span className="sr-only">GitHub</span>
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-0">
              Shop
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link
                  href="/women"
                  className="text-sm text-primary-400 hover:text-primary-0 transition-colors duration-300"
                >
                  Women
                </Link>
              </li>
              <li>
                <Link
                  href="/men"
                  className="text-sm text-primary-400 hover:text-primary-0 transition-colors duration-300"
                >
                  Men
                </Link>
              </li>
              <li>
                <Link
                  href="/accessories"
                  className="text-sm text-primary-400 hover:text-primary-0 transition-colors duration-300"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/new-arrivals"
                  className="text-sm text-primary-400 hover:text-primary-0 transition-colors duration-300"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/sale"
                  className="text-sm text-primary-400 hover:text-primary-0 transition-colors duration-300"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-primary-0">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              {links.map((page) => (
                <li key={page.url}>
                  <Link
                    href={page.url}
                    className="text-sm text-primary-400 hover:text-primary-0 transition-colors duration-300"
                  >
                    {page.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-primary-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-primary-400">
            &copy; {new Date().getFullYear()} Modalinda. All rights reserved.
          </p>
          {/* <div className="mt-4 md:mt-0 flex space-x-6">
            <img
              src="https://tailwindui.com/img/logos/visa.svg"
              alt="Visa"
              className="h-8"
            />
            <img
              src="https://tailwindui.com/img/logos/mastercard.svg"
              alt="Mastercard"
              className="h-8"
            />
            <img
              src="https://tailwindui.com/img/logos/amex.svg"
              alt="American Express"
              className="h-8"
            />
            <img
              src="https://tailwindui.com/img/logos/paypal.svg"
              alt="PayPal"
              className="h-8"
            />
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
