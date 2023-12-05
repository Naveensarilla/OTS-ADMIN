
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UpdatingInst = () => {
  const [questionImage, setQuestionImage] = useState(null);
  const [optionImages, setOptionImages] = useState([]);
  const [solutionImage, setSolutionImage] = useState(null);
  const { testCreationTableId } = useParams();

  
  useEffect(() => {
    // Fetch images from the server
    fetch(`http://localhost:3081/ap/getImages/${testCreationTableId}`)
      .then(response => response.json())
      .then(data => {
        setQuestionImage(data.questionImage);
        setOptionImages(data.optionImages);
        setSolutionImage(data.solutionImage);
      })
      .catch(error => console.error('Error fetching images:', error));
  }, [testCreationTableId]); // Ensure useEffect runs when question_id changes

  
  return (
    <div>
      <h2>Question Image</h2>
      {questionImage && <img src={questionImage} alt="Question" />}

      <h2>Option Images</h2>
      {optionImages.map((image, index) => (
        <img key={index} src={image} alt={`Option ${index + 1}`} />
      ))}

      <h2>Solution Image</h2>
      {solutionImage && <img src={solutionImage} alt="Solution" />}
    </div>
  );
};

export default UpdatingInst;

