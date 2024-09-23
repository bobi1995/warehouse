"use client";
import { Cell } from "@/db/interfaces/types";
import { useEffect, useState } from "react";
import CellForm from "./cell-form";

interface CellMatrixProps {
  shelves: number;
  columns: number;
  stillageId: number;
  cells: Cell[];
}

const isSelected = (row: number, col: number, selectedCells: Set<String>) => {
  return selectedCells.has(`${row}-${col}`);
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

const CellMatrix: React.FC<CellMatrixProps> = ({
  shelves,
  columns,
  stillageId,
  cells,
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

  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const existingCellCodes = new Set(cells.map((cell) => cell.code));

  const handleCellClick = (row: number, col: number) => {
    const cellKey = `${row}-${col}`;
    setSelectedCells((prevSelectedCells) => {
      const updatedSelection = new Set(prevSelectedCells);
      if (updatedSelection.has(cellKey)) {
        updatedSelection.delete(cellKey);
      } else {
        updatedSelection.add(cellKey);
      }
      return updatedSelection;
    });
  };

  const headerLabels = Array.from({ length: columns }, (_, index) =>
    String.fromCharCode(65 + index)
  );
  useEffect(() => {
    setGrid(populateGridWithCells(initialGrid, cells));
  }, [cells]);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 100px)`,
          gap: "10px",
          marginBottom: "10px",
        }}
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
        >
          {grid.flat().map((cell, index) => {
            const rowIndex = Math.floor(index / columns);
            const colIndex = index % columns;
            const isCellSelected = isSelected(
              rowIndex,
              colIndex,
              selectedCells
            );
            const cellExists = isExistingCell(
              rowIndex,
              colIndex,
              existingCellCodes
            );

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`text-center tems-center justify-center  border ${
                  isCellSelected
                    ? "bg-green-200"
                    : cell.isolator
                    ? "bg-red-200"
                    : cellExists
                    ? "bg-blue-200"
                    : "bg-gray-300"
                }`}
              >
                {`${rowIndex}-${headerLabels[colIndex]}`}
                {cellExists && (
                  <div>
                    <p>
                      {cell.size_x}x{cell.size_y}x{cell.size_z}
                    </p>
                    <p>{cell.max_weight}кг</p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
        {selectedCells.size > 0 && (
          <CellForm selectedCells={selectedCells} stillageId={stillageId} />
        )}
      </div>
    </div>
  );
};

export default CellMatrix;
