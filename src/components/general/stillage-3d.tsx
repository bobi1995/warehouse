"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Shelf from "./3d/shelf";
const Shelf3D = ({
  rows,
  columns,
  selectedCell,
}: {
  rows: number;
  columns: number;
  selectedCell: { code: string; id: number };
}) => {
  const [row, col] = selectedCell.code.split("-");
  const letter = String.fromCharCode(65 + parseInt(col));

  return (
    <Canvas
    //camera={{ position: [0, 5, 10], fov: 50 }}
    >
      {/* Lighting */}

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Shelf Component with a highlighted cell */}
      <Shelf
        highlightCell={`${letter}${row}`}
        columnCount={columns}
        rowCount={rows}
      />
      {/* Controls for rotating the view */}
      <OrbitControls />
    </Canvas>
  );
};

export default Shelf3D;
