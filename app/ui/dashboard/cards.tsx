import {
  BanknotesIcon,
  ClockIcon,
  UserGroupIcon,
  InboxIcon,
} from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { fetchCardData } from "@/app/lib/data";

const iconMap = {
  paid: BanknotesIcon,
  profs: UserGroupIcon,
  pending: ClockIcon,
  paychecks: InboxIcon,
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
  } = await fetchCardData();
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Paid" value={totalPaisPaychecks} type="paid" />
      <Card title="Pending" value={totalPendingPaychecks} type="pending" />
      <Card
        title="Total Paychecks"
        value={numberOfPaychecks}
        type="paychecks"
      />
      <Card title="Total Customers" value={numberOfProfs} type="profs" />
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
