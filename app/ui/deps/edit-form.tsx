"use client";

import { Department, Professor, Professor2 } from "@/app/lib/definitions";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateDep, updateProf } from "@/app/lib/actions";
import { useState } from "react";

export default function EditDepsForm({
  deps,
  profs,
}: {
  deps: Department;
  profs: Professor[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const updateInvoiceWithId = updateDep.bind(null, deps.id);
  return (
    <form action={updateInvoiceWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label
            htmlFor="department_name"
            className="mb-2 block text-sm font-medium"
          >
            Имя кафедры
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="department_name"
                name="department_name"
                type="text"
                placeholder="Enter USD amount"
                defaultValue={deps.department_name}
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="head" className="mb-2 block text-sm font-medium">
            Глава кафедры, выберите профессора
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="head"
                name="head"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={deps.head}
                size={isOpen ? 5 : 1}
                // style={{ overflowY: "auto" }}

                onFocus={() => setIsOpen(true)} // Открыть список при фокусе
                onBlur={() => setIsOpen(false)} // Закрыть список при потере фокуса
                style={{
                  maxHeight: isOpen ? "10rem" : "auto",
                  overflowY: isOpen ? "auto" : "hidden",
                }} // Установить прокрутку только в открытом состоянии
              >
                {/* <option value="" disabled>
                  Выберите профессора
                </option> */}
                {profs.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name} ({prof.degree})
                  </option>
                ))}
              </select>

              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="mb-2 block text-sm font-medium">
            Адресс
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="address"
                name="address"
                type="text"
                defaultValue={deps.address}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Телефон
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="phone"
                name="phone"
                type="number"
                defaultValue={deps.phone}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/deps"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отменить
        </Link>
        <Button type="submit">Изменить кафедру</Button>
      </div>
    </form>
  );
}
