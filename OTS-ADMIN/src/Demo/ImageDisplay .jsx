// 1st working with id 



// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const ImageDisplay = () => {
//   const [questionImage, setQuestionImage] = useState(null);
//   const [optionImages, setOptionImages] = useState([]);
//   const [solutionImage, setSolutionImage] = useState(null);
//   const { question_id } = useParams();

  
//   useEffect(() => {
//     // Fetch images from the server
//     fetch(`http://localhost:3081/api/getImages/${question_id}`)
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
//         <img key={index} src={image} alt={`Option ${index + 1}`} />
//       ))}

//       <h2>Solution Image</h2>
//       {solutionImage && <img src={solutionImage} alt="Solution" />}
//     </div>
//   );
// };

// export default ImageDisplay;



// import React, { useState, useEffect } from 'react';

// const ImageDisplay = () => {
//   const [questionImages, setQuestionImages] = useState([]);
//   const [optionImages, setOptionImages] = useState([]);
//   const [solutionImages, setSolutionImages] = useState([]);

//   useEffect(() => {
//     // Fetch all images from the server
//     fetch('http://localhost:3081/api/getAllImages')
//       .then(response => response.json())
//       .then(data => {
//         setQuestionImages(data.questionImages);
//         setOptionImages(data.optionImages);
//         setSolutionImages(data.solutionImages);
//       })
//       .catch(error => console.error('Error fetching images:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Question Images</h2>
//       {questionImages.map((image, index) => (
//         <img key={index} src={image} alt={`Question ${index + 1}`} />
//       ))}

//       <h2>Option Images</h2>
//       {optionImages.map((image, index) => (
//         <img key={index} src={image} alt={`Option ${index + 1}`} />
//       ))}

//       <h2>Solution Images</h2>
//       {solutionImages.map((image, index) => (
//         <img key={index} src={image} alt={`Solution ${index + 1}`} />
//       ))}
//     </div>
//   );
// };

// export default ImageDisplay;


// 3 we
// import React, { useState, useEffect } from 'react';

// const ImageDisplay = () => {
//   const [images, setImages] = useState({
//     questionImages: [],
//     optionImages: [],
//     solutionImages: [],
//   });

//   useEffect(() => {
//     // Fetch all images from the server
//     fetch('http://localhost:3081/api/getAllImages')
//       .then(response => response.json())
//       .then(data => {
//         if (
//           data &&
//           data.questionImages &&
//           Array.isArray(data.questionImages) &&
//           data.optionImages &&
//           Array.isArray(data.optionImages) &&
//           data.solutionImages &&
//           Array.isArray(data.solutionImages)
//         ) {
//           setImages(data);
//         } else {
//           console.error('Invalid data structure received from the server:', data);
//         }
//       })
//       .catch(error => console.error('Error fetching images:', error));
//   }, []);

//   return (
//     <div>
//       <h2>Question Images</h2>
//       {images.questionImages.map((image, index) => (
//         <img key={index} src={image} alt={`Question ${index + 1}`} />
//       ))}

//       <h2>Option Images</h2>
//       {images.optionImages.map((image, index) => (
//         <img key={index} src={image} alt={`Option ${index + 1}`} />
//       ))}

//       <h2>Solution Images</h2>
//       {images.solutionImages.map((image, index) => (
//         <img key={index} src={image} alt={`Solution ${index + 1}`} />
//       ))}
//     </div>
//   );
// };

// export default ImageDisplay;




import React, { useState, useEffect } from 'react';

const ImageDisplay = () => {
  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    // Fetch all images from the server
    fetch('http://localhost:3081/api/getAllImages')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setQuestionData(data);
        } else {
          console.error('Invalid data structure received from the server:', data);
        }
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  return (
    <div>
      {questionData.map((question, index) => (
        <div key={index}>
          <h2>Question {index + 1}</h2>
          <img src={question.questionImage} alt={`Question ${index + 1}`} />

          <h3>Option Images</h3>
          {question.optionImages.map((image, optionIndex) => (
            <img key={optionIndex} src={image} alt={`Option ${optionIndex + 1}`} />
          ))}

          <h3>Solution Image</h3>
          {question.solutionImage && <img src={question.solutionImage} alt={`Solution ${index + 1}`} />}
        </div>
      ))}
    </div>
  );
};

export default ImageDisplay;
