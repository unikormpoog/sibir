import Form from "@/app/ui/profs/edit-form";
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
          { label: "Invoices", href: "/dashboard/profs" },
          {
            label: "Edit Invoice",
            href: `/dashboard/profs/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form profs={plainProfs} />
      console.log(plainProfs);
    </main>
  );
}

// export default async function Page({ params }: { params: { id: string } }) {
//   const id = params.id;
//   const profs = await fetchProfsById(id);
//   if (!profs) {
//     notFound();
//   }
//   return (
//     <main>
//       <Breadcrumbs
//         breadcrumbs={[
//           { label: "Invoices", href: "/dashboard/profs" },
//           {
//             label: "Edit Invoice",
//             href: `/dashboard/profs/${id}/edit`,
//             active: true,
//           },
//         ]}
//       />
//       <Form profs={profs} />
//     </main>
//   );
// }
// Экспортируем тип
