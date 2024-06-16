import Form from "@/app/ui/profs/edit-form";
import EditDepsForm from "@/app/ui/deps/edit-form";
import Breadcrumbs from "@/app/ui/profs/breadcrumbs";
import {
  fetchDepsById,
  fetchProfs,
  fetchProfsById,
  fetchProfs_for_select,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { updateProf } from "@/app/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  // const deps = await fetchDepsById(id);
  // const profs = await fetchProfs();
  const [deps, profs] = await Promise.all([
    fetchDepsById(id),
    fetchProfs_for_select(),
  ]);

  if (!deps) {
    notFound();
  }

  const plainDeps = JSON.parse(JSON.stringify(deps));
  const plainProfs = JSON.parse(JSON.stringify(profs));

  //   const updateProfWithId: UpdateProfWithIdType = async (
  //     id: string,
  //     formData: FormData
  //   ) => {
  //     // Вызов функции updateProf с передачей id и formData
  //     return await updateProf(id, formData);
  //   };

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Кафедры", href: "/dashboard/deps" },
          {
            label: "Изменить кафедру",
            href: `/dashboard/deps/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* <Form profs={plainDeps} /> */}
      <EditDepsForm profs={plainProfs} deps={plainDeps} />
    </main>
  );
}
