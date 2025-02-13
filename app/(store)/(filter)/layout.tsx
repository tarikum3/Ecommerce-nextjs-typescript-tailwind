import Collections from "@components/common/filter/collection";
import FilterList from "@components/common/filter";
import { sorting } from "lib/const";
import { Suspense } from "react";


export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-1 px-4 pb-4 pt-4 text-primary-900 md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[125px] mx-auto md:px-4 ">
          <Collections />
        </div>
        <div className="order-last min-h-screen w-full md:order-none ">
          {children}
        </div>
        <div className="order-none flex-none md:order-last md:w-[125px] md:px-4 ">
          <FilterList list={sorting} title="Sort by" />
        </div>
      </div>
    </Suspense>
  );
}
