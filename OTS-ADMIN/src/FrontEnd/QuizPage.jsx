import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {
  const [sections, setSections] = useState([]);
  const { testCreationTableId } = useParams();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(`http://localhost:3081/quiz_all/${testCreationTableId}`);
        const data = await response.json();
        console.log('Received data:', data); // Log the data received from the server
        setSections(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchSections();
  }, [testCreationTableId]);
  
  // Render the images in your component
  return (
    <div>
      <ul>
        {Array.isArray(sections) &&
          sections.map((section) => (
            <li key={section.sectionId}>
              {section.sectionName}
              <ul>
                {section.questions.map((question) => (
                  <li key={question.qustion_id}>
                    {/* Display question image */}
                    <img src={`data:image/png;base64,${question.question_img}`} alt="Question" />
    
                    {/* Display option images */}
                    <ul>
                      {question.option_img.map((option) => (
                        <li key={option.Option_Index}>
                          <img src={`data:image/png;base64,${option.option_img}`} alt={`Option ${option.Option_Index}`} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
  
                    }

export default QuizPage;
