"use client";

import {
  Department,
  PaycheckNew,
  Professor,
  Professor2,
} from "@/app/lib/definitions";
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
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { updateDep, updatePay, updateProf } from "@/app/lib/actions";
import { useEffect, useState } from "react";

export default function EditPayForm({
  pays,
  profs,
}: {
  pays: PaycheckNew;
  profs: Professor[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const updatePayWithId = updatePay.bind(null, pays.id);
  const [selectedProf, setSelectedProf] = useState(pays.name || "");
  useEffect(() => {
    if (pays.name) {
      setSelectedProf(pays.name);
    }
  }, [pays.name]);

  const handleProfChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    const professor = profs.find((prof) => prof.name === selectedId);
    setSelectedProf(selectedId);
  };
  console.log(pays.status);

  return (
    <form action={updatePayWithId}>
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
              defaultValue={pays.name}
              // value={selectedProf}
              // onChange={handleProfChange}
            >
              <option value="" disabled>
                Выберите профессора
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
        {/* {selectedProf && (
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
                value={
                  pays.find((pay) => pay.id === selectedProf)?.department || ""
                }
                readOnly
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        )} */}
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
              defaultValue={pays.department}
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            />
            <BuildingLibraryIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
        </div>
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
                type="text"
                defaultValue={pays.date_of_paycheck}
                // placeholder="Enter USD amount"
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
                defaultValue={pays.amount}
                step="0.01"
                placeholder="Enter USD amount"
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
                defaultValue={pays.payment_month}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CalendarDaysIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Invoice Status */}
        {/* <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Статус зарплаты
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="в обработке"
                  name="status"
                  defaultValue={pays.status}
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
                  defaultValue={pays.status}
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
        </fieldset> */}

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
                  defaultChecked={pays.status === "в обработке"}
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
                  defaultChecked={pays.status === "выплачено"}
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
        <Button type="submit">Сохранить изменения</Button>
      </div>
    </form>
  );
}
