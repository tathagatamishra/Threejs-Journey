import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import Experience from "./Experience.jsx";


const root = ReactDOM.createRoot(document.querySelector("#root"));

// const created = () => {
//     console.log('created');
// }

// const created = (state) => {
//     console.log(state.gl);
// }

// because state is an object, so destructure the gl from it

// this is canvas color
// this is not html background color

// using webGL
const setBG_1 = ({ gl }) => {
  gl.setClearColor("#ff0000", 1);
};

// using three.js
const setBG_2 = ({ scene }) => {
  scene.background = new THREE.Color("purple");
};



root.render(
    <Canvas
    // contact shadow do not need three.js shadow
    // but AccumulativeShadows needs it
    // shadows
    camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
    }}
    // onCreated={setBG_1}
    // onCreated={setBG_2}
    >

    {/* using r3f jsx */}
    <color args={['pink']} attach='background' />

    {/* background color overwritten inside of Experience */}
    <Experience />
  </Canvas>
);
