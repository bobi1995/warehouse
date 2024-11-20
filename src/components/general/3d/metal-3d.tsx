import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React from "react";
import MetalCircle from "./figures/circle";
import MetalSheet from "./figures/sheet";

interface MetalFormData {
  shape: string;
  thickness?: number;
  diameter?: number;
  width?: number;
  length?: number;
}

const MetalForm3D: React.FC<MetalFormData> = ({
  shape,
  diameter,
  width,
  length,
  thickness,
}) => {
  const renderShape = () => {
    switch (shape) {
      case "circle":
        return diameter && thickness ? (
          <MetalCircle diameter={diameter} thickness={thickness} />
        ) : null;
      case "sheet":
        return width && length && thickness ? (
          <MetalSheet width={width} length={length} thickness={thickness} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />{" "}
      {renderShape()}
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    </Canvas>
  );
};

export default MetalForm3D;
