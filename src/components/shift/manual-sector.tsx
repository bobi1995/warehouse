"use client";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { searchInventories } from "@/lib/inventory/read";
import { Inventory } from "@/db/interfaces/types";
import SuggestItemsTable from "./manual-sector/suggest-items-table";
const ManualSector = () => {
  const [code, setCode] = useState("");
  const [plavka, setPlavka] = useState("");
  const [inventories, setInventories] = useState<Inventory[]>([]);

  const getInventories = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const inventories = (await searchInventories(code, plavka)) as Inventory[];
    setInventories(inventories);
  };
  return (
    <div className="w-full">
      {
        <div className="flex justify-between  w-full">
          <div className={inventories.length > 0 ? "w-1/2 mt-10" : "w-full"}>
            <form
              onSubmit={getInventories}
              className="flex flex-col justify-center"
            >
              <div className="flex mb-3 items-center justify-center">
                <label
                  className="w-28 mb-3 mt-5 block text-md font-medium text-gray-900"
                  htmlFor="code"
                >
                  ЛЕСТО КОД:
                </label>
                <input
                  className="ml-1 h-12 peer block w-48 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                  id="code"
                  name="code"
                  placeholder="301..."
                  value={code}
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <div className="flex mb-3 items-center justify-center ">
                <label
                  className="w-28 mb-3 mt-5 block text-md font-medium text-gray-900"
                  htmlFor="code"
                >
                  ПЛАВКА:
                </label>
                <input
                  className="ml-1 h-12 peer block w-48 rounded-md border border-gray-200 py-[9px] pl-3 text-sm outline-2 placeholder:text-gray-500"
                  id="code"
                  name="code"
                  placeholder="Номер..."
                  value={plavka}
                  type="text"
                  onChange={(e) => setPlavka(e.target.value)}
                />
              </div>
              <div className="m-auto">
                <button className="flex mt-3 justify-centerw-52 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300 disabled:opacity-50">
                  <MagnifyingGlassIcon className="h-6 w-6" /> Търси
                </button>
              </div>
            </form>
          </div>
          {inventories.length > 0 && (
            <div className="w-1/2 justify-center flex">
              <SuggestItemsTable inventories={inventories} />
            </div>
          )}
        </div>
      }
    </div>
  );
};

export default ManualSector;
