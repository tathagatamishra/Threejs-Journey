import "./style.css";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

import { StrictMode } from "react";

import { Leva } from "leva";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <StrictMode>
    {/* to configure leva, need to use outside of Canvas */}
    <Leva
      // theme={myTheme} // you can pass a custom theme (see the styling section)
      // fill // default = false,  true makes the pane fill the parent dom node it's rendered in
      // flat // default = false,  true removes border radius and shadow
      // oneLineLabels // default = false, alternative layout for labels, with labels and fields on separate rows
      // hideTitleBar // default = false, hides the GUI header
      collapsed // default = false, when true the GUI is collpased
      // hidden // default = false, when true the GUI is hidden
    />

    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-7, 3, 10],
      }}
    >
      <Experience />
    </Canvas>
  </StrictMode>
);
