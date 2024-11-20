import React, { useRef } from "react";
import { Mesh } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Environment } from "@react-three/drei";

interface MetalSheetProps {
  width: number;
  length: number;
  thickness: number;
}

const MetalSheet: React.FC<MetalSheetProps> = ({
  width,
  length,
  thickness,
}) => {
  const ref = useRef<Mesh>(null);

  // Rotate the sheet for perspective
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 8;
      ref.current.rotation.y = Math.PI / 6;
    }
  });

  return (
    <>
      <mesh position={[0, thickness / 2, 0]}>
        <boxGeometry args={[width, thickness, length]} />
        <meshStandardMaterial color="#B0B0B0" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* <Environment preset="city" /> 
      <mesh ref={ref} position={[0, thickness / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, thickness, length]} />
        <meshStandardMaterial
          color="#B0B0B0"
          metalness={0.9} 
          roughness={0.1} 
        />
      </mesh> */}
    </>
  );
};

export default MetalSheet;
