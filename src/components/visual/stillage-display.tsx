import React from "react";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import { Cell, Stillage } from "@/db/interfaces/types";
import { formatCellCode } from "@/utils/cell-code";
import * as Tooltip from "@radix-ui/react-tooltip";
import clsx from "clsx";

interface StillageDisplayProps {
  stillage: Stillage;
  setStillage: (stillage: undefined) => void;
}

const StillageDisplay: React.FC<StillageDisplayProps> = ({
  stillage,
  setStillage,
}) => {
  console.log(stillage);

  const groupCellsByRow = (cells: Cell[] | undefined) => {
    const rows: any[] = [];
    cells?.forEach((cell: Cell) => {
      const rowIndex = parseInt(cell.code.split("-")[0], 10);
      if (!rows[rowIndex]) {
        rows[rowIndex] = [];
      }
      rows[rowIndex].push(cell);
    });
    return rows;
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const calculateTotalWeight = (inventories: any[]) => {
    return inventories
      .reduce((total, inventory) => {
        const weight = inventory.material.weight ?? 0.0;
        const quantity = inventory.quan_ok + inventory.quan_dev;
        return total + weight * quantity;
      }, 0)
      .toFixed(2);
  };

  const rows = groupCellsByRow(stillage.cells);

  return (
    <div>
      <button
        className="bg-main-100 text-xl p-2 text-white rounded-md flex items-center justify-center m-auto my-5 w-28"
        onClick={() => setStillage(undefined)}
      >
        <ArrowLeftCircleIcon className="w-6 h-6" />
        Назад
      </button>
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex flex-wrap">
          {row.map((cell: Cell, cellIndex: number) => (
            <div key={cellIndex} className="my-4 w-1/3 px-2">
              <h3 className="text-lg font-bold">
                {formatCellCode(cell.code)} (макс:{cell.max_weight} кг.){" "}
                {cell.isolator && "(ИЗОЛАТОР)"}
              </h3>
              <table
                className={clsx(
                  "min-w-full bg-white text-sm",
                  cell.isolator && "bg-red-100"
                )}
              >
                <thead>
                  <tr>
                    <th className="py-1">Material Name</th>
                    <th className="py-1">Lot</th>
                    <th className="py-1">Order</th>
                    <th className="py-1">Quantity</th>
                    <th className="py-1">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {cell.inventories &&
                    cell.inventories.map((inventory, idx) => (
                      <tr key={idx}>
                        <td className="border px-2 py-1">
                          {inventory.material.desc}
                        </td>
                        <td className="border px-2 py-1">
                          <Tooltip.Provider>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button className="IconButton">
                                  {truncateText(inventory.lot, 10)}
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="TooltipContent bg-gray-800 text-white p-2 rounded"
                                  sideOffset={5}
                                >
                                  {inventory.lot}
                                  <Tooltip.Arrow className="TooltipArrow fill-gray-800" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        </td>
                        <td className="border px-2 py-1">
                          <Tooltip.Provider>
                            <Tooltip.Root>
                              <Tooltip.Trigger asChild>
                                <button className="IconButton">
                                  {truncateText(inventory.order, 10)}
                                </button>
                              </Tooltip.Trigger>
                              <Tooltip.Portal>
                                <Tooltip.Content
                                  className="TooltipContent bg-gray-800 text-white p-2 rounded"
                                  sideOffset={5}
                                >
                                  {inventory.order}{" "}
                                  <Tooltip.Arrow className="TooltipArrow fill-gray-800" />
                                </Tooltip.Content>
                              </Tooltip.Portal>
                            </Tooltip.Root>
                          </Tooltip.Provider>
                        </td>
                        <td className="border px-2 py-1">
                          {inventory.quan_ok}
                        </td>
                        <td className="border px-2 py-1">
                          {(
                            (inventory.material.weight ?? 0.0) *
                            (inventory.quan_ok + inventory.quan_dev)
                          ).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  {cell.inventories && (
                    <tr>
                      <td className="border px-2 py-1 font-bold" colSpan={4}>
                        Total Weight
                      </td>
                      <td className="border px-2 py-1 font-bold">
                        {calculateTotalWeight(cell.inventories)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default StillageDisplay;
