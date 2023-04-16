import { useState, useEffect } from "react";

export default function Clicker() {
  
  // const countState = useState(0)
  // console.log(countState);
  // const count = countState[0]
  // const setCount = countState[1]
  
  // console.log('render');  // log two time == call setCount 2 time
  // the component will re-render multiple times if setCount called multiple times

  // useState to create reactive data
  // const [count, setCount] = useState(0)
  const [count, setCount] = useState(parseInt(localStorage.getItem('count') ?? 0))

  // let count = 0;

  useEffect(() => 
  {
    // localStroage only store string
    // const savedCount = parseInt(localStorage.getItem('count') ?? 0)
    // if no item == NaN || undefined => print 0
    // setCount(savedCount)
    // console.log(savedCount);
    console.log('first render');   
    // if this component destroyed & recreate again, this log will be called again


    // return in a useEffect only called when this component will be destroied
    return () => console.log('Component disposed');
  }, [])
  // [] will make useEffect call only on first render

  // useEffect to control re-render
  useEffect(() => 
  {
    localStorage.setItem('count', count)
    // console.log('hello');
  }, [count])  
  // specify a reactive data inside []
  // useEffect will be called whenever that data will change 

  function inc() {

    setCount(count + 1)      
    // setCount(value => value + 1)

    // count++
    console.log(count);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={inc}>Click</button>
    </div> 
  );
}
