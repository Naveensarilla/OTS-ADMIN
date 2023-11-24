import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const GetInst = () => {
  const [points, setPoints] = useState([]);
  const { instructionId, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/instructionpoints`);
        const data = await response.json();
        setPoints(data.points);
        console.log("Response:", data);
        console.log("instructionId:", instructionId);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [instructionId]);

  return (
    <div>
      <div>
        {points.map((item, index) => (
          <div key={index} style={{ display: 'flex' }}>
            <p> {item.points} </p>
            {/* Correct the order of parameters in the Link */}
            <Link to={`editIns/${item.instructionId}/${item.id}`}>edddit</Link>
          </div>
        ))}
      </div>
    </div>
  );
};
