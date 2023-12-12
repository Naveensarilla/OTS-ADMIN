import React, { useState, useEffect } from 'react';


const QuizComponent = () => {
    const [quizData, setQuizData] = useState(null);
    const [documentName, setDocumentName] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3081/quiz_all/4');
          const data = await response.json();
          console.log('Data from API:', data);

          if (data && data.subjects && data.documentName) {
            setQuizData(data.subjects);
            setDocumentName(data.documentName);
          } else {
            console.error('Invalid data structure:', data);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const renderOptions = (options) => {
        return options.map((option) => (
          <div key={option.option_id}>
            <img
              src={`http://localhost:3081/uploads/${documentName}_images/${option.optionImgName}`}
              alt={`Option ${option.option_id}`}
            />
          </div>
        ));
      };
      
      
      const renderQuestions = () => {
        if (!quizData) return null;
      
        return Object.keys(quizData).map((subjectName) => {
          const subject = quizData[subjectName];
      
          return (
            <div key={subject.subjectId}>
              <h2>{subjectName}</h2>
              {Object.keys(subject.sections).map((sectionName) => {
                const section = subject.sections[sectionName];
      
                return (
                  <div key={section.sectionId}>
                    <h3>{sectionName}</h3>
                    {section.questions.map((question) => (
                      <div key={question.question_id}>
                        {/* Log the image URL for debugging */}
                        {console.log(`/uploads/${documentName}/${question.questionImgName}`)}
      
                        {/* Render other question details */}
                        <img
                          src={`http://localhost:3081/uploads/${documentName}_images/${question.questionImgName}`}
                          alt={`Question ${question.question_id}`}
                        />
                        {console.log('Image Name:', question.questionImgName)}
                        {renderOptions(question.options)}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          );
        });
      };
      
    return (
      <div>
        <h1>Quiz Component</h1>
        <p>Document Name: {documentName}</p>
        {renderQuestions()}
      </div>
    );
  };
  
  export default QuizComponent;
