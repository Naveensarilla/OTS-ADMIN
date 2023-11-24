// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

// const InstractGet = () => {
//   const [points, setPoints] = useState([]);
//   const { examId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3081/instructionpoints`
//         );
//         setPoints(response.data.points); // Use response.data.points to set the state
//         console.log(`djgfhgdfj response`);
//         console.log(examId);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchData();
//   }, []); // Include examId in the dependency array

//   return (
//     <div>
//       <h2>Instruction Points</h2>

//       {points.map((item, examId) => (
//         <ul
//           style={{ display: "flex", gap: "1rem", marginLeft: "2rem" }}
//           key={examId}
//         >
//           <li style={{ listStyle: "disc" }}>{item.examId}</li>
//           <li>{item.points}</li>
//           <li>
//             <Link to={`editIntractions/${item.examId}`}>Edidt</Link>
//           </li>
//           <li>delete</li>
//         </ul>
//       ))}

// <div className="Editing">
// {points.map((item, examId) => (
// <input type="text" value={} />
//  ))}
// </div>

//     </div>
//   );
// };

// export default InstractGet;


// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link, useParams } from "react-router-dom";

// const InstractGet = () => {
//   const [points, setPoints] = useState([]);
//   const [inputValues, setInputValues] = useState({});
//   const { examId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3081/instructionpoints`
//         );
//         setPoints(response.data.points);
//       } catch (error) {
//         console.error("Error fetching data:", error.message);
//       }
//     };

//     fetchData();
//   }, []);


//   const handleInputChange = (examId, value) => {
//     setInputValues((prevValues) => ({
//       ...prevValues,
//       [examId]: value,
//     }));
//     console.log(inputValues); // Check the inputValues in the console
//   };
  


//   return (
//     <div>
//       <h2>Instruction Points</h2>

//       {points.map((item) => (
//         <div key={item.examId}>
//           <ul
//             style={{ display: "flex", gap: "1rem", marginLeft: "2rem" }}
//           >
//             <li style={{ listStyle: "disc" }}>{item.examId}</li>
//             <li>{item.points}</li>
//             <li>
//               <Link to={`editIntractions/${item.examId}`}>Edit</Link>
//             </li>
//             <li>delete</li>
//           </ul>

//           <div className="Editing">
//             <input
//               type="text"
//               value={inputValues[item.examId] || ""}
//               onChange={(e) => handleInputChange(item.examId, e.target.value)}
//             />
//           </div>
          
//         </div>
//       ))}
//     </div>
//   );
// };

// export default InstractGet;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const InstractGet = () => {
  const [points, setPoints] = useState([]);
  const { instructionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/instructionpoints/${instructionId}`);
        const data = await response.json();
        setPoints(data.points);
        console.log('Response:', data);
        console.log('instructionId:', instructionId);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [instructionId]);

  return (
    <div>
      {points.map((item, index) => (
        <div key={index}>
          <input type="text" value={item.points} readOnly />
          <button>edit</button>
        </div>
      ))}
    </div>
  );
};
export default InstractGet;




export const EditInstructions = () => {
  const [points, setPoints] = useState([]);
  const { instructionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/instructionpoints/${instructionId}`);
        const data = await response.json();
        setPoints(data.points);
        console.log('Response:', data);
        console.log('instructionId:', instructionId);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, [instructionId]);

  const handleInputChange = (index, newValue) => {
    const updatedPoints = [...points];
    updatedPoints[index].points = newValue;
    setPoints(updatedPoints);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3081/updatepoints/${instructionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ points }),
      });

      const data = await response.json();
      console.log('Update Response:', data);
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  };

  return (
    <div>
      {points.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            value={item.points}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};
