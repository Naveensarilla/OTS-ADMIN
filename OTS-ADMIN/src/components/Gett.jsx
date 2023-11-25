import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Gett = ({ instructionId }) => {
  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3081/getInstructions/${instructionId}`);
        setInstructions(response.data.instructions);
        console.log('Instructions:', response.data.instructions);
      } catch (error) {
        console.error('Error fetching instructions:', error.message);
      }
    };

    fetchData();
  }, [instructionId]);

  return (
    <div>
      <h2>Instructions for Instruction ID {instructionId}</h2>
      <ul>
        {instructions.map((item) => (
          <li key={item.id}>
            Points: {item.points}, Exam ID: {item.examId}, Instruction Heading: {item.instructionHeading}, Document Name: {item.documentName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gett;
