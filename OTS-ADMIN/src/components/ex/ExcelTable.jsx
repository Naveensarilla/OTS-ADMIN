// // React component for file upload
// import React, { useState } from 'react';
// import axios from 'axios';

import axios from "axios";
import { useEffect, useState } from "react";

// const ExcelTable = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       // Replace the URL with your server endpoint
//       await axios.post('http://localhost:3081/uploadexcel', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('File uploaded successfully.');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default ExcelTable;

// ... (other imports)
// ... (other imports)

const ExcelTable = () => {
  const [file, setFile] = useState(null);
  const [instructionHeading, setInstructionHeading] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [exams, setExams] = useState([]);

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

  const openForm = () => {
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (file) {
        console.log("Selected Exam:", selectedExam);
        console.log("Instruction Heading:", instructionHeading);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("examId", selectedExam);
        formData.append("instructionHeading", instructionHeading);
        

        // Log all form data
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }

        await axios.post("http://localhost:3081/uploadexcel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        document.getElementById("fileInput").value = "";
        alert("File uploaded successfully!");
      } else {
        alert("Please select a file to upload.");
      }
    } catch (error) {
      console.error("Error uploading file:", error.response);
      alert("Failed to upload file. Please try again.");
    }
  };

  return (
    <div>
      {formOpen ? (
        <form>
          <button type="button" onClick={closeForm} disabled={!formOpen}>
            Close Form
          </button>
          <select
  name="examId"
  value={selectedExam}
  onChange={(e) => {
    setSelectedExam(e.target.value);
    console.log('Selected Exam:', e.target.value);
  }}
>
            <option value="">Select Exam:</option>
            {exams.map((exam) => (
              <option key={exam.examId} value={exam.examId}>
                {exam.examName}
              </option>
            ))}
          </select>

          <label>Instructions Heading:</label>
          <input
            type="text"
            name="instructionHeading"
            value={instructionHeading}
            onChange={(e) => setInstructionHeading(e.target.value)}
          />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Upload</button>
        </form>
      ) : (
        <button type="button" onClick={openForm}>
          Open Form
        </button>
      )}
    </div>
  );
};

export default ExcelTable;
