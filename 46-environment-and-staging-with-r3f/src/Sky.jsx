import { useRef, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import {
  Sky,
  useHelper,
  BakeShadows,
  SoftShadows,
  OrbitControls,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";

import { useControls } from "leva";

import { Perf } from "r3f-perf";


export default function Experience() {

  // directional light helper
  // directionalLight is r3f element
  // helper is from drei
  // with useHelper() assigning helper to light

  const directionalLight = useRef();
  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);


  const cube = useRef();
  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });


  const sphere = useRef();
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    sphere.current.position.x = Math.sin(time) / 2 - 2;
  });




  const { Overlay } = useControls({
    Overlay: true,
  });

  const { SunPosition } = useControls("Sky", {
    SunPosition: {
      value: [1,2,3]
    },
  });

  const { color, resolution, opacity, blur } = useControls("Shadow", {
    resolution: 720,
    color: '#173d33',
    opacity: {
      value: 0.58,
      min: 0,
      max: 1.5,
      step: .001
    },
    blur: {
      value: 1.55,
      min: 0,
      max: 20,
      step: .001
    }
  });


  return (
    <>
      {Overlay && <Perf position="top-left" />}

      <OrbitControls makeDefault />


      {/* <BakeShadows /> */}
      {/* <SoftShadows
        frustum={3.75}
        size={50}
        near={9.5}
        samples={17}
        rings={11}
      /> */}

      <ContactShadows
        position={[0, -0.999, 0]}
        far={5}
        scale={10}

        // to bake the shadow
        // frames={1}

        blur={blur}
        color={color}
        opacity={opacity}
        resolution={resolution}
      />




      <Sky sunPosition={SunPosition} />


      {/* changing background color */}
      <color args={["#301934"]} attach="background" />



      <directionalLight
        ref={directionalLight}
        position={SunPosition}
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



      <mesh ref={sphere} castShadow position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh ref={cube} castShadow position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh
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
