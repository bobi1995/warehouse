"use client";
import { Inventory } from "@/db/interfaces/types";
import { toast } from "react-toastify";
import Stillage3D from "@/components/general/stillage-3d";
import CellMatrix3d from "@/components/general/3d/cell-matrix";
import { useState } from "react";
import { shiftInventory } from "@/lib/inventory/action";
import { getErrorMessage } from "@/db/error-messages";
import InventoryTable from "./intentory-table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { formatCellCode } from "@/utils/cell-code";

const InventoryInfo = ({ inventory }: { inventory: Inventory }) => {
  const searchParams = useSearchParams();

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
    if (selectedCell?.id && inventory.stillage?.id && inventory.id) {
      try {
        await shiftInventory(
          inventory.id,
          inventory.stillage.id,
          selectedCell.id
        );
        const params = new URLSearchParams(searchParams);
        params.delete("inventoryId");
        replace(`${pathname}?${params.toString()}`);
        return toast.success(
          `Успешно преместихте ${
            inventory.material.lesto_code
          } в клетка ${formatCellCode(selectedCell.code)} на стелаж ${
            inventory.stillage.name
          }`
        );
      } catch (error: any) {
        toast.error(getErrorMessage(error.message));
      }
    }
  };

  return (
    <div className="p-10 lg:flex justify-between ">
      <InventoryTable inventory={inventory} />
      <div className="flex justify-between lg:block">
        {inventory.stillage && (
          <CellMatrix3d
            shelves={inventory?.stillage?.shelves}
            columns={inventory.stillage?.columns}
            cells={inventory.stillage?.cells ?? []}
            stillageId={inventory.stillage?.id}
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

      {inventory.stillage && inventory.cell ? (
        <div className="w-full lg:w-1/3">
          <div className="h-96 flex lg:block">
            <Stillage3D
              columns={inventory.stillage?.columns}
              rows={inventory.stillage?.shelves}
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
              disabled={inventory.cell?.id === selectedCell?.id}
              onClick={handleShift}
              className="w-52 bg-gradient-to-r from-green-300 to-green-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg border border-green-400 hover:from-green-400 hover:to-green-600 hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              Прехвърли
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default InventoryInfo;
