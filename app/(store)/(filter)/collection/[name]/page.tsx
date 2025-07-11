import { ProductCard } from "@/app/components/product";
import {
  fetchCollection,
  productSortField,
} from "@lib/services/prismaServices";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import SortList from "@/app/components/common/filter/SortList";
import { sorting } from "lib/const";
//export const runtime = "edge";
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: { name: string };
}): Promise<Metadata> {
  const { products } = await fetchCollection({ title: params!.name });

  if (!products) return notFound();

  return {
    title: params!.name ?? "",
    description: `${params!.name ?? ""} products`,
  };
}

async function getCollection(params: {
  name: string;
  sort?: string;
  order?: string;
}) {
  const { sort, order } = { ...params };
  let sortBy: any;
  if (sort && productSortField.includes(sort)) {
    sortBy = { field: sort, order: order == "asc" ? order : "desc" };
  }

  const { products } = await fetchCollection({
    title: params!.name,
    ...(sortBy && { sortProduct: sortBy }),
  });

  return {
    products,
    found: !!products?.length,
    collection: params!.name,
  };
}

export default async function Collection({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams?: {
    q?: string;
    sort?: string;
    order?: string;
  };
}) {
  const { sort, order } = { ...searchParams };
  const { products, collection } = await getCollection({
    name: params.name,
    sort,
    order,
  });

  return (
    <div className="py-16 max-w-7xl mx-auto px-6 ">
      {/* <p className="capitalize text-5xl text-primary-900 text-center font-bold mb-12">
        {collection}
      </p> */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary-900  ">
            {collection}
          </h1>
          <p className="mt-2 text-primary-600 ">
            Browse our complete collection
          </p>
        </div>
        <SortList list={sorting} title="Sort by" />
      </div>
      <div className="mb-2 grid grid-cols-1 gap-8 mx-auto  lg:grid-cols-3 ">
        {products?.slice(0, 9).map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
