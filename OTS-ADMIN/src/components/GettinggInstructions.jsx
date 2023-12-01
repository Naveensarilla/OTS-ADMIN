import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const API_BASE_URL = "http://localhost:3081";

const GettinggInstructions = () => {
  const [points, setPoints] = useState([]);
  const { instructionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/instructionpoints/${instructionId}`
        );

        if (response.data.success) {
          // Assuming the points are fetched correctly, convert them to strings
          const formattedPoints = response.data.points.map((item) => ({
            ...item,
            points: String(item.points),
          }));

          setPoints(formattedPoints);
          console.log("Response:", response.data);
          console.log("instructionId:", instructionId);
        } else {
          console.error("Error in response:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [instructionId]);

  const handleDeletePoint = async (instructionId, id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3081/deletepoint/${instructionId}/${id}`
      );
      window.location.reload();

      console.log("Delete Point Response:", response.data);
      // Add logic to update your component state or perform other actions after deletion
    } catch (error) {
      console.error("Error deleting point:", error.message);
    }
  };

  return (
    <div className="Instruction_points">
      {points.map((item, index) => (
        <ul key={index} >
          <li>{item.instructionHeading}</li>
          <li>{item.points}</li>
          {/* <Link
            to={`/InstructionPage/editIns/${item.instructionId}/${item.id}`}
          >
          <i className="fa-solid fa-pencil"></i>
          </Link> */}
          
          <Link
            to={`/InstructionPage/editIns/${item.instructionId}/${item.id}`}
            title="Edit this point"
          >
            <i className="fa-solid fa-pencil"></i>
          </Link>

          <button
            className="InstructiondelPoint"
            title="delete this point"
            onClick={() => handleDeletePoint(item.instructionId, item.id)}
          >
            <i class="fa-solid fa-trash"></i>
          </button>
        </ul>
      ))}
    </div>
  );
};

export default GettinggInstructions;
