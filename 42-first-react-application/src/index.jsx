import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App";

const root = createRoot(document.querySelector("#root"));

root.render(
  <div className="theDiv">


    {/* these are child of App component */}
    <App clickerCount={ 3 }>
      <h1>First React App</h1>
      <h3>thanks to three.js journey</h3>
    </App>

    {/* Both same */}

    {/* 
    <App
      children={
        <>
          <h1>First React App</h1>
          <h3>thanks to three.js journey</h3>
        </>
      }
    /> 
    */}

  </div>
);
