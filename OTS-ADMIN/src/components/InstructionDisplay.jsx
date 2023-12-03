import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";


const InstructionsDisplay = () => {
  const [points, setPoints] = useState([]);
  const { instructionId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3081/instructionpointsGet`
        );
        setPoints(response.data.points);
        console.log("Response:", response.data);
        console.log("instructionId:", instructionId);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [instructionId]);

  const handleDelete = async (instructionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3081/deleteinstruction/${instructionId}`
      );
      console.log("Delete Response:", response.data);
      // Add logic to update your component state or perform other actions after deletion
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

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
    <div className="Instruction_container">
      <div className="Instruction_Dis">
        {points.map((item, index) => (
          <ul key={index}>
            <li>{item.points}</li>
            {/* Correct the order of parameters in the Link */}
            <div className="Instruction_btn">
              <Link
                to={`/InstructionPage/editIns/${item.instructionId}/${item.id}`}
              >
                edit
              </Link>
            </div>

            <div className="InstructionDelete ">
              <button className="InstDelete InstDelete1"
                onClick={() => handleDeletePoint(item.instructionId, item.id)}
              >
             <i class="fa-solid fa-delete-left"></i>
              </button>
            </div>
            <div className="Instruction_Point InstructionDelete">
              <button className="InstDelete InstDelete2" onClick={() => handleDelete(item.instructionId)}>
              <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default InstructionsDisplay;