import { Inventory } from "@/db/interfaces/types";
import getInventories from "@/lib/inventory/read";
import React from "react";
import InventoryTable, { GroupedInventory } from "./table-inventory/table";
import SearchUser from "../in/users/search-user";
import Pagination from "../in/users/pagination";
import itemsPerPage from "../general/items-per-page";
import { auth } from "@/auth/auth";

const groupInventories = (inventories: Inventory[]): GroupedInventory[] => {
  const grouped = inventories.reduce((acc, inventory) => {
    const code = inventory.material.lesto_code;

    if (!acc[code]) {
      acc[code] = {
        lesto_code: code,
        total_quan_ok: 0,
        total_quan_dev: 0,
        desc: inventory.material.desc,
        lot: inventory.lot,
        order: inventory.order,
        details: [],
        materialId: inventory.materialId,
      };
    }

    acc[code].total_quan_ok += inventory.quan_ok;
    acc[code].total_quan_dev += inventory.quan_dev;
    acc[code].details.push(inventory);

    return acc;
  }, {} as any);

  return Object.values(grouped);
};

const TableInventory = async ({
  query,
  currentPage,
  type,
}: {
  query: string;
  currentPage: number;
  type: "outbound" | "reference";
}) => {
  const inventories = await getInventories();
  const session = await auth();
  const groupedInventories = groupInventories(inventories as Inventory[]);

  const filteredInventories = groupedInventories.filter(
    (inventory) =>
      inventory.lesto_code.includes(query) ||
      inventory.desc.includes(query) ||
      inventory.lot.includes(query)
  );

  const { totalPages, data } = itemsPerPage(currentPage, filteredInventories);

  return (
    <div className="w-11/12 py-10 items-center bg-white shadow-lg rounded-lg m-auto">
      <div className="w-11/12 m-auto">
        <SearchUser placeholder="Търси по код, описание или партида..." />
      </div>
      <InventoryTable
        groupedInventories={data}
        type={type}
        email={session?.user?.email}
      />
      <Pagination totalPages={totalPages} />
    </div>
  );
};

export default TableInventory;
