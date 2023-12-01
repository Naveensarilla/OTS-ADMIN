import React, { useState, useEffect } from "react";
import axios from "axios";
import InstructionsDisplay from "./InstructionDisplay";
import base64 from "base64-js";
import ExcelUpload from "./ex/ExcelTable";
import ExcelTable from "./ex/ExcelTable";
import "./InstructionPage.css";

// import { Link } from "react-router-dom";
const InstructionPage = () => {
  const [instructionHeading, setInstructionHeading] = useState("");
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState("");
  const [file, setFile] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [instructionPoints, setInstructionPoints] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get("http://localhost:3081/exams");
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();

  }, []);

  const handleFileUpload = (files) => {
    const selectedFile = files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("examId", selectedExam);
        formData.append("instructionHeading", instructionHeading);

        await axios.post("http://localhost:3081/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        document.getElementById("fileInput").value = "";
        alert("File uploaded successfully!");
        // fetchInstructions();
      } else {
        alert("Please select a file to upload.");
      }
    } catch (error) {
      console.error("Error uploading file:", error.response);
      alert("Failed to upload file. Please try again.");
    }
  };

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  return (
    <div className="instruction_container">
      {formOpen ? (
        <form>
          <button
            className="instructionBTN"
            type="button"
            onClick={closeForm}
            disabled={!formOpen}
          >
            Close Form
          </button>

          <div className="instruction_input_contant">
            <div className="inst">
              <label>Select Exam:</label>
              <select
                name="examId"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="">Select Exam:</option>
                {exams.map((exam) => (
                  <option key={exam.examId} value={[exam.examId]}>
                    {exam.examName}
                  </option>
                ))}
              </select>
            </div>

            <div className="inst">
              <label>Instructions Heading:</label>
              <input
                type="text"
                value={instructionHeading}
                onChange={(e) => setInstructionHeading(e.target.value)}
              />
            </div>

            <div className="inst">
              <label>Instructions:</label>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
              <span>
                {file ? `Selected File: ${file.name}` : "No file selected"}
              </span>
            </div>

            <div className="">
              <button className="instructionUpload" type="button" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
          <div className="InstructionBoredr"></div>
        </form>
        
      ) : (
        <button className="instruction_openMenu instructionBTN" type="button" onClick={openForm}>
          Open Form
        </button>
      )}
      <div className="instruction_content">
        <InstructionsDisplay />
        {/* <ExcelTable /> */}
      </div>
    </div>
  );
};

function decodeBase64(encodedString) {
  try {
    const decodedString = atob(encodedString);
    return new TextDecoder("utf-8").decode(
      new TextEncoder().encode(decodedString)
    );
  } catch (error) {
    console.error("Error decoding Base64:", error);
    return "Unable to decode";
  }
}
export default InstructionPage;
