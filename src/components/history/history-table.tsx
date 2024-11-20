import { Transaction } from "@/db/interfaces/types";
import { table, thead } from "@/ui/table-style";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import React from "react";

const HistoryTable = ({ transactions }: { transactions: Transaction[] }) => {
  return (
    <div>
      <table className={`w-11/12 border-collapse border ${table} `}>
        <thead className={`${thead} bg-gray-200`}>
          <tr>
            <th
              scope="col"
              className="border px-4 py-3 font-medium sm:pl-6 text-left"
            >
              Вид
            </th>
            <th
              scope="col"
              className="border px-4 py-3 font-medium sm:pl-6 text-left"
            >
              Лесто Код
            </th>
            <th
              scope="col"
              className="border px-4 py-3 font-medium sm:pl-6 text-left"
            >
              Описание
            </th>
            <th
              scope="col"
              className="border px-4 py-3 font-medium sm:pl-6 text-left"
            >
              Брой
            </th>
            <th
              scope="col"
              className="border px-4 py-3 font-medium sm:pl-6 text-left"
            >
              Потребител
            </th>
            <th
              scope="col"
              className="border px-4 py-3 font-medium sm:pl-6 text-left"
            >
              Дата
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border bg-gray-100 hover:bg-gray-50"
            >
              <td
                className={`border px-4 py-4 sm:pl-6 font-bold ${
                  transaction.type === "inbound"
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {transaction.type === "inbound" ? (
                  <div className="flex justify-start">
                    <PlusCircleIcon className="w-6 h-6" /> ЗАСКЛАДЯВАНЕ
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <MinusCircleIcon className="w-6 h-6" /> ИЗПИСВАНЕ
                  </div>
                )}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {transaction.material?.lesto_code}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {transaction.material?.desc}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {transaction.quantity}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {transaction.user?.username}
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {moment(transaction.date).format("DD/MMM/YYYY HH:mm")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
