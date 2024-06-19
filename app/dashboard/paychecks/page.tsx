"use server";
import { fetchDeps, fetchDepsPages, fetchPaysPages } from "@/app/lib/data";
import CustomersTable from "@/app/ui/deps/table";
import { lusitana } from "@/app/ui/fonts";
import { CreatePaycheck } from "@/app/ui/profs/buttons";
import Pagination from "@/app/ui/profs/pagination";
import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import PayTable from "@/app/ui/paychecks/table";
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchPaysPages(query);
  // const departments = await fetchDeps();
  return (
    <div>
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className={`${lusitana.className} text-2xl`}>Зарплаты</h1>
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Поиск..." />
          <CreatePaycheck />
        </div>
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <PayTable query={query} currentPage={currentPage} />
          {/* <CustomersTable query={query} currentPage={currentPage} /> */}
        </Suspense>
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
