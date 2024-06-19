import Form from "@/app/ui/profs/edit-form";
// import EditDepsForm from "@/app/ui/deps/edit-form";
import EditDepsForm from "@/app/ui/paychecks/edit-form";
import Breadcrumbs from "@/app/ui/profs/breadcrumbs";
import {
  fetchDepsById,
  fetchPaysById,
  fetchProfs,
  fetchProfsById,
  fetchProfs_for_select,
} from "@/app/lib/data";
import { notFound } from "next/navigation";
import { updateProf } from "@/app/lib/actions";
import EditPayForm from "@/app/ui/paychecks/edit-form";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  // const deps = await fetchDepsById(id);
  // const profs = await fetchProfs();
  const [pays, profs] = await Promise.all([
    fetchPaysById(id),
    fetchProfs_for_select(),
  ]);

  if (!pays) {
    notFound();
  }

  const plainPays = JSON.parse(JSON.stringify(pays));
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
          { label: "Зарплаты", href: "/dashboard/paychecks" },
          {
            label: "Изменить запись",
            href: `/dashboard/paychecks/${id}/edit`,
            active: true,
          },
        ]}
      />
      {/* <Form profs={plainDeps} /> */}
      <EditPayForm pays={plainPays} profs={plainProfs} />
    </main>
  );
}
