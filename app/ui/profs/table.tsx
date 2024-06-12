import Image from "next/image";
import { UpdateProf, DeleteProf } from "@/app/ui/profs/buttons";

// import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredProfs } from "@/app/lib/data";
import { formatCurrency, formatDateToLocal } from "@/app/lib/utils";
import PaycheckStatus from "../paychecks/status";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const profs = await fetchFilteredProfs(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {profs?.map((prof) => (
              <div
                key={prof.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      {/* <Image
                        src={invoice.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      /> */}
                      <p>{prof.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{prof.department}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(prof.wage)}
                    </p>
                    <p>{formatDateToLocal(prof.start_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateProf id={prof.id} />
                    <DeleteProf id={prof.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Профессор
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Кафедра
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Оклад
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Начал работу с
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Статус зарплаты
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {profs?.map((prof) => (
                <tr
                  key={prof.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={prof.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${prof.name}'s profile picture`}
                      /> */}
                      <p>{prof.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {prof.department}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(prof.wage)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(prof.start_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {/* <PaycheckStatus status={prof.status} /> */}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateProf id={prof.id} />
                      <DeleteProf id={prof.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
