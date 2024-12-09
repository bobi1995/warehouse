"use client";
import { Inventory } from "@/db/interfaces/types";
import { thead } from "@/ui/table-style";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const SuggestItemsTable = ({ inventories }: { inventories: Inventory[] }) => {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const selectInventory = (id: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("inventoryId", id.toString());
    return replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <table className="w-full text-gray-900  mt-10">
        <thead className={thead}>
          <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6"></th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Код
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Плавка
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Брой
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Стелаж
            </th>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
              Клетка
            </th>
          </tr>
        </thead>
        <tbody>
          {inventories.map((inventory) => (
            <tr key={inventory.id}>
              <td className="border px-4 py-4 sm:pl-6">
                <button
                  onClick={() => selectInventory(inventory.id)}
                  className="bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-1 px-1 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  Избери
                </button>
              </td>
              <td className="border px-4 py-4 sm:pl-6">
                {inventory.material.lesto_code}
              </td>
              <td className="border px-4 py-4 sm:pl-6">{inventory.lot}</td>
              <td className="border px-4 py-4 sm:pl-6">
                {inventory.quan_dev + inventory.quan_ok}
              </td>

              {inventory.stillage && inventory.cell ? (
                <>
                  <td className="border px-4 py-4 sm:pl-6">
                    {inventory.stillage.name}
                  </td>
                  <td className="border px-4 py-4 sm:pl-6">
                    {inventory.cell.code}
                  </td>
                </>
              ) : (
                <td colSpan={2} className="border px-4 py-4 sm:pl-6">
                  {inventory.storage?.name}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuggestItemsTable;
