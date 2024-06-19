import Form from "@/app/ui/profs/edit-form";
import FullInvoiceForm from "@/app/ui/profs/full-form";
import Breadcrumbs from "@/app/ui/profs/breadcrumbs";
import { fetchProfs, fetchProfsById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { updateProf } from "@/app/lib/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const profs = await fetchProfsById(id);

  if (!profs) {
    notFound();
  }

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
          { label: "Преподаватели", href: "/dashboard/profs" },
          {
            label: "Полная запись",
            href: `/dashboard/profs/${id}`,
            active: true,
          },
        ]}
      />
      <FullInvoiceForm profs={plainProfs} />
    </main>
  );
}
