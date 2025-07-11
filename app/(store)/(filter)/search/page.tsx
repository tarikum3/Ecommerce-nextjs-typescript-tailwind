import { ProductCard } from "@/app/components/product";
import { unstable_noStore as noStore } from "next/cache";

import { fetchProducts, productSortField } from "@lib/services/prismaServices";
import SortList from "@/app/components/common/filter/SortList";
import { sorting } from "lib/const";
export const dynamic = "force-dynamic";
async function getSearchProducts({
  q,
  sort,
  order,
}: {
  q: string;
  sort?: string;
  order?: string;
}) {
  noStore();
  let sortBy: any;
  if (sort && productSortField.includes(sort)) {
    sortBy = { field: sort, order: order == "asc" ? order : "desc" };
  }

  const { products } = await fetchProducts({
    searchKey: q,
    // sort: { field: sort },
    ...(sortBy && { sort: sortBy }),
  });

  return {
    products,
    found: !!products?.length,
    q: typeof q === "string" ? q : "",
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    sort?: string;
    order?: string;
  };
}) {
  const query = searchParams?.q || "";
  const { sort, order } = { ...searchParams };
  const { products, found, q } = await getSearchProducts({
    q: query,
    sort,
    order,
  });

  return (
    <div className="py-16 max-w-7xl mx-auto px-6 ">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className=" text-xl ">
          {q && found ? (
            <span className="text-primary-700">
              Showing {products?.length} results{" "}
              {q && (
                <strong>
                  for "<span className="font-semibold">{q}</span>"
                </strong>
              )}
            </span>
          ) : (
            q && (
              <span>
                There are no products that match{" "}
                <strong>
                  "<span className="font-semibold">{q}</span>"
                </strong>
              </span>
            )
          )}
        </div>
        <SortList list={sorting} title="Sort by" />
      </div>
      <div className="mb-2 grid grid-cols-1 gap-8 mx-auto  lg:grid-cols-3">
        {products?.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
