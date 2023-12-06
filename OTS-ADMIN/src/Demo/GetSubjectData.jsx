import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const GetSubjectData = () => {
  const { subjectId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/getSubjectData/1`);
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
      <div className='endfh'>
        
      {data.questions.map((question, index) => (
        <div key={index}>
          <h2>{`Question ${index + 1}`}</h2>
          <img
            src={`data:image/png;base64,${question.question_img}`}
            alt={`Question ${index + 1}`}
          />

          {/* Render option images */}
          {data.options
            .filter(option => option.question_id === question.question_id)
            .map((option, optionIndex) => (
              <img
                key={optionIndex}
                src={`data:image/png;base64,${option.option_img}`}
                alt={`Option ${optionIndex + 1}`}
              />
            ))
          }

          {/* Render solution image */}
          {data.solutions
            .filter(solution => solution.question_id === question.question_id)
            .map((solution, solutionIndex) => (
              <img
                key={solutionIndex}
                src={`data:image/png;base64,${solution.solution_img}`}
                alt={`Solution ${solutionIndex + 1}`}
              />
            ))
          }
        </div>
      ))}
      </div>
    </div>
  );
};

export default GetSubjectData;
