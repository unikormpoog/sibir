"use client";
import { Department, Professor } from "@/app/lib/definitions";

import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createDep } from "@/app/lib/actions";

import { ProfessorNew } from "@/app/lib/definitions";
import { useState } from "react";

export default function Form_1({
  deps,
  profs,
}: {
  deps: Department[];
  profs: Professor[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <form action={createDep}>
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
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="head" className="mb-2 block text-sm font-medium">
            Глава
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <select
                id="head"
                name="head"
                className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              >
                <option value="" disabled>
                  Выберите профессора
                </option>
                {profs.map((prof) => (
                  <option key={prof.id} value={prof.id}>
                    {prof.name}({prof.degree})
                  </option>
                ))}
              </select>

              {/* <input
              id="department"
              name="department"
              type="text"
              placeholder="Enter USD amount"
              defaultValue={deps.head}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            /> */}
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
          Отмена
        </Link>
        <Button type="submit">Создать кафедру</Button>
      </div>
    </form>
  );
}
//
//
//
//
//
//
//
//
