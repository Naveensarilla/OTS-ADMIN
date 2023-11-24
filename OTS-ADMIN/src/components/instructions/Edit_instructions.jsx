import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export const Edit_instructions = () => {
    const [points, setPoints] = useState([]);
    const { examId } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3081/instructionpoints`
          );
          setPoints(response.data.points); // Use response.data.points to set the state
          console.log(`djgfhgdfj response`);
          console.log(examId);
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
  
      fetchData();
    }, []);
  return (
    <div>
          {points.map((item, examId) => (
      <div key={examId}>
        <input type="text" value={item.points} />
      </div>
     ))}
    </div>
  )
}
