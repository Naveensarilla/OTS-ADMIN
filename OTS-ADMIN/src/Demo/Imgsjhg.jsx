// import React, { useEffect, useState } from 'react';

// const Imgsjhg = () => {
//   const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchSubjectData = async () => {
//       try {
//         const response = await fetch('http://localhost:3081/getSubjectData/4');
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSubjectData();
//   }, []); // Empty dependency array means this effect will only run once

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   // Now you can use the 'data' state which holds the response from the server
//   const { document, questions, options, solutions } = data;

//   return (
//     <div>
//       <h2>Document:</h2>
//       <p>{document.documen_name}</p>

//       <h2>Questions:</h2>
//       <ul>
//         {questions.map((question) => (
//           <li key={question.question_id}>
//             <img src={`data:image/png;base64,${question.question_img}`} alt={`Question ${question.question_id}`} />
//           </li>
//         ))}
//       </ul>

//       <h2>Options:</h2>
//       <ul>
//         {options.map((option) => (
//           <li key={option.question_id}>
//             <img src={`data:image/png;base64,${option.option_img}`} alt={`Option ${option.question_id}`} />
//           </li>
//         ))}
//       </ul>

//       <h2>Solutions:</h2>
//       <ul>
//         {solutions.map((solution) => (
//           <li key={solution.question_id}>
//             <img src={`data:image/png;base64,${solution.solution_img}`} alt={`Solution ${solution.question_id}`} />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Imgsjhg;



import React, { useState, useEffect } from 'react';

function Imgsjhg() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3081/getSubjectData/1');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts.

  if (!data) {
    return <div>Loading...</div>;
  }

  // Render your component using the fetched data
  return (
    <div>
      {/* Access data as needed, for example: */}
      <h1>{data.document.documen_name}</h1>
      {/* Map over questions and render them */}
      {data.questions.map((question) => (
       <div className='q1s' style={{display:'flex',gap:'2rem'}}>
         <div key={question.question_id} >
         <div className='question'>
         <img src={`data:image/png;base64,${question.question_img}`} alt="Question" />
         </div>
          
          {/* Map over options and render them */}
          {data.options
            .filter((opt) => opt.question_id === question.question_id)
            .map((option) => (
             <div className='option'>
                 <img key={option.question_id} src={`data:image/png;base64,${option.option_img}`} alt="Option" />
             </div>
            ))}
          
          {/* Render solutions similarly */}
          {data.solutions
            .filter((sol) => sol.question_id === question.question_id)
            .map((solution) => (
              <div className='solution'>
                <img key={solution.question_id} src={`data:image/png;base64,${solution.solution_img}`} alt="Solution" />
              </div>
            ))}
        </div>
       </div>
      ))}
    </div>
  );
}

export default Imgsjhg;
