
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Document_ImageInfo() {
  const [data, setData] = useState(null);
const {subjectId, testCreationTableId} = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/getSubjectData/${subjectId}/${testCreationTableId}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts.

  if (!data) {
    return <div>Loading...</div>;
  }

  // Render your component using the fetched data
  return (
    <div>
      {/* Access data as needed, for example: */}
      <h1>{data.document.documen_name} {data.document.subjectId}{data.document.testCreationTableId}</h1>
      {/* Map over questions and render them */}
      <div className='q1s' style={{display:'flex',gap:'4rem',flexDirection:'column',width:'85vw',margin:'2rem'}}>
      {data.questions.map((question, index) => (
     
        <div className='outColor' style={{background:'#e5e5e5',padding:'2rem 2rem'}}>
         <div key={question.question_id} >
         <div className='question' key={index}>
          <h3>{index+1}</h3>
         <img src={`data:image/png;base64,${question.question_img}`} alt="Question" />
         </div>
          
          {/* Map over options and render them */}
          {data.options
            .filter((opt) => opt.question_id === question.question_id)
            .map((option) => (
             <div className='option'>
                 <img key={option.question_id} src={`data:image/png;base64,${option.option_img}`} alt="Option" />
             </div>
            ))}
          
          {/* Render solutions similarly */}
          {data.solutions
            .filter((sol) => sol.question_id === question.question_id)
            .map((solution) => (
              <div className='solution'>
                <img key={solution.question_id} src={`data:image/png;base64,${solution.solution_img}`} alt="Solution" />
              </div>
            ))}
        </div>
       </div>
      
      ))}
       </div>
    </div>
  );
}

export default Document_ImageInfo;
