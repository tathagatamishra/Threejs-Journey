// import { useThree, extend } from "@react-three/fiber";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import {
  Text,
  Html,
  PivotControls,
  TransformControls,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";

import * as THREE from "three";

// extend({ OrbitControls });

export default function Experience() {
  //   const { camera, gl } = useThree();

  const sphereRef = useRef();
  const cubeRef = useRef();
  const coneRef = useRef();
  const planeRef = useRef();

  return (
    <>
      {/* by default damping disable */}
      {/* <orbitControls args={[camera, gl.domElement]} /> */}

      {/* using drei */}
      {/* by default damping enable */}
      {/* <OrbitControls enableDamping={false} /> */}
      {/* makeDefault will stop orbit control when using gizmo */}
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      {/* two ways to use TransformControls */}
      {/* using reference is the best, because mesh don't depend on TransformControls */}

      <mesh ref={sphereRef} position-x={-4}>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* multiple mode can be added, if using useRef */}
      <TransformControls object={sphereRef} mode="scale" />
      <TransformControls object={sphereRef} mode="translate" />

      {/* Pivot Control */}
      <PivotControls 
      anchor={[0, -.5, 0]}
      depthTest={false}
      lineWidth={3}
      axisColors={['#FF5200', '#4EFF00', '#00BAFF']}
      scale={2}
      // fixed={true}
      >
        <mesh position-y={0.1} ref={coneRef}>
          <coneGeometry args={[1, 2, 10]} />
          <meshStandardMaterial color="HotPink" flatShading={true} />
        </mesh>
        {/* HTML in three.js */}
        <Html
          position={[0,2,0]}
          wrapperClass="label"
          center
          distanceFactor={8}
          // occlude={[planeRef]}
        >
        Cone</Html>
      </PivotControls>

      {/* as TransformControls is parent, assign position & scale to parent  */}

      <TransformControls position-x={4} scale={1.5} mode="rotate">
        <mesh ref={cubeRef}>
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
      </TransformControls>

      <mesh 
      position-y={-1} 
      rotation-x={-Math.PI * 0.5} 
      scale={15}
      ref={planeRef}
      >
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
      </mesh>

      <Text 
      position={[0,4,0]}
      color='red'
      >
      I LOVE THREE.JS</Text>
    </>
  );
}
