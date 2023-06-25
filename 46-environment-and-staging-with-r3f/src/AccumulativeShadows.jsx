import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useHelper,
  BakeShadows,
  SoftShadows,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import { useRef, useState } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

export default function Experience() {

  // directional light helper
  // directionalLight is r3f element
  // helper is from drei
  // with useHelper() assigning helper to light
  // const directionalLight = useRef();
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  const cube = useRef();

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });


  const sphere = useRef();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    sphere.current.position.x = Math.sin(time)/2 - 2;
  });

  const [hovered, hover] = useState(false);

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows
        frustum={3.75}
        size={50}
        near={9.5}
        samples={17}
        rings={11}
      /> */}

      {/* changing background color */}
      <color args={["#301934"]} attach="background" />

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      {/* Accumulative Shadows is an external shadow */}
      {/* to use AccumulativeShadows, need to turn off receiveShadow from mesh */}
      <AccumulativeShadows
        position={[0, -0.999, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        // frames will make the shadow smooth
        // but create freeze frame on first load
        // frames={100}
        // frames={1000}
        frames={Infinity}
        // infinity will make the shadow animate with mesh
        // but it create jitter
        blend={100}
        // temporal will fix the freeze frame
        // but it create wired pattern
        // to remove wired pattern, remove light helper
        temporal
      >
        {/* for directional light we need castShadow */}
        {/* castShadow is by default implemented in RandomizedLight */}
        <RandomizedLight
          amount={10}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
          position={[1, 2, 3]}
          // castShadow
        />
      </AccumulativeShadows>

      <directionalLight
        // ref={directionalLight}
        position={[1, 2, 3]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={5}
        shadow-camera-right={5}
        shadow-camera-bottom={-5}
        shadow-camera-left={-5}
      />
      <ambientLight intensity={0.5} />

      <mesh
        ref={sphere}
        castShadow
        position-x={-2}
        // onPointerOver={() => hover(true)}
        // onPointerOut={() => hover(false)}
      >
        <sphereGeometry />
        <meshStandardMaterial
          // color={hovered ? "hotpink" : "orange"}
          color="orange"
        />
      </mesh>

      <mesh ref={cube} castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
        // AccumulativeShadows do not need to receiveShadow
        // receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>
    </>
  );
}
