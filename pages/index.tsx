import { Layout } from "@components/common";
import { ProductCard } from "@components/product";

import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";

import getAllProducts from "@framework/operations/getAllProducts";
// import getAllPages from '@framework/operations/getAllPages'
// import getSiteInfo from '@framework/operations/getSiteInfo'

// import {rangeMap} from '@framework/utils'
// import Image from 'next/image'
import Link from "next/link";
import { ArrowRight } from "@components/icons";

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales };

  // const pagesPromise = getAllPages({ config, preview })
  // const siteInfoPromise = getSiteInfo({ config, preview })
  // const { pages } = await pagesPromise
  // const { categories } = await siteInfoPromise
  // console.log("ppages",pages);

  const productsPromise = getAllProducts({
    variables: { first: 8 },
    config,
    preview,
  });

  const { products } = await productsPromise;

  return {
    props: {
      products,
      // pages,
      // categories
    },
    revalidate: 60,
  };
}
///
export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className=" relative flex flex-col items-center justify-center bg-secondary-2 m-28 mx-auto w-4/5 h-[80vh] rounded-xl">
        {/* <div className="animate-ping bg-gray-500 z-0 absolute  h-1/2 w-1/2  "></div> */}
        <h2 className="text-5xl text-center text-primary font-bold m-8 relative md:text-7xl ">
          New arrivals
        </h2>

        <p className="text-2xl text-center text-primary-2 leading-relaxed relative lg:text-4xl">
          explore new and stylish clothes in our shop
        </p>

        <Link
          href={"/collection/new-arrivals"}
          // className={s.link}
          className="bg-primary text-2xl text-secondary-2 font-bold py-2 px-10 rounded m-8 relative cursor-pointer "
        >
          {" explore"}
        </Link>
      </div>

      <div className=" m-10 ">
        <p className="text-lg text-secondary font-bold m-5 mx-auto md:mx-24 md:text-xl lg:text-5xl ">
          {" "}
          Explore Products{" "}
        </p>

        <div className="grid grid-cols-1 gap-4 mx-auto md:mx-24 lg:grid-cols-3">
          {products.slice(0, 9).map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className=" mx-auto md:mx-24 ">
          <Link
            href="/search"
            className="flex flex-initial items-center justify-end font-bold    "
          >
            <span className=" mr-2">more</span>
            <span className=" mr-2">
              <ArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

Home.Layout = Layout;
