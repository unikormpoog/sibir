import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { deleteDep, deletePay, deleteProf } from "@/app/lib/actions";

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/profs/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Создать преподавателя</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateProf({ id }: { id: string }) {
  console.log(id);
  console.log(typeof id);

  return (
    <Link
      href={`/dashboard/profs/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function FullProf({ id }: { id: string }) {
  console.log(id);
  console.log(typeof id);

  return (
    <Link
      href={`/dashboard/profs/${id}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <EllipsisHorizontalIcon className="w-5" />
    </Link>
  );
}

export function DeleteProf({ id }: { id: string }) {
  const deleteProfWithId = deleteProf.bind(null, id);
  console.log(id);
  console.log(deleteProfWithId);
  console.log(typeof id);
  return (
    <form action={deleteProfWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function CreateDep() {
  return (
    <Link
      href="/dashboard/deps/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Создать кафедру</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateDep({ id }: { id: string }) {
  console.log(id);
  console.log(typeof id);

  return (
    <Link
      href={`/dashboard/deps/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteDep({ id }: { id: string }) {
  const deleteDepWithId = deleteDep.bind(null, id);
  console.log(id);
  console.log(deleteDepWithId);
  console.log(typeof id);
  return (
    <form action={deleteDepWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

//
//
///
///

///
///
///
///
///
///
export function CreatePaycheck() {
  return (
    <Link
      href="/dashboard/paychecks/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Создать выплату</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdatePaycheck({ id }: { id: string }) {
  console.log(id);
  console.log(typeof id);

  return (
    <Link
      href={`/dashboard/paychecks/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeletePaycheck({ id }: { id: string }) {
  const deletePayWithId = deletePay.bind(null, id);
  console.log(id);
  console.log(deletePayWithId);
  console.log(typeof id);
  return (
    <form action={deletePayWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Удалить</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
