import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const GeneralInstructionsPage = () => {
  const [instructionsData, setInstructionsData] = useState([]);
  const { testCreationTableId } = useParams();

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch(`http://localhost:3081/fetchinstructions/${testCreationTableId}`);
        const data = await response.json();
        setInstructionsData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructions();
  }, [testCreationTableId]);
  
  return (
    <div>
      <h2>General Instructions</h2>
      <ul>
        {instructionsData.map((instruction, index) => (
          <React.Fragment key={instruction.id}>
            {index === 0 && (
              <li>
                {instruction.instructionHeading}
              </li>
            )}
            <li>
              {instruction.points}
            </li>
          </React.Fragment>
        ))}
      </ul>
      <Link to={`/fetchSections/${testCreationTableId}`}>Start Test</Link>
    </div>
  );
};

export default GeneralInstructionsPage;
