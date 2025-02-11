"use client";
import { Cell } from "@/db/interfaces/types";
import { calculateCellWeight } from "@/utils/suggestCell";
import { useEffect, useState, Dispatch, SetStateAction } from "react";

interface CellMatrixProps {
  shelves: number;
  columns: number;
  stillageId: number;
  cells: Cell[];
  selectedCell: { code: string; id: number } | null;
  setSelectedCell: Dispatch<
    SetStateAction<{ code: string; id: number } | null>
  >;
  newWeight: number | null | undefined;
  manual: boolean;
}

const isSelected = (
  row: number,
  col: number,
  selectedCell?: { code: string; id?: number }
) => {
  if (!selectedCell) {
    return false;
  }
  const cellCode = `${row}-${col}`;
  return selectedCell.code === cellCode;
};

const isExistingCell = (
  row: number,
  col: number,
  existingCellCodes: Set<string>
) => {
  const cellCode = `${row}-${col}`;
  return existingCellCodes.has(cellCode);
};

const populateGridWithCells = (grid: any[][], cells: Cell[]) => {
  const newGrid = grid.map((row) => [...row]);
  cells.forEach((cell) => {
    const [row, col] = cell.code.split("-").map(Number);
    if (newGrid[row] && newGrid[row][col]) {
      newGrid[row][col] = {
        ...cell,
        isolator: cell.isolator || false,
      };
    }
  });
  return newGrid;
};

const CellMatrix3d: React.FC<CellMatrixProps> = ({
  shelves,
  columns,
  cells,
  selectedCell,
  setSelectedCell,
  newWeight,
  manual,
}) => {
  const initialGrid = Array(shelves)
    .fill(null)
    .map(() =>
      Array(columns).fill({
        size_x: 0,
        size_y: 0,
        size_z: 0,
        max_weight: 0,
        isolator: false,
      })
    );
  const populatedGrid = populateGridWithCells(initialGrid, cells);

  const [grid, setGrid] = useState<Cell[][]>(populatedGrid);

  const existingCellCodes = new Set(cells.map((cell) => cell.code));

  const handleCellClick = (row: number, col: number, id?: number) => {
    const cellCode = `${row}-${col}`;
    if (id !== undefined) {
      setSelectedCell({ code: cellCode, id });
    } else {
      setSelectedCell(null);
    }
  };

  const headerLabels = Array.from({ length: columns }, (_, index) =>
    String.fromCharCode(65 + index)
  );
  useEffect(() => {
    setGrid(populateGridWithCells(initialGrid, cells));
  }, [cells, initialGrid]);

  return (
    <div className="w-full mt-3">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 100px)`,
          gap: "10px",
          marginBottom: "10px",
          textAlign: "center",
        }}
        className="w-full flex justify-center"
      >
        {headerLabels.map((label, index) => (
          <div
            key={`${index}-${label}`}
            style={{
              textAlign: "center",
              fontWeight: "bold",
              padding: "10px",
            }}
          >
            {label}
          </div>
        ))}
      </div>
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, 100px)`,
            gridTemplateRows: `repeat(${shelves}, 100px)`,
            gap: "10px",
          }}
          className="w-full flex justify-center"
        >
          {grid.flat().map((cell, index) => {
            const rowIndex = Math.floor(index / columns);
            const colIndex = index % columns;
            let isCellSelected;
            if (selectedCell) {
              isCellSelected = isSelected(rowIndex, colIndex, selectedCell);
            }
            const cellExists = isExistingCell(
              rowIndex,
              colIndex,
              existingCellCodes
            );

            const cellId = cell.id;
            const cellWeight = calculateCellWeight(cell.inventories ?? []);
            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex, cellId)}
                className={`text-center tems-center justify-center  border ${
                  isCellSelected
                    ? "bg-green-200"
                    : cell.isolator
                    ? "bg-red-200"
                    : cellExists
                    ? "bg-blue-200"
                    : "bg-gray-300"
                } disabled:opacity-50`}
                disabled={
                  manual
                    ? false
                    : newWeight &&
                      cell.max_weight - (cellWeight + newWeight) <= 0
                    ? true
                    : false
                }
              >
                {`${rowIndex}-${headerLabels[colIndex]}`}
                {cellExists && (
                  <div>
                    <p>
                      {cell.size_width}x{cell.size_length}x{cell.size_height}
                    </p>

                    <p className="flex justify-center">
                      {cell.inventories && cell.inventories.length > 0 ? (
                        <>{cellWeight.toFixed(0)}</>
                      ) : (
                        0
                      )}
                      &nbsp;кг
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CellMatrix3d;
