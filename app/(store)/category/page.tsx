


import PageHeader from '@/app/components/layout/PageHeader/PageHeader';
import  Categorylist  from "@/app/components/common/categorylist/Categorylist"
import  FilterSection from "@/app/components/common/filter/FilterSection"
// import ProductsGrid from '@/app/components/ProductsGrid';
import {categories,Productfilter} from "@/lib/const"
import SortBy from '@/app/components/common/sort/sort';

import { Suspense } from 'react';
export const runtime = 'edge';

export const metadata = {
  title: 'All Products',
  description: 'Discover our complete products across all categories'
};

export default async function AllPage({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // const { sort, q: searchValue } = searchParams as { [key: string]: string };
  // const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  
  // const products = await getProducts({ sortKey, reverse, query: searchValue });
  // const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
   <Suspense>
  <div className="bg-white">
  <PageHeader
        title="All Products"
        description="Discover our complete products across all categories"
        breadcrumbs={breadcrumbs}
      />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            <div className="lg:w-1/4">
              <Categorylist categories={categories} />
            </div>

            <div className="lg:w-3/4">
              <FilterSection  sections={Productfilter}  />

              <div>
                {/* Products Header Layout */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  {/* <ProductsHeader /> */}
                  <SortBy />
                </div>
                
                {/* <ProductsGrid /> */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    </Suspense>
    </>
  );
}


const breadcrumbs = [
  { label: 'Home', href: '/' },
  { label: 'All Products', href: '/category' },
  // { label: 'Electronics', href: '/categories/electronics' },
  // { label: 'Laptops' },
];


