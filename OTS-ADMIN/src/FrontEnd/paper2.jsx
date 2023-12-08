import React, { useState, useEffect } from 'react';
 
function PaperData() {
  const [data, setData] = useState(null);
 
  useEffect(() => {
    const fetchPaperData = async () => {
      try {
        // Assuming you have testCreationTableId and subjectId values
        // const testCreationTableId = 1; // replace with your actual value
        // const subjectId = 2; // replace with your actual value
 
        const response = await fetch(`http://localhost:4009/getPaperDataa/1/1`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
 
    fetchPaperData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts.
 
  if (!data) {
    return <div>Loading...</div>;
  }
 
  // Render your component using the fetched data
  return (
    <div>
      {/* Access data as needed, for example: */}
      <h1>Test Creation Table ID: {data.testData.testCreationTableId}</h1>
      {/* Render questions, options, and solutions similarly */}
      {data.questions.map(question => (
        <div key={question.question_id}>
          <img src={`data:image/png;base64,${question.question_img}`} alt="Question" />
          {/* Render options and solutions similarly */}
          <img src={`data:image/png;base64,${question.option_img}`} alt="Option" />
        </div>
      ))}
    </div>
  );
}
 
export default PaperData;