import { useState } from "react";
import Clicker from "./Clicker.jsx";

export default function App() {

  const [hasClicker, setHasClicker] = useState(true)

  // console.log(hasClicker);

  function toggleClicker() {

    setHasClicker(!hasClicker)
  }

  return (
    <>
    <button id="btn" onClick={toggleClicker}>{hasClicker ? 'Hide' : 'Show'}</button>
    {/* <Clicker /> */}
    {/* {hasClicker ? <Clicker /> : null} */}
    {hasClicker && <Clicker />}
    {/* Both same */}
    </>
  );
}


// How to identify state variable 
// if the variable changes, the application also change