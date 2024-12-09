"use client";
import { Inventory, Stillage, Storage } from "@/db/interfaces/types";
import { toast } from "react-toastify";
import Stillage3D from "@/components/general/stillage-3d";
import CellMatrix3d from "@/components/general/3d/cell-matrix";
import { useState } from "react";
import { shiftInventory, shiftToStorage } from "@/lib/inventory/action";
import { getErrorMessage } from "@/db/error-messages";
import InventoryTable from "./intentory-table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { formatCellCode } from "@/utils/cell-code";
import ChangeStillageBtn from "@/components/inbound/change-stillage-btn";
import ChangeStorage from "./change/change-storage";
import { suggestCell } from "@/utils/suggestCell";

const InventoryInfo = ({
  inventory,
  stillages,
  storages,
}: {
  inventory: Inventory;
  stillages: Stillage[];
  storages: Storage[];
}) => {
  const searchParams = useSearchParams();
  const [stillage, setStillage] = useState(inventory.stillage);
  const [storage, setStorage] = useState(inventory.storage);

  const pathname = usePathname();
  const { replace } = useRouter();

  const [selectedCell, setSelectedCell] = useState<{
    code: string;
    id: number;
  } | null>({
    code: inventory.cell?.code ?? "",
    id: inventory.cell?.id ?? 0,
  });

  const handleShift = async () => {
    try {
      if (stillage?.id && selectedCell?.id) {
        await shiftInventory(inventory.id, stillage.id, selectedCell.id);
        const params = new URLSearchParams(searchParams);
        params.delete("inventoryId");
        replace(`${pathname}?${params.toString()}`);
        return toast.success(
          `Успешно преместихте ${
            inventory.material.lesto_code
          } в клетка ${formatCellCode(selectedCell.code)} на стелаж ${
            stillage.name
          }`
        );
      } else if (storage) {
        console.log(storage.id);
        await shiftToStorage(inventory.id, storage.id);
        const params = new URLSearchParams(searchParams);
        params.delete("inventoryId");
        replace(`${pathname}?${params.toString()}`);
        return toast.success(
          `Успешно преместихте ${inventory.material.lesto_code} в склад ${inventory.storage?.name}`
        );
      }
    } catch (error: any) {
      toast.error(getErrorMessage(error.message));
    }
  };

  return (
    <div className="p-10 lg:flex justify-between ">
      <InventoryTable inventory={inventory} />
      <div className="flex justify-between lg:block">
        {stillage && (
          <CellMatrix3d
            shelves={stillage?.shelves}
            columns={stillage?.columns}
            cells={stillage?.cells ?? []}
            stillageId={stillage?.id}
            selectedCell={selectedCell}
            setSelectedCell={setSelectedCell}
            newWeight={
              inventory.material.weight &&
              (inventory.quan_dev + inventory.quan_ok) *
                inventory.material.weight
            }
            manual={true}
          />
        )}
      </div>

      {stillage && inventory.cell ? (
        <div className="w-full lg:w-1/3">
          <div className="h-96 flex lg:block">
            <Stillage3D
              columns={stillage?.columns}
              rows={stillage?.shelves}
              selectedCell={selectedCell ? selectedCell : inventory.cell}
            />
            <div className="flex space-x-4 items-center bg-gray-100 p-4 rounded-lg shadow-md justify-around">
              <div className="text-gray-700 font-semibold">
                Текущ:{" "}
                <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded">
                  {formatCellCode(inventory.cell?.code)}
                </span>
              </div>
              <div className="text-gray-700 font-semibold">
                Нов:{" "}
                <span className="text-green-600 bg-green-100 px-2 py-1 rounded">
                  {selectedCell && formatCellCode(selectedCell?.code)}
                </span>
              </div>
            </div>
          </div>
          <div className="text-center lg:mt-20">
            <button
              onClick={handleShift}
              className="w-52 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              ПРЕХВЪРЛИ
            </button>

            <ChangeStillageBtn
              setStillage={setStillage}
              stillage={stillage}
              stillages={stillages}
            />
            <ChangeStorage
              storage={storage}
              setStorage={setStorage}
              storages={storages}
              setStillage={setStillage}
            />
          </div>
        </div>
      ) : null}

      {storage && (
        <div className="text-center lg:mt-20">
          <button
            onClick={handleShift}
            className="w-52 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
          >
            ПРЕХВЪРЛИ
          </button>
          <ChangeStorage
            storage={storage}
            setStorage={setStorage}
            storages={storages}
            setStillage={setStillage}
          />
          <ChangeStillageBtn
            setStillage={setStillage}
            stillage={stillage}
            stillages={stillages}
          />
        </div>
      )}
    </div>
  );
};

export default InventoryInfo;
