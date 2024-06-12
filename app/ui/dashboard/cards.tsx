import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
  WalletIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";
import Link from "next/link";

const iconMap = {
  paid: BanknotesIcon,
  profs: AcademicCapIcon,
  pending: ClockIcon,
  paychecks: WalletIcon,
};

export default async function CardWrapper() {
  // const {
  //   totalPaisPaychecks,
  //   totalPendingPaychecks,
  //   numberOfPaychecks,
  //   numberOfProfs,
  // } = await fetchCardData();
  const {
    numberOfProfs,
    numberOfPaychecks,
    totalPaisPaychecks,
    totalPendingPaychecks,
    totalDepsCount,
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Выплачено" value={totalPaisPaychecks} type="paid" />
      <Card
        title="Ожидает выплаты"
        value={totalPendingPaychecks}
        type="pending"
      />
      <Card title="Кафедр всего:" value={totalDepsCount} type="paychecks" />
      <Link href={"/dashboard/profs"}>
        <Card title="Преподавателей" value={numberOfProfs} type="profs" />
      </Link>
    </>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: "paychecks" | "profs" | "pending" | "paid";
}) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
            truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}
