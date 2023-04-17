import { useEffect, useState } from "react";

export default function People() {
  const [people, setPeople] = useState([]);

  // console.log(people);


//   function getPeople() 
//   {
//     const request = fetch('https://jsonplaceholder.typicode.com/users')
    
//     request.then((response) =>
//     {
//         const jsonData = response.json()

//         jsonData.then((data) => 
//         {
//             console.log(data);
//         })
//     })
//   }
//   function getPeople() 
//   {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) =>
//     {
//         response.json()
//         .then((data) => 
//         {
//             console.log(data);
//         })
//     })
//   }
//   function getPeople() 
//   {
//     fetch('https://jsonplaceholder.typicode.com/users')
//     .then(response => response.json())
//     .then(data => console.log(data))
//   }
  async function getPeople() 
  {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const data = await response.json()

    console.log(data)

    setPeople(data)
  }


  useEffect(() => 
  {
    getPeople()
  }, []);

  return (
    <>
      <h1>People</h1>

      <ul>
        {people.map((person) => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </>
  );
}
