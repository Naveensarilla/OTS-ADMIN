import React, { useState, useEffect } from 'react';

const QuestionDetails = ({question_id }) => {
  const [questionDetails, setQuestionDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/question/${question_id}/details`);
        if (!response.ok) {
          throw new Error('Failed to fetch question details');
        }

        const data = await response.json();
        setQuestionDetails(data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };

    fetchData();
  }, [question_id]);

  if (!questionDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Question:</h2>
      <img src={`/images/question/${question_id}`} alt="Question" />

      <h2>Options:</h2>
      {questionDetails.options.map((option, index) => (
        <img key={index} src={`/images/option/${question_id}`} alt={`Option ${index + 1}`} />
      ))}

      {questionDetails.solution && (
        <>
          <h2>Solution:</h2>
          <img src={`/images/solution/${question_id}`} alt="Solution" />
        </>
      )}
    </div>
  );
};

export default QuestionDetails;
