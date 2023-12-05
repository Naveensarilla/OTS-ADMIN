import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ReactTooltip, { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const InstructionsDisplay = () => {
  const [points, setPoints] = useState([]);
  const { instructionId } = useParams();

  const [instruction, instructionPoints] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3081/instructionData`
        );
        instructionPoints(response.data.points);
        console.log("Response:", response.data);
        console.log("instructionId:", instructionId);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [instructionId]);

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
      window.location.reload();
      console.log("Delete Response:", response.data);
      // Add logic to update your component state or perform other actions after deletion
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  // const handleDeletePoint = async (instructionId, id) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3081/deletepoint/${instructionId}/${id}`
  //     );
  //     window.location.reload();

  //     console.log("Delete Point Response:", response.data);
  //     // Add logic to update your component state or perform other actions after deletion
  //   } catch (error) {
  //     console.error("Error deleting point:", error.message);
  //   }
  // };

  return (
    <div className="Instruction_containerTable">
      <table>
        <thead>
          <tr>
            <th>instruction Id</th>
            <th>examId</th>
            <th>Instructions Heading</th>

            <th>Document Name</th>

            <th>Instruction</th>
            <th>delete</th>
          </tr>
        </thead>
        <tbody>
          {instruction.map((ite, inde) => (
            <tr key={inde}>
              <td>{ite.instructionId}</td>
              <td>{ite.examId}</td>
              <td>{ite.instructionHeading}</td>
              <td>{ite.documentName}</td>

              <td>
                {" "}
                <div className="tooltip-container Open_Instruction_Points">
                  <Link
                    to={`/Instruction/editIns/${ite.instructionId}`}
                    // title="Open Instruction Points"
                    className="my-anchor-element1" 
                    data-tooltip-variant="info"
                    data-tooltip-delay-show={1000}
                  >
                    open
                  </Link>
                  <Tooltip anchorSelect=".my-anchor-element1"   place="top">
                  Open Instruction Points
                  </Tooltip>
                </div>
              </td>
              <td>
                <button
                  className="InstDelete InstDelete2 my-anchor-element"
                  data-tooltip-variant="warning"
                    data-tooltip-delay-show={1000}
                  onClick={() => handleDelete(ite.instructionId)}
                >
                
                  <i class="fa-solid fa-trash"></i>
                </button>
                <Tooltip anchorSelect=".my-anchor-element"   place="top">
                 Delete
                  </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="Instruction_Dis">
        {/* {points.map((item, index) => (
          <ul key={index}>
            <li>{item.points}</li>
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
        ))} */}
      </div>
    </div>
  );
};

export default InstructionsDisplay;