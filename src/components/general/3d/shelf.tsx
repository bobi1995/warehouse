"use client";
import { Text } from "@react-three/drei";
import React from "react";

interface ShelfProps {
  highlightCell?: string; // E.g., "B2"
  columnCount: number;
  rowCount: number;
}

const Shelf = ({ highlightCell, columnCount, rowCount }: ShelfProps) => {
  const shelfHeight = 4; // Total height of the shelf
  const shelfWidth = 6;
  const shelfDepth = 1.5;
  const columnGap = shelfWidth / columnCount; // Adjusted to represent space between columns
  const rowGap = shelfHeight / (rowCount - 1); // Row gap, excluding ground

  // Convert highlightCell to indices
  const getCellIndices = (cell: string) => {
    const columnLetter = cell.charAt(0); // e.g., "B"
    const rowNumber = parseInt(cell.charAt(1)); // e.g., "2"
    const columnIndex = columnLetter.charCodeAt(0) - "A".charCodeAt(0); // Convert letter to index (A=0, B=1, C=2)
    return { columnIndex, rowIndex: rowNumber };
  };

  const { columnIndex, rowIndex } = highlightCell
    ? getCellIndices(highlightCell)
    : { columnIndex: -1, rowIndex: -1 }; // Default to -1 if no highlightCell

  return (
    <>
      {/* Upright beams (blue): Vertical supports */}
      {[...Array(columnCount + 1)].map((_, colIndex) => (
        <React.Fragment key={`col-front-${colIndex}`}>
          {/* Front beams */}
          <mesh
            position={[
              -shelfWidth / 2 + colIndex * columnGap,
              shelfHeight / 2 - shelfHeight / 2,
              -shelfDepth / 2,
            ]} // Start from ground
          >
            <boxGeometry args={[0.2, shelfHeight, 0.2]} />
            <meshStandardMaterial color="blue" />
          </mesh>
          {/* Back beams */}
          <mesh
            key={`col-back-${colIndex}`}
            position={[
              -shelfWidth / 2 + colIndex * columnGap,
              shelfHeight / 2 - shelfHeight / 2,
              shelfDepth / 2,
            ]} // Start from ground
          >
            <boxGeometry args={[0.2, shelfHeight, 0.2]} />
            <meshStandardMaterial color="blue" />
          </mesh>
        </React.Fragment>
      ))}

      {/* Column labels (3D Text for A, B, C, etc.) */}
      {[...Array(columnCount)].map((_, colIndex) => (
        <Text
          key={`col-label-${colIndex}`}
          position={[
            -shelfWidth / 2 + colIndex * columnGap + columnGap / 2, // Centered between beams
            shelfHeight / 2 + 0.5, // Adjust position to be above the shelf
            0,
          ]}
          fontSize={0.3}
          color="black"
        >
          {String.fromCharCode(65 + colIndex)} {/* A, B, C, etc. */}
        </Text>
      ))}

      {/* Horizontal beams (orange): Rows */}
      {[...Array(rowCount - 1)].map((_, rowIdx) => (
        <React.Fragment key={rowIdx}>
          {/* Front horizontal beams */}
          <mesh
            key={`row-front-${rowIdx + 1}`} // Start from Row 1 above ground
            position={[
              0,
              -shelfHeight / 2 + (rowIdx + 1) * rowGap,
              -shelfDepth / 2,
            ]} // Adjust to row positioning
          >
            <boxGeometry args={[shelfWidth, 0.2, 0.2]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          {/* Back horizontal beams */}
          <mesh
            key={`row-back-${rowIdx + 1}`} // Start from Row 1 above ground
            position={[
              0,
              -shelfHeight / 2 + (rowIdx + 1) * rowGap,
              shelfDepth / 2,
            ]} // Adjust to row positioning
          >
            <boxGeometry args={[shelfWidth, 0.2, 0.2]} />
            <meshStandardMaterial color="orange" />
          </mesh>

          {/* Row labels (3D Text for 1, 2, 3, etc.) */}
          <Text
            key={`row-label-${rowIdx}`}
            position={[
              -shelfWidth / 2 - 0.5, // Place label to the left of the shelf
              -shelfHeight / 2 + (rowIdx + 1) * rowGap,
              0,
            ]}
            fontSize={0.3}
            color="black"
          >
            {rowIdx + 1} {/* 1, 2, 3, etc. */}
          </Text>
        </React.Fragment>
      ))}

      {/* Individual shelves (grey) positioned between the beams */}
      {[...Array(rowCount - 1)].map((_, rowIdx) => (
        <React.Fragment key={rowIdx}>
          {[...Array(columnCount)].map((_, colIdx) => (
            <mesh
              key={`shelf-${rowIdx}-${colIdx}`}
              position={[
                -shelfWidth / 2 + colIdx * columnGap + columnGap / 2, // Center shelf between beams
                -shelfHeight / 2 + (rowIdx + 1) * rowGap,
                0,
              ]} // Position each shelf
            >
              <boxGeometry args={[columnGap - 0.2, 0.1, shelfDepth - 0.2]} />{" "}
              {/* Slightly smaller than the gaps */}
              <meshStandardMaterial
                color={
                  colIdx === columnIndex && rowIdx + 1 === rowIndex
                    ? "green"
                    : "lightgray"
                }
              />
            </mesh>
          ))}
        </React.Fragment>
      ))}

      {/* Realistic pallets positioned on the ground (Row 0) */}
      {[...Array(columnCount)].map((_, colIdx) => (
        <mesh
          key={`palette-${colIdx}`}
          position={[
            -shelfWidth / 2 + colIdx * columnGap + columnGap / 2,
            -shelfHeight / 2 + 0.1, // Pallets at the ground level (row 0)
            0,
          ]} // Center pallets on the shelves
        >
          <boxGeometry args={[columnGap - 0.2, 0.2, shelfDepth - 0.3]} />
          <meshStandardMaterial
            color={colIdx === columnIndex && rowIndex === 0 ? "green" : "beige"} // Highlight pallet at row 0
          />
        </mesh>
      ))}

      {/* Ground level label for Row 0 */}
      <Text
        key={`row-label-0`}
        position={[-shelfWidth / 2 - 0.5, -shelfHeight / 2 + 0.1, 0]} // Ground level
        fontSize={0.3}
        color="black"
      >
        0 {/* Ground row */}
      </Text>
    </>
  );
};

export default Shelf;
