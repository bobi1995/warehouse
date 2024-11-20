const MetalCircle = ({
  diameter,
  thickness,
}: {
  diameter: number;
  thickness: number;
}) => (
  <mesh>
    <cylinderGeometry args={[diameter / 2, diameter / 2, thickness, 64]} />
    <meshStandardMaterial color="grey" />
  </mesh>
);

export default MetalCircle;
