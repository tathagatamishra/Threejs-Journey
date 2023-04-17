// extend is to create our own declarative element
import * as THREE from 'three'
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CustomObj from "./CustomObj";


// in R3F every three.js classes are declarative
// it means, we do not need to import
// we can directly use mesh, geometry, material ....
// if something is missing, we can create our own declarative element
// using extend

// extend({ OrbitControls: OrbitControls })
extend({ OrbitControls });

export default function App() {
  // const three = useThree();
  // console.log(three);
  // gl is the renderer
  const { camera, gl } = useThree();

  const cubeRef = useRef();
  const groupRef = useRef();

  // useFrame is the game loop
  useFrame((state, delta) => {
    // the state contains lot of things regarding webgl, camera, renderer
    // but to access camera, renderer its better to use useThree hook
    // console.log(state)
    // console.log(delta);

    // this will make the speed same in every devices
    cubeRef.current.rotation.y += delta;
    cubeRef.current.rotation.x += delta;
    cubeRef.current.rotation.z += delta;

    // don't forgot to use .current
    // cubeRef.current.rotation.y += 0.01
    // cubeRef.current.rotation.x += 0.01
    // cubeRef.current.rotation.z += -0.01

    groupRef.current.rotation.y += delta;

    // console.log("tick");
  });

  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />

      {/* Lights */}
      <directionalLight position={[1,2,3]} />
      <ambientLight intensity={0.3} />


      {/* <mesh position={ [2, 0, 0] } scale={ [3, 2, 1] }> */}
      {/* if the value of X, Y, Z are same */}
      {/* for specific position */}
      {/* need to provide ref in the element that we want to use */}
      <mesh ref={cubeRef} rotation-x={Math.PI / 1.5} scale={0.5}>
        <boxGeometry args={[1.5, 1.5, 1.5, 4, 4, 4]} />

        {/* Both same
        <meshBasicMaterial args={[{ color: "red", wireframe: true }]} /> 
        */}
        <meshStandardMaterial color="mediumpurple" wireframe />
      </mesh>

      <group ref={groupRef}>
        <mesh position-x={2} scale={0.5}>
          <sphereGeometry />
          <meshStandardMaterial color="tomato" />
        </mesh>
        <mesh position-x={-2} scale={0.5}>
          <torusGeometry args={[0.8, 0.3]} />
          <meshStandardMaterial color="DodgerBlue" />
        </mesh>
      </group>

      <mesh rotation-x={-Math.PI * 0.5} position-y={-0.6} scale={[5, 5, 2]}>
        <planeGeometry />
        <meshStandardMaterial color="YellowGreen" side={THREE.DoubleSide} />
      </mesh>

      <CustomObj />
    </>
  );
}
