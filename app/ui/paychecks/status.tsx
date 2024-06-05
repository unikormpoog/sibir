import { CheckIcon, ClockIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export default function PaycheckStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "в обработке",
          "bg-green-500 text-white": status === "выплачено",
        }
      )}
    >
      {status === "в обработке" ? (
        <>
          в обработке
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "выплачено" ? (
        <>
          выплачено
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
