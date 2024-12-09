import PageBackComponent from "@/components/general/page_back";
import ToggleSectors from "@/components/shift/toggle-sectors";
import { Params } from "@/db/interfaces/params";
import { Storage, Stillage } from "@/db/interfaces/types";
import { getInventory } from "@/lib/inventory/read";
import getStillages from "@/lib/stillage/read";
import getStorages from "@/lib/storage/read";
import React from "react";

const ShiftPage = async ({ searchParams }: Params) => {
  const stillages = (await getStillages()) as Stillage[];
  const storages = (await getStorages()) as Storage[];
  const inventoryId = parseInt(searchParams.inventoryId);
  let inventory: any | null = null;
  if (inventoryId) {
    inventory = await getInventory(inventoryId);
  }

  return (
    <>
      <PageBackComponent />
      <ToggleSectors
        inventory={inventory}
        stillages={stillages}
        storages={storages}
      />
    </>
  );
};

export default ShiftPage;
