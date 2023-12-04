import React, { useState, useEffect } from 'react';
 
const ImageDisplay = () => {
  const [questionImages, setQuestionImages] = useState([]);
  const [optionImages, setOptionImages] = useState([]);
  const [solutionImages, setSolutionImages] = useState([]);
 
  useEffect(() => {
    // Fetch all images from the server
    fetch('http://localhost:3081/api/getAllImages')
      .then(response => response.json())
      .then(data => {
        setQuestionImages(data.questionImages);
        setOptionImages(data.optionImages);
        setSolutionImages(data.solutionImages);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, []);
 
  return (
    <div>
      <h2>Question Images</h2>
      {questionImages.map((image, index) => (
        <img key={index} src={image} alt={`Question ${index + 1}`} />
      ))}
 
      <h2>Option Images</h2>
      {optionImages.map((image, index) => (
        <img key={index} src={image} alt={`Option ${index + 1}`} />
      ))}
 
      <h2>Solution Images</h2>
      {solutionImages.map((image, index) => (
        <img key={index} src={image} alt={`Solution ${index + 1}`} />
      ))}
    </div>
  );
};
 
export default ImageDisplay;