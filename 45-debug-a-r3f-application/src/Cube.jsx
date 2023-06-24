import React from "react";

// default scale value is 1
export default function Cube({ scale = 1, position=[2,0,0]}) {

  return (

    // getting scale value through prop
    // default value is 1

    <mesh position={position} scale={scale}>
      <boxGeometry />
      <meshStandardMaterial color="mediumpurple" />
    </mesh>
    
  );
}
