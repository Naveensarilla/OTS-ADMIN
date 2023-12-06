import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SubjectData = () => {
  const [data, setData] = useState(null);
const {document_Id} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/getSubject_Data/${document_Id}`);
        const jsonData = await response.json();
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
      <h2>{`Document: ${data.document.documen_name}`}</h2>
      {/* Render other document details as needed */}

      {data.combinedImages.map((item, index) => (
        <div key={index}>
          <h2>{`Question ${index + 1}`}</h2>
          <img src={item.questionImage} alt={`Question ${index + 1}`} />

          {/* Render option images */}
          {item.optionImages.map((option, optionIndex) => (
            <img key={optionIndex} src={option} alt={`Option ${optionIndex + 1}`} />
          ))}

          {/* Render solution image */}
          {item.solutionImage && (
            <img src={item.solutionImage} alt={`Solution ${index + 1}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default SubjectData;
