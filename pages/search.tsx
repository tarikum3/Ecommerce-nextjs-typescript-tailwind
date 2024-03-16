import { useState } from "react";

import { Layout, Pagination } from "@components/common";
import { ProductCard } from "@components/product";

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import getAllProducts from "@framework/operations/getAllProducts";
import { useGetProductsQuery } from "@framework/services/product";

export async function getServerSideProps({
  query,
  locale,
  locales,
}: GetServerSidePropsContext) {
  const { q } = query;
  let search = "";

  if (q) {
    search += `(product_type:${q}) OR (title:${q}) OR (tag:${q}) `;
  }
  const { products } = await getAllProducts({
    variables: { first: 8, query: search },
    config: { locale, locales },
  });

  //const { products } = await productsPromise
  return {
    props: {
      products,
      found: !!products?.length,
      q: typeof q === "string" ? q : "",
    },
  };
}

const SORT = {
  Name: "Trending",
  latest: "Latest arrivals",
  price: " Low to high",
};

export default function Search({
  products,
  found,
  q,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [activeSort, setActiveSort] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetProductsQuery({});
  //console.log('usepro',dataaa);

  const perPage = 2;
  const maxPage = (products?.length - (products?.length % perPage)) / perPage;

  const handleSort = (text: string) => {};
  const handlePage = (p: number) => {
    if (p == -1 && currentPage - 1 > 0) {
      setCurrentPage((pre) => pre - 1);
    } else if (p == 0 && currentPage + 1 <= maxPage) {
      setCurrentPage((pre) => pre + 1);
    } else {
      setCurrentPage(p);
    }
  };

  // if (error) {
  //   return <ErrorMessage error={error} />
  // }

  return (
    <>
      <div className="m-12 text-xl text-transition ease-in duration-75 mx-auto md:mx-24">
        <>
          <span className={!found ? "hidden" : ""}>
            Showing {products?.length} results{" "}
            {q && (
              <>
                for "<strong>{q}</strong>"
              </>
            )}
          </span>
          <span className={found ? "hidden" : ""}>
            <>
              There are no products that match "<strong>{q}</strong>"
            </>
          </span>
        </>
      </div>

      <div className="flex justify-end items-end   mx-auto md:mx-24">
        <div className="relative ">
          <button
            type="button"
            onClick={() => {
              setActiveSort(!activeSort);
            }}
            className="flex justify-between bg-primary text-secondary  p-1 text-xl font-bold md:text-2xl "
          >
            {"sort"}
            <svg
              className="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {activeSort && (
            <div className="  absolute z-10 bg-primary text-secondary md:w-40 rounded-md shadow-lg ">
              {Object.entries(SORT).map(([key, text]) => (
                <button
                  className=" block text-xl  md:text-2xl m-4"
                  onClick={() => handleSort(text)}
                >
                  {key}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mx-auto md:mx-24 lg:grid-cols-3">
        {((data as any)?.length > 1 ? (data as any) : products)
          ?.slice((currentPage - 1) * perPage, currentPage * perPage)
          .map((product: any, i: number) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>

      {/* <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        perPage={8}
        itemSize={(data as any)?.length ? (data as any)?.length : 0}
      /> */}
    </>
  );
}

Search.Layout = Layout;
