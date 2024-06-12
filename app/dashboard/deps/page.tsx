"use server";
import { fetchDeps, newFetchDeps } from "@/app/lib/data";
import CustomersTable from "@/app/ui/deps/table";

export default async function Page() {
  const departments = await newFetchDeps();
  return (
    <div>
      <CustomersTable departments={departments} />
    </div>
  );
}
