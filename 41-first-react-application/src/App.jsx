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
    {/* Both same */}
    {/* {hasClicker && <Clicker />} */}

    {/* 
    {hasClicker && <Clicker />}
    {hasClicker && <Clicker />}
    {hasClicker && <Clicker />}
     */}
    {/* 
    Both same   
    multiple condition & multiple clicker
    one condition & multiple clicker in fragment
    */}
    {/* {hasClicker && <><Clicker /><Clicker /><Clicker /></>} */}


    {/* to make unique count for each clicker component, we need props */}
    {
    hasClicker && 
    <>
      <Clicker keyName="countA" color="red" />
      <Clicker keyName="countB" color="green" />
      <Clicker keyName="countC" color="blue" />
    </>
    }
    {/* using keyName we retrieve data as props in clicker component */}
    </>
  );
}


// How to identify state variable 
// if the variable changes, the application also change