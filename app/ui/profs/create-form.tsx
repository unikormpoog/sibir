import { Professor } from "@/app/lib/definitions";

import Link from "next/link";
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
  BuildingLibraryIcon,
  UserIcon,
  MapPinIcon,
  PhoneIcon,
  IdentificationIcon,
  AcademicCapIcon,
  TableCellsIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createProf } from "@/app/lib/actions";

import { ProfessorNew } from "@/app/lib/definitions";

export default function Form({ profs }: { profs: Professor[] }) {
  return (
    <form action={createProf}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            ФИО
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Иванов Иван"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="department"
            className="mb-2 block text-sm font-medium"
          >
            Кафедра
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="department"
                name="department"
                type="text"
                placeholder="Кафедра физики/химии/и т.д"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="position" className="mb-2 block text-sm font-medium">
            Должность
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="position"
                name="position"
                type="text"
                placeholder="Доцент/Ассистент/и т.д."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <IdentificationIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="degree" className="mb-2 block text-sm font-medium">
            Степень
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="degree"
                name="degree"
                type="text"
                placeholder="Магистр/Кандидат наук/и т.д."
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <AcademicCapIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                placeholder="ул. Пушкина д. Колотушкина"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                placeholder="+79782320000"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="tabel_id" className="mb-2 block text-sm font-medium">
            Табельный номер
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="tabel_id"
                name="tabel_id"
                type="number"
                placeholder="10__"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <TableCellsIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="wage" className="mb-2 block text-sm font-medium">
            Оклад
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="wage"
                name="wage"
                type="number"
                placeholder="10000₽"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="start_date"
            className="mb-2 block text-sm font-medium"
          >
            Начало работы
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="start_date"
                name="start_date"
                type="datetime-local"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/profs"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать профессора</Button>
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
