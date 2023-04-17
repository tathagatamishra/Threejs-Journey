import { useMemo, useState } from "react";
import Clicker from "./Clicker.jsx";
import People from "./People.jsx";

export default function App({clickerCount, children}) {

  // retrieving App's children 
  console.log(clickerCount, children);

  const [hasClicker, setHasClicker] = useState(true)

  // creating global clicker
  const [count, setCount] = useState(0)

  function increment() {
    setCount(count + 1)
  }


  // console.log(hasClicker);

  function toggleClicker() {

    setHasClicker(!hasClicker)
  }


  // randomize HSL color
  // console.log(`hsl(${Math.random() * 360}deg, 100%, 70%)`);

  // const randomColors = []

  // for(let i=0; i<clickerCount; i++) 
  // {
  //   randomColors.push(`hsl(${Math.random() * 360}deg, 100%, 60%)`)
  // }

  // but the color will change in every re-render


  // useMemo will prevent the changing
  // its like a cash memory
  const randomColors = useMemo(() => 
  {
    const colors = []

    for(let i=0; i<clickerCount; i++) 
    {
      colors.push(`hsl(${Math.random() * 360}deg, 100%, 60%)`)
    }
    
    return colors
  }, [ clickerCount ]) // this is dependency array
  // randomColors will be called when the value of clickerCount change


  // creating an array which is clickerCount long
  // const tempArray = [...Array(clickerCount)]


  return (
    <>

    {/* using App's children */}
    { children }

    <h3>Total count: {count}</h3>

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
    {/* {
    hasClicker && 
    <>
      <Clicker increment={increment} keyName="countA" color="red" />
      <Clicker increment={increment} keyName="countB" color={`hsl(${Math.random() * 360}deg, 100%, 70%)`} />
      <Clicker increment={increment} keyName="countC" />
    </>
    } */}
    {/* using keyName we retrieve data as props in clicker component */}


    {/* creating an array which is clickerCount long */}
    {
      hasClicker &&
      <>
        { [...Array(clickerCount)].map((value, index) => 


          // Each child in a list should have a unique "key" prop.
          // to remove the error need, key={ index }
          <Clicker 
            key={ index }
            increment={ increment } 
            keyName={ `count${index}` } 
            color={ randomColors[index] } 
          />
        
        ) }
      </>
    }

      <People />
    </>
  );
}


// How to identify state variable 
// if the variable changes, the application also change