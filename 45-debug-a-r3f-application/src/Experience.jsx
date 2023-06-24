import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";

import Cube from "./Cube";

export default function Experience() {
  const controls = useControls({
    positionX: {
      value: -2,
      max: 10,
      min: -10,
      step: 0.01,
    },
    positionZ: {
      value: 0,
      max: 10,
      min: -1,
      step: 0.01,
    },
    cubeScale: 2,
    planeScale: {
      value: { x: 10, y: 10 },
      step: 0.05,
    },
  });

  // destructure for easy use
  const { positionX, cubeScale, planeScale } = controls;

  console.log(controls);

  // controls using LEVA
  // useControls() take an object
  // to use value, need to use obj.key

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position-x={controls.positionX} position-y={controls.positionZ}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* changing cube scale using prop */}
      {/* using destructured value from controls */}
      <Cube scale={cubeScale} />

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        // to use value of x, y, z need an array
        scale={[planeScale.x, planeScale.y, 1]}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
    </>
  );
}
