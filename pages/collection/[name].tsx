import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

import { Layout } from "@components/common";

import { ProductCard } from "@components/product";
import getCategories from "@framework/operations/getCategories";
import {
  CollectionEdge,
  Product as ShopifyProduct,
} from "@framework/schemas/schema";

import { getCollectionProductsQuery, normalizeProduct } from "@framework/utils";

import fetcher from "@framework/fetcher";

export async function getStaticProps({
  params,
  locale,
  locales,
}: GetStaticPropsContext<{ name: string }>) {
  const config = { locale, locales };
  const categories = await getCategories({ config });
  //console.log("pathtn",params!.name);
  const currentCategory = categories?.find(
    (cat: any) => cat.slug == params!.name
  );
  let products;

  const data = await fetcher<CollectionEdge>({
    query: getCollectionProductsQuery,

    variables: { categoryId: currentCategory?.id },
  });

  products = data.node?.products?.edges;

  if (!currentCategory) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: products?.map(({ node }) =>
        normalizeProduct(node as ShopifyProduct)
      ),
      found: !!products?.length,
      collection: params!.name,
    },
    revalidate: 200,
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const config = { locale: "", locales };
  const categories = await getCategories({ config });

  return {
    paths: categories?.map((category: any) => `/collection/${category.slug}`),
    fallback: "blocking",
  };
}

export default function Collection({
  products,
  found,
  collection,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className=" m-10 ">
      <p className="capitalize text-5xl text-secondary text-center font-bold p-10 pb-24">
        {" "}
        {collection}{" "}
      </p>

      <div className="grid grid-cols-1 gap-4 mx-24 lg:grid-cols-3">
        {products.slice(0, 9).map((product: any, i: number) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
Collection.Layout = Layout;
