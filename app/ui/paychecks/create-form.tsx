"use client";
import { Department, Professor, PaycheckNew } from "@/app/lib/definitions";

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
  CalendarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createPaycheck } from "@/app/lib/actions";
import { useState } from "react";

export default function Form_Pay({
  paychecks,
  profs,
}: {
  paychecks: PaycheckNew;
  profs: Professor[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProf, setSelectedProf] = useState<Professor | null>(null);

  const handleProfChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const professor = profs.find((prof) => prof.name === selectedId);
    setSelectedProf(professor);
  };
  return (
    <form action={createPaycheck}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Выберите профессора
          </label>
          <div className="relative">
            <select
              id="name"
              name="name"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              onChange={handleProfChange}
            >
              <option value="" disabled>
                - / -
              </option>
              {profs.map((prof) => (
                <option key={prof.id} value={prof.id}>
                  {prof.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Кафедра */}
        {selectedProf && (
          <div className="mb-4">
            <label
              htmlFor="department"
              className="mb-2 block text-sm font-medium"
            >
              Кафедра
            </label>
            <div className="relative mt-2 rounded-md">
              <input
                id="department"
                name="department"
                type="text"
                value={selectedProf.department}
                readOnly
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        )}

        {/* Invoice Amount */}
        <div className="mb-4">
          <label
            htmlFor="date_of_paycheck"
            className="mb-2 block text-sm font-medium"
          >
            Выберите дату платежа
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="date_of_paycheck"
                name="date_of_paycheck"
                type="date"
                placeholder=""
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Введите сумму
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="зарплата в рублях"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Invoice Amount */}
        <div className="mb-4">
          <label
            htmlFor="payment_month"
            className="mb-2 block text-sm font-medium"
          >
            Укажите зарплатный месяц
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="payment_month"
                name="payment_month"
                type="month"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Статус зарплаты
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="в обработке"
                  name="status"
                  type="radio"
                  value="в обработке"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="в обработке"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  В обработке <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="выплачено"
                  name="status"
                  type="radio"
                  value="выплачено"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="выплачено"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Выплачено <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/paychecks"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Отмена
        </Link>
        <Button type="submit">Создать выплату</Button>
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
