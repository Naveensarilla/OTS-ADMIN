import React, { useEffect, useState } from 'react';
import { Link,useParams } from 'react-router-dom';

const Paper2 = () => {
  const [subjects, setSubjects] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const { testCreationTableId, subjectId } = useParams();

  useEffect(() => {
    // Fetch subjects and paper data when the component mounts
    const fetchData = async () => {
      try {
        // Fetch subjects
        const subjectsResponse = await fetch(
          `http://localhost:3081/subjects/${testCreationTableId}`
        );
        const subjectsData = await subjectsResponse.json();
        setSubjects(subjectsData);

        // Fetch paper data
        const paperResponse = await fetch(
          `http://localhost:3081/quiz_all/${testCreationTableId}/${subjectId}`
        );
        const paperData = await paperResponse.json();
        setQuestionsData(paperData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [testCreationTableId, subjectId]);

  const handlepaperClick = async (typeOfTestId) => {
    try {
      // Fetch tests based on typeOfTestId
      const response = await fetch(`http://localhost:3081/quiz_all/${testCreationTableId}/${subjectId}`);
      const paperData = await response.json();
      setQuestionsData(paperData);
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <h2>Subjects</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject.subjectId}>
            <Link to="#" onClick={() => handlepaperClick(subject.subjectId) }>
              {subject.subjectName}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Paper Data for Subject: {subjectId}</h2>
      <ul>
        {questionsData.map((questionData, index) => (
          <li key={index}>
            <div>
              <h3>Question {index + 1}</h3>
              <img src={`data:image/png;base64,${questionData.questionImage}`} alt={`Question ${index + 1}`} />
            </div>
            <div>
              <h4>Options:</h4>
              <ul>
                {questionData.optionImages.map((optionImage, optionIndex) => (
                  <li key={optionIndex}>
                    <img src={`data:image/png;base64,${optionImage}`} alt={`Option ${optionIndex + 1}`} />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Solution:</h4>
              <img src={`data:image/png;base64,${questionData.solutionImage}`} alt={`Solution ${index + 1}`} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paper2;
