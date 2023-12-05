// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const DocgetImages = () => {
//   const [questionImage, setQuestionImage] = useState(null);
//   const [optionImages, setOptionImages] = useState([]);
//   const [solutionImage, setSolutionImage] = useState(null);
//   const { question_id } = useParams();

//   useEffect(() => {
//     // Fetch images from the server
//     fetch(`http://localhost:3081/api/question/getImages/1`)
//       .then(response => response.json())
//       .then(data => {
//         setQuestionImage(data.questionImage);
//         setOptionImages(data.optionImages);
//         setSolutionImage(data.solutionImage);
//       })
//       .catch(error => console.error('Error fetching images:', error));
//   }, [question_id]); // Ensure useEffect runs when question_id changes

//   return (
//     <div>
//       <h2>Question Image</h2>
//       {questionImage && <img src={questionImage} alt="Question" />}

//       <h2>Option Images</h2>
//       {optionImages.map((image, index) => (
//         <img key={question_id} src={image} alt={`Option ${index + 1}`} />
//       ))}

//       <h2>Solution Image</h2>
//       {solutionImage && <img src={solutionImage} alt="Solution" />}
//     </div>
//   );
// };

// export default DocgetImages;


// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const DocgetImages = () => {
//   const { document_Id } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://localhost:3081/api/getDocumentData/${document_Id}`);
//         const jsonData = await response.json();
//         setData(jsonData);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, [document_Id]);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       sedfs
//       <h2>Document Details</h2>
//       <p>Document ID: {data.document.document_Id}</p>
//       <p>Document Name: {data.document.documen_name}</p>
//       <p>Test Creation Table ID: {data.document.testCreationTableId}</p>

//       <h2>Questions</h2>
//       {data.questions.map((question, index) => (
//         <img key={index} src={question.image} alt={`Question ${question.question_id}`} />
//       ))}

//       <h2>Options</h2>
//       {data.options.map((option, index) => (
//         <img key={index} src={option.image} alt={`Option ${option.option_id}`} />
//       ))}

//       <h2>Solutions</h2>
//       {data.solutions.map((solution, index) => (
//         <img key={index} src={solution.image} alt={`Solution ${solution.question_id}`} />
//       ))}
//     </div>
//   );
// };

// export default DocgetImages;



// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const DocgetImages = () => {
//   const { document_Id } = useParams();
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Fetch all images from the server
//     fetch(`http://localhost:3081/api/getDocumentData/${document_Id}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setData(data);
//       })
//       .catch((error) => console.error("Error fetching images:", error));
//   }, [document_Id]);

//   if (!data) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <div>
//         <h2>Question 1</h2>
//         <img src={data.questions[0].image} alt={`Question 1`} />

//         <h3>Option Images</h3>
//         {data.options.map((option, optionIndex) => (
//           <img
//             key={optionIndex}
//             src={option.image}
//             alt={`Option ${optionIndex + 1}`}
//           />
//         ))}

//         <h3>Solution Image</h3>
//         {data.solutions[0] && (
//           <img src={data.solutions[0].image} alt={`Solution 1`} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default DocgetImages;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DocgetImages = () => {
  const { document_Id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/api/getDocumentData/${document_Id}`);
        const jsonData = await response.json();
        console.log('Data received:', jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [document_Id]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* {data.combinedImages.map((combinedImage, index) => (
        <div key={index}>
          <h2>{`Question ${index + 1}`}</h2>
          <img src={combinedImage.questionImage} alt={`Question ${index + 1}`} />

          <h3>Option Images</h3>
          {combinedImage.optionImages.map((option, optionIndex) => (
            <img key={optionIndex} src={option} alt={`Option ${optionIndex + 1}`} />
          ))}

          <h3>Solution Image</h3>
          {combinedImage.solutionImage && (
            <img src={combinedImage.solutionImage} alt={`Solution ${index + 1}`} />
          )}
        </div>
      ))} */}


 {data.combinedImages.map((combinedImage, index) => (
        <div key={index}>
          <h2>{`Question ${index + 1}`}</h2>
          <img src={combinedImage.questionImage} alt={`Question ${index + 1}`} />

          <h3>Option Images</h3>
          {combinedImage.optionImages.map((option, optionIndex) => (
            <img key={optionIndex} src={option} alt={`Option ${optionIndex + 1}`} />
          ))}

          <h3>Solution Image</h3>
          {combinedImage.solutionImage && (
            <img src={combinedImage.solutionImage} alt={`Solution ${index + 1}`} />
          )}
        </div>
      ))}

    </div>
  );
};

export default DocgetImages;
