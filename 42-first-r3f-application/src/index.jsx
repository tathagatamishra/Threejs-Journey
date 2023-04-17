import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import App from "./App";

const root = ReactDOM.createRoot(document.querySelector("#root"));

// only need to import Canvas
root.render(
  <Canvas>
    <App />
  </Canvas>
);
