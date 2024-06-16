import Form from "@/app/ui/profs/create-form";
import Breadcrumbs from "@/app/ui/profs/breadcrumbs";
import { fetchProfs } from "@/app/lib/data";

export default async function Page() {
  const profs = await fetchProfs();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Преподаватели", href: "/dashboard/profs" },
          {
            label: "Создать",
            href: "/dashboard/profs/create",
            active: true,
          },
        ]}
      />
      <Form profs={profs} />
    </main>
  );
}
