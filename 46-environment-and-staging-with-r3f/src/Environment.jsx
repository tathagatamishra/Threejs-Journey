import { useRef, useState } from "react";

import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import {
  Sky,
  useHelper,
  BakeShadows,
  SoftShadows,
  OrbitControls,
  Lightformer,
  Environment,
  ContactShadows,
  RandomizedLight,
  AccumulativeShadows,
} from "@react-three/drei";

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

  const { Overlay } = useControls({
    Overlay: true,
  });

  const { color, resolution, opacity, blur } = useControls("Shadow", {
    resolution: 720,
    color: "#173d33",
    opacity: {
      value: 0.58,
      min: 0,
      max: 1.5,
      step: 0.001,
    },
    blur: {
      value: 1.55,
      min: 0,
      max: 20,
      step: 0.001,
    },
  });

  const { envMapIntensity, envHeight, envRadius, envScale } = useControls("env map", {
    envMapIntensity: {
      value: 1.5,
      min: 0,
      max: 10,
    },
    envHeight: {
      value: 11,
      min: 0,
      max: 100,
    },
    envRadius: {
      value: 110,
      min: 10,
      max: 1000,
    },
    envScale: {
      value: 120,
      min: 10,
      max: 1000,
    },
  });




  return (
    <>
      {Overlay && <Perf position="top-left" />}

      <OrbitControls makeDefault />

      <ContactShadows
        position={[0, 0, 0]}
        far={5}
        scale={10}
        blur={blur}
        color={color}
        opacity={opacity}
        resolution={resolution}
      />



      {/* Env map cast light */}
      <Environment
        // HDRI texture
        // files={"./environmentMaps/the_sky_is_on_fire_2k.hdr"}
        resolution={2560}

        ground={{
            height: envHeight,
            radius: envRadius,
            scale: envScale
        }}
      
        // to enable texture as background
        // background

        // cube env texture
        // files={[
        //   "./environmentMaps/2/px.jpg",
        //   "./environmentMaps/2/nx.jpg",
        //   "./environmentMaps/2/py.jpg",
        //   "./environmentMaps/2/ny.jpg",
        //   "./environmentMaps/2/pz.jpg",
        //   "./environmentMaps/2/nz.jpg",
        // ]}

        // Presets
        // {
        //   apartment: 'lebombo_1k.hdr',
        //   city: 'potsdamer_platz_1k.hdr',
        //   dawn: 'kiara_1_dawn_1k.hdr',
        //   forest: 'forest_slope_1k.hdr',
        //   lobby: 'st_fagans_interior_1k.hdr',
        //   night: 'dikhololo_night_1k.hdr',
        //   park: 'rooitou_park_1k.hdr',
        //   studio: 'studio_small_03_1k.hdr',
        //   sunset: 'venice_sunset_1k.hdr',
        //   warehouse: 'empty_warehouse_01_1k.hdr',
        // }
        preset='apartment'
      >


        {/* changing background color */}
        <color args={["black"]} attach="background" />
        <Lightformer 
            position-z={-5}
            scale={5}
            color='red'
            intensity={10}
            form='ring'
        />



        <mesh position-z={-5} scale={10}>
          {/* <planeGeometry /> */}
          {/* <meshBasicMaterial color="red" /> */}
          {/* to control illumination */}
          <meshBasicMaterial color={ [10, 0, 0] } />
        </mesh>
     
      </Environment>

      

      <mesh ref={sphere} castShadow position-y={1} position-x={-2}>
        <sphereGeometry />
        <meshStandardMaterial
          color="orange"
          envMapIntensity={envMapIntensity}
          roughness={0.1}
          metalness={0}
        />
      </mesh>

      <mesh ref={cube} castShadow position-y={1} position-x={2} scale={1.5}>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          envMapIntensity={envMapIntensity}
          roughness={0}
          metalness={0.1}
        />
      </mesh>

      <mesh
        // receiveShadow
        position-y={0}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        {/* <planeGeometry /> */}
        <meshStandardMaterial
          color="greenyellow"
          side={THREE.DoubleSide}
          envMapIntensity={envMapIntensity}
        />
      </mesh>
    </>
  );
}
