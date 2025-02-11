"use client";
import React, { useState } from "react";
import { Inventory } from "@/db/interfaces/types";
import { table, thead } from "@/ui/table-style";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import moment from "moment";
import EditInventory from "./edit-inventory";
import RequestSummaryTable from "@/components/outbound/request-table";
import { formatCellCode } from "@/utils/cell-code";
import LabelPrint from "./label-print";

export interface GroupedInventory {
  lesto_code: string;
  desc: string;
  total_quan_ok: number;
  total_quan_dev: number;
  details: Inventory[];
  materialId: number;
  lot: string;
}
interface InventoryTableProps {
  groupedInventories: GroupedInventory[];
  type: "outbound" | "reference";
  email?: string | null;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  groupedInventories,
  type,
  email,
}) => {
  const [openRows, setOpenRows] = useState<{ [key: string]: boolean }>({});
  const [requestedQuantities, setRequestedQuantities] = useState<{
    [key: string]: {
      quantity: number;
      materialDesc: string;
      lot: string;
      order: string;
      lesto_code: string;
      materialId: number;
    };
  }>({});

  const handleQuantityChange = (
    lot: string,
    order: string,
    id: number,
    desc: string,
    change: number,
    lesto_code: string,
    maxQuantity: number,
    materialId: number
  ) => {
    setRequestedQuantities((prev) => {
      const currentQuantity = prev[id]?.quantity || 0;
      const newQuantity = Math.min(
        Math.max(currentQuantity + change, 0),
        maxQuantity
      );
      if (newQuantity === 0) {
        const { [id]: _, ...remaining } = prev;
        return remaining;
      }
      return {
        ...prev,
        [id]: {
          lot,
          order,
          quantity: newQuantity,
          materialDesc: desc,
          lesto_code,
          materialId,
        },
      };
    });
  };

  const toggleRow = (lesto_code: string) => {
    setOpenRows((prev) => ({ ...prev, [lesto_code]: !prev[lesto_code] }));
  };

  const isAnyRowOpen = Object.values(openRows).some((isOpen) => isOpen);
  return (
    <div className="overflow-x-auto w-full">
      {Object.keys(requestedQuantities).length > 0 && (
        <RequestSummaryTable
          requestedQuantities={requestedQuantities}
          setRequestedQuantities={setRequestedQuantities}
          email={email}
        />
      )}
      <table className={`w-11/12 border-collapse border ${table} `}>
        <thead className={`${thead} bg-gray-200`}>
          <tr>
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
              ОК
            </th>
            <th
              scope="col"
              className="border px-4 py-3 font-medium sm:pl-6 text-left"
            >
              Отклонение
            </th>
            {isAnyRowOpen && (
              <>
                <th
                  scope="col"
                  className="border px-4 py-3 font-medium sm:pl-6 text-left"
                >
                  Плавка
                </th>
                <th
                  scope="col"
                  className="border px-4 py-3 font-medium sm:pl-6 text-left"
                >
                  Поръчка
                </th>

                <th
                  scope="col"
                  className="border px-4 py-3 font-medium sm:pl-6 text-left"
                >
                  Стелаж
                </th>
                <th
                  scope="col"
                  className="border px-4 py-3 font-medium sm:pl-6 text-left"
                >
                  Клетка
                </th>
                <th
                  scope="col"
                  className="border px-4 py-3 font-medium sm:pl-6 text-left"
                >
                  Заскладяване
                </th>
                <th
                  scope="col"
                  className="border px-4 py-3 font-medium sm:pl-6 text-left"
                >
                  Доставка
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {groupedInventories.map((group) => (
            <React.Fragment key={group.lesto_code}>
              <tr
                className={`border ${
                  openRows[group.lesto_code]
                    ? "bg-gray-100"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="border px-4 py-4 sm:pl-6 flex items-center">
                  <button
                    onClick={() => toggleRow(group.lesto_code)}
                    className="flex items-center"
                  >
                    {openRows[group.lesto_code] ? (
                      <ChevronUpIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <ChevronDownIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                  <span className="ml-2">
                    {group.lesto_code}
                    &nbsp; &nbsp; &nbsp;
                    {group.desc}
                  </span>
                </td>
                <td className="border px-4 py-4 sm:pl-6">
                  {group.total_quan_ok}
                </td>
                <td className="border px-4 py-4 sm:pl-6">
                  {group.total_quan_dev}
                </td>
              </tr>
              {openRows[group.lesto_code] &&
                group.details.map((inventory) => (
                  <tr key={inventory.id} className="bg-gray-50">
                    <td className="flex border px-4 py-4 sm:pl-6 break-words">
                      {type === "reference" && (
                        <div className="flex gap-4">
                          <EditInventory data={inventory} />
                          <LabelPrint data={inventory} />
                        </div>
                      )}
                      {type === "outbound" && (
                        <div className="border px-4 py-4 sm:pl-6 min-w-32">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                inventory.lot,
                                inventory.order,
                                inventory.id,
                                group.desc,
                                -1,
                                group.lesto_code,
                                inventory.quan_ok + inventory.quan_dev,
                                inventory.materialId
                              )
                            }
                            className="px-2 py-1 border rounded bg-red-500 text-white"
                          >
                            -
                          </button>
                          <span className="mx-2">
                            {requestedQuantities[inventory.id]?.quantity || 0}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                inventory.lot,
                                inventory.order,
                                inventory.id,
                                group.desc,
                                1,
                                group.lesto_code,
                                inventory.quan_ok + inventory.quan_dev,
                                inventory.materialId
                              )
                            }
                            className="px-2 py-1 border rounded bg-green-500 text-white"
                          >
                            +
                          </button>
                        </div>
                      )}
                      &nbsp; &nbsp; &nbsp;
                      <div className="w-full">
                        {inventory.comment
                          ? inventory.comment
                          : "Няма коментар"}
                      </div>
                    </td>
                    <td className="border px-4 py-4 sm:pl-6">
                      {inventory.quan_ok}
                    </td>
                    <td className="border px-4 py-4 sm:pl-6">
                      {inventory.quan_dev}
                    </td>
                    <td className="border px-4 py-4 sm:pl-6">
                      {inventory.lot}
                    </td>
                    <td className="border px-4 py-4 sm:pl-6">
                      {inventory.order}
                    </td>
                    {inventory.stillage && inventory.cell ? (
                      <>
                        <td className="border px-4 py-4 sm:pl-6">
                          {inventory.stillage.name}
                        </td>
                        <td className="border px-4 py-4 sm:pl-6">
                          {formatCellCode(inventory.cell.code)}
                        </td>
                      </>
                    ) : (
                      <td colSpan={2} className="border px-4 py-4 sm:pl-6">
                        {inventory.storage?.name}
                      </td>
                    )}

                    <td className="border px-4 py-4 sm:pl-6">
                      {moment(inventory.inboundDate).format("DD/MMM/YYYY")}
                    </td>
                    <td className="border px-4 py-4 sm:pl-6">
                      {moment(inventory.deliveryDate).format("DD/MMM/YYYY")}
                    </td>
                  </tr>
                ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
