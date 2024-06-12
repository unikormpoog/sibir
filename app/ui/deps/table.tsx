import Image from "next/image";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { DepartmentNew } from "@/app/lib/definitions";

export default async function CustomersTable({
  departments,
}: {
  departments: DepartmentNew[];
}) {
  return (
    <div className="w-full">
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      <Search placeholder="Search customers..." />
      <div className="mt-6 flow-root">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden rounded-md bg-gray-50 p-2 md:pt-0">
              <div className="md:hidden">
                {departments?.map((department) => (
                  <div
                    key={department.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <div className="mb-2 flex items-center">
                          <div className="flex items-center gap-3">
                            {/* <Image
                              src={department.department}
                              className="rounded-full"
                              alt="1"
                              width={28}
                              height={28}
                            /> */}
                            <p>{department.department}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          {department.head}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between border-b py-5">
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Адресс</p>
                        <p className="font-medium">{department.address}</p>
                      </div>
                      <div className="flex w-1/2 flex-col">
                        <p className="text-xs">Телефон</p>
                        <p className="font-medium">{department.phone}</p>
                      </div>
                    </div>
                    <div className="pt-4 text-sm">
                      {/* <p>{department.total_invoices} invoices</p> */}
                    </div>
                  </div>
                ))}
              </div>
              <table className="hidden min-w-full rounded-md text-gray-900 md:table">
                <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      Название
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Глава кафедры
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Адресс
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Телефон
                    </th>
                    <th scope="col" className="px-4 py-5 font-medium">
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900">
                  {departments.map((department) => (
                    <tr key={department.id} className="group">
                      <td className="whitespace-nowrap bg-white py-5 pl-4 pr-3 text-sm text-black group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6">
                        <div className="flex items-center gap-3">
                          {/* <Image
                            src={department.image_url}
                            className="rounded-full"
                            alt={`${department.name}'s profile picture`}
                            width={28}
                            height={28}
                          /> */}
                          <p>{department.department}</p>
                        </div>
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {department.head}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {department.address}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                        {department.phone}
                      </td>
                      <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                        {/* {department.total_paid} */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
