import { Card } from "@/app/ui/dashboard/cards";
import LatestProfs1 from "@/app/ui/dashboard/latest-profs";
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from "@/app/ui/fonts";
import { fetchDeps, fetchProfs } from "../../lib/data";
import Deps from "../../ui/dashboard/deps";
import { Suspense } from "react";
import {
  CardSkeleton,
  InvoiceSkeleton,
  RevenueChartSkeleton,
} from "@/app/ui/skeletons";
import CardWrapper from "@/app/ui/dashboard/cards";

export default async function Page() {
  const deps = await fetchDeps();
  const profs = await fetchProfs();
  // const {
  //   totalPaisPaychecks,
  //   totalPendingPaychecks,
  //   numberOfPaychecks,
  //   numberOfProfs,
  // } = await fetchCardData();
  return (
    <div>
      <main>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Дэшборд
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Suspense fallback={<CardSkeleton />}>
            <CardWrapper />
          </Suspense>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <Suspense fallback={<InvoiceSkeleton />}>
            <Deps />
          </Suspense>
          <Suspense fallback={<InvoiceSkeleton />}>
            <LatestProfs1 />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
