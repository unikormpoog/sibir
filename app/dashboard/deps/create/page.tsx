import Form from "@/app/ui/profs/create-form";
import Breadcrumbs from "@/app/ui/profs/breadcrumbs";
import { fetchDeps, fetchProfs, fetchProfs_for_select } from "@/app/lib/data";
import Form_1 from "@/app/ui/deps/create-form";

export default async function Page() {
  const profs = await fetchProfs_for_select();
  const deps = await fetchDeps();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Кафедры", href: "/dashboard/deps" },
          {
            label: "Создать",
            href: "/dashboard/deps/create",
            active: true,
          },
        ]}
      />
      <Form_1 deps={deps} profs={profs} />
    </main>
  );
}
