import Form from "@/app/ui/profs/create-form";
import Breadcrumbs from "@/app/ui/profs/breadcrumbs";
import {
  fetchDeps,
  fetchFilteredPay,
  fetchProfs,
  fetchProfs_for_select,
} from "@/app/lib/data";
import Form_Pay from "@/app/ui/paychecks/create-form";

export default async function Page() {
  const profs = await fetchProfs_for_select();
  const deps = await fetchDeps();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Зарплаты", href: "/dashboard/paychecks" },
          {
            label: "Создать",
            href: "/dashboard/paychecks/create",
            active: true,
          },
        ]}
      />
      <Form_Pay deps={deps} profs={profs} />
    </main>
  );
}
