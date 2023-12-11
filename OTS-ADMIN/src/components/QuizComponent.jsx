import React, { useState, useEffect } from 'react';

const QuizComponent = () => {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch('http://localhost:3081/quiz_all/2');
        // Change the testCreationTableId as needed
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchQuizData();
  }, []);

  const renderOptions = (options) => {
    return options.map((option) => (
      <div key={option.option_id}>
        {/* Render other option details */}
        <img src={`http://localhost:3081/uploads/${option.optionImgName}`}  alt={`Option ${option.option_id}`} />
      </div>
    ));
  };


  const renderQuestions = () => {
    if (!quizData) return null;
  
    return Object.entries(quizData).map(([subjectName, subject]) => (
      <div key={subject.subjectId}>
        <h2>{subjectName}</h2>
        {Object.entries(subject.sections).map(([sectionName, section]) => (
          <div key={section.sectionId}>
            <h3>{sectionName}</h3>
            {section.questions.map((question) => (
              <div key={question.question_id}>
                {/* Log the image URL for debugging */}
                {console.log(`/uploads/${question.questionImgName}`)}
  
                {/* Render other question details */}
                <img src={`http://localhost:3081/uploads/${question.questionImgName}`}  alt={`Question ${question.question_id}`} />
                {renderOptions(question.options)}
              </div>
            ))}
          </div>
        ))}
      </div>
    ));
  };
  

  return (
    <div>
      <h1>Quiz Component</h1>
      {renderQuestions()}
    </div>
  );
};

export default QuizComponent;
