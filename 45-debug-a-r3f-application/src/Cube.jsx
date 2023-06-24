import React from "react";

// default scale value is 1
export default function Cube({ scale = 1 }) {

  return (

    // getting scale value through prop
    // default value is 1

    <mesh position-x={2} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
    
  );
}
