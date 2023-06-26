import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

export default function Experience() {
  const cube = useRef();
  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  const sphere = useRef();
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    sphere.current.position.x = Math.sin(time) / 2 - 2;
  });

  const { Overlay } = useControls('Performance', {
    Overlay: true,
  });

  return (
    <>
      {Overlay && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <Stage>

        <mesh ref={sphere} castShadow position-y={0} position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" roughness={0.1} metalness={0} />
        </mesh>

        <mesh ref={cube} castShadow position-y={0} position-x={2} scale={1.5}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" roughness={0} metalness={0.1} />
        </mesh>

      </Stage>
    </>
  );
}
