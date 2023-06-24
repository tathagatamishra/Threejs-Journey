import { OrbitControls } from "@react-three/drei";

// for nested folder, need to import { folder } from 'leva
import { button, useControls } from "leva";

import { Perf } from "r3f-perf";

import Cube from "./Cube";

export default function Experience() {
  // leva control panel
  // to make folders, need folder name as 1st parameter
  // 1st parameter = string = folder name
  // 2nd para = { } = controls

  const { Overlay } = useControls({
    Overlay: false,
  });

  const controls = useControls("sphere", {
    position: {
      value: { x: -2, y: 0 },
      step: 0.01,
      joystick: "invertY",
    },

    color: "orange",

    visible: true,
  });

  // destructure for easy use
  const { position, color, visible } = controls;

  console.log(controls);

  // best is to destructure while creating
  const { cubeScale, cubePosition } = useControls("cube", {
    cubeScale: {
      value: 2,
      max: 5,
      min: 0,
      step: 0.01,
    },

    cubePosition: {
      value: { x: 2, y: 0, z: 0 },
      step: 0.01,
    },
  });

  const { planeScale } = useControls("plane", {
    planeScale: {
      value: { x: 10, y: 10 },
      step: 0.05,
    },
  });

  const { interval, click, choice } = useControls("extra", {
    interval: {
      min: 0,
      max: 5,
      value: [3, 4],
    },

    click: button(() => {
      console.log("clicked");
    }),

    choice: { options: ["a", "b", "c"] },
  });

  // controls using LEVA
  // useControls() take an object
  // to use value, need to use obj.key

  return (
    <>
      {Overlay && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh position={[position.x, position.y, 0]} visible={visible}>
        <sphereGeometry />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* changing cube scale using prop */}
      {/* using destructured value from controls */}
      <Cube
        scale={cubeScale}
        position={[cubePosition.x, cubePosition.y, cubePosition.z]}
      />

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
