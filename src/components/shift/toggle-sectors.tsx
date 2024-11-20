"use client";
import React, { useState } from "react";
import ManualSector from "./manual-sector";
import ScanSector from "./scan-sector";
import { Inventory } from "@/db/interfaces/types";
import InventoryInfo from "./inventory/inventory-info";

interface ToggleSectorsProps {
  inventory: Inventory | null;
}

const ToggleSectors: React.FC<ToggleSectorsProps> = ({ inventory }) => {
  const [showScan, setShowScan] = useState(true);

  const toggleSector = () => {
    setShowScan((prev) => !prev);
  };

  return (
    <div className="bg-white space-y-6 shadow-lg rounded-lg  w-11/12 m-auto py-5">
      {!inventory ? (
        <>
          <div className="m-auto justify-center flex mb-10 ">
            <button
              onClick={toggleSector}
              className="w-40 m-auto text-center px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              {showScan ? "Въведи Ръчно" : "Сканирай"}
            </button>
          </div>

          <div className="flex justify-around items-stretch gap-10 h-96">
            {showScan ? <ScanSector /> : <ManualSector />}
          </div>
        </>
      ) : (
        <InventoryInfo inventory={inventory} />
      )}
    </div>
  );
};

export default ToggleSectors;
