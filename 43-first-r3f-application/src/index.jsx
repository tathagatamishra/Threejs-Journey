import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import App from "./App";
import * as THREE from "three";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// Creating an object to be cool
const cameraSettings = {
  fov: 50,
  near: 0.1,
  far: 1000,
  position: [5, 2, 0],
};

// only need to import Canvas
// camera can be modified in <Canvas>
root.render(
  // by default the camera is perspective
  // zoom property is for perspective camera
  // <Canvas
  //   orthographic
  //   camera={{
  //     fov: 50,
  //     zoom: 100,
  //     near: 0.1,
  //     far: 1000,
  //     position: [5, 2, 0],
  //   }}
  // >
  // Both are same
  <Canvas
    // dpr={ [1, 2] }   // default
    // flat
    camera={cameraSettings}
    gl={{
      antialias: false,
      toneMapping: THREE.ACESFilmicToneMapping,   // default
      outputEncoding: THREE.sRGBEncoding    // default
    }}
  >
    <App />
  </Canvas>
);
 