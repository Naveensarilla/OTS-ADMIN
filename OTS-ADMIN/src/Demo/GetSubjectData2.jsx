import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GetSubjectData2 = () => {
  const { subjectId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/getSubject_Data/1`);
        const jsonData = await response.json();
        console.log('Data received:', jsonData); // Log data received from the server
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [subjectId]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{`Document: ${data.document.documen_name}`}</h2>
      {/* Render other document details as needed */}
      
      {data.combinedImages.map((imageSet, index) => (
        <div key={index}>
          <h2>{`Question ${index + 1}`}</h2>
          <img src={imageSet.questionImage} alt={`Question ${index + 1}`} />

          {/* Render option images */}
          {imageSet.optionImages.map((optionImg, optionIndex) => (
            <img key={optionIndex} src={optionImg} alt={`Option ${optionIndex + 1}`} />
          ))}

          {/* Render solution image */}
          {imageSet.solutionImage && (
            <img src={imageSet.solutionImage} alt={`Solution ${index + 1}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default GetSubjectData2;
