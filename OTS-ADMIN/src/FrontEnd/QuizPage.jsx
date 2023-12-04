import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const [sections, setSections] = useState([]);
  const { testCreationTableId } = useParams();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`http://localhost:3081/quiz_all/${testCreationTableId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received data:', data);
        setSections(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchSections();
  }, [testCreationTableId]); // Use testCreationTableId as a dependency to trigger fetch when it changes

  return (
    <div>
      {Object.values(sections).map((section) => (
        <div key={section.sectionId}>
          <h2>{section.sectionName}</h2>
          {section.questions.map((question) => (
            <div key={question.qustion_id}>
              {/* Display question image */}
              <img src={`data:image/png;base64,${question.question_img}`} alt={`Question ${question.qustion_id}`} />

              {/* Display option images */}
              <ul>
                {question.option_img.map((option, index) => (
                  <li key={index}>
                    <img src={`data:image/png;base64,${option.option_img}`} alt={`Option ${option.Option_Index}`} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default QuizPage;
