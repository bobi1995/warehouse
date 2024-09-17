"use client";
import { Cell } from "@/db/interfaces/types";
import { useState } from "react";

interface CellMatrixProps {
  shelves: number;
  columns: number;
}

const CellMatrix: React.FC<CellMatrixProps> = ({ shelves, columns }) => {
  const initialGrid = Array(shelves)
    .fill(null)
    .map(() =>
      Array(columns).fill({
        x: 0,
        y: 0,
        z: 0,
        max_weight: 0,
        isolator: false,
      })
    );
  const [grid, setGrid] = useState<Cell[][]>(initialGrid);
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());

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

  const isSelected = (row: number, col: number) => {
    return selectedCells.has(`${row}-${col}`);
  };

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
            const isCellSelected = isSelected(rowIndex, colIndex);

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`flex items-center justify-center p-4 border ${
                  isCellSelected
                    ? "bg-green-200"
                    : cell.isolator
                    ? "bg-red-200"
                    : "bg-gray-300"
                }`}
              >
                {`${rowIndex}-${headerLabels[colIndex]}`}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CellMatrix;
