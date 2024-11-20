import PageBackComponent from "@/components/general/page_back";
import ToggleSectors from "@/components/shift/toggle-sectors";
import { Params } from "@/db/interfaces/params";
import { Inventory } from "@/db/interfaces/types";
import { getInventory } from "@/lib/inventory/read";
import React from "react";

const ShiftPage = async ({ searchParams }: Params) => {
  const inventoryId = parseInt(searchParams.inventoryId);
  let inventory: Inventory | null = null;
  if (inventoryId) {
    inventory = await getInventory(inventoryId);
  }

  return (
    <>
      <PageBackComponent />
      <ToggleSectors inventory={inventory} />
    </>
  );
};

export default ShiftPage;
