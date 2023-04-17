import { useRef, useState, useEffect } from "react";


// if the the color key not present in a <Clicker />, then make a default color
export default function Clicker({increment, keyName, color="blue"}) {  
  // destructering props
  
  // if their is any key present in <Clicker />, it will be props
  // console.log(increment, keyName, color);

  // const countState = useState(0)
  // console.log(countState);
  // const count = countState[0]
  // const setCount = countState[1]
  
  // console.log('render');  // log two time == call setCount 2 time
  // the component will re-render multiple times if setCount called multiple times

  // useState to create reactive data
  // const [count, setCount] = useState(0)
  
  // localStorage take key name as a string
  // const [count, setCount] = useState(parseInt(localStorage.getItem('count') ?? 0))

  // Making it dynamic, by providing keyName
  const [count, setCount] = useState(parseInt(localStorage.getItem(keyName) ?? 0))

  // let count = 0;


  // creating a ref
  const btnRef = useRef()
  // console.log(btnRef);
  // but this btnRef is being ref inside <button ref={ btnRef }> which is not exist/rendered yet
  // so we need to call it after first render

  useEffect(() => 
  {
    // btnRef
    btnRef.current.style.backgroundColor = 'papayawhip'
    btnRef.current.style.color = 'salmon'


    // localStorage only store string
    // const savedCount = parseInt(localStorage.getItem('count') ?? 0)
    // if no item == NaN || undefined => print 0
    // setCount(savedCount)
    // console.log(savedCount);


    // 😵‍💫 WEIRD EFFECT
    // this useEffect will be called first time only
    console.log('first render');   
    // if this component destroyed & recreate again, this log will be called again


    // 😵‍💫 WEIRD EFFECT
    // return in a useEffect only called when this component will be destroyed
    return () => 
    {
      console.log('Component disposed');

      // localStorage.removeItem('count')
      localStorage.removeItem(keyName)
    }

  }, [])
  // [] will make useEffect call only on first render

  // useEffect to control re-render
  useEffect(() => 
  {
    // localStorage.setItem('count', count)
    localStorage.setItem(keyName, count)
    // console.log('hello');
  }, [count])  
  // specify a reactive data inside []
  // useEffect will be called whenever that data will change 

  function inc() {

    setCount(count + 1)      
    // setCount(value => value + 1)

    // count++
    console.log(count);


    // lift the state up
    // global increment coming from parent
    increment()
  }

  return (
    <div>
      {/* <h1 style={{ color: color }}>{count}</h1> */}
      {/* in ES6, when the name of key-value is same */}
      <h1 style={{ color }}>{count}</h1>
      <button ref={ btnRef } onClick={ inc }>Click</button>
    </div> 
  );
}
