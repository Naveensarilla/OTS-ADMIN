import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Leftnav from "./components/Leftnav.jsx";
import ExamCreation from "./components/Examcreation.jsx";
import CourseCreation from "./components/Coursecreation.jsx";
import ExamUpdate from "./components/Examupdate.jsx";
import CourseUpdate from "./components/Coureseupdate.jsx";
import InstructionPage from "./components/InstructionPage.jsx";

// import InstructionUpdate from './components/InstructionUpdate.jsx';
import Testcreation from "./components/Testcreation.jsx";
import { Edit_instructions } from "./components/instructions/Edit_instructions.jsx";
import { UpdateInstruction } from "./components/instructions/UpDAteInstraction.jsx";

import TestCreation from "./components/Testcreation.jsx";
import EditInstructions from "./components/instructions/Edit_instructions.jsx";

import TestUpdate from './components/TestUpdate.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';


function App() {
  return (
    <Router>
      <Header />
      <div className="common_grid_app">
        <Leftnav />
        <Routes>
          <Route path="/exams" element={<ExamCreation />} />
          <Route path="/update/:examId" element={<ExamUpdate />} />
          <Route path="Coursecreation" element={<CourseCreation />} />
          <Route
            path="/courseupdate/:courseCreationId"
            element={<CourseUpdate />}
          />
          <Route path="/InstructionPage" element={<InstructionPage />} />
          <Route path="/editInstructions" element={<TestCreation />} />

          {/* Mr.kevin */}
          <Route path="/Testcreation" element={<EditInstructions />} />
          <Route
            path="/InstructionPage/editIns/:instructionId/:id"
            element={<UpdateInstruction />}
          />
        </Routes>

      </div>

      <div className='common_grid_app'>
        <Leftnav />
        <Routes>
          <Route path="/exams" element={<ExamCreation />} />
          <Route path="/update/:examId" element={<ExamUpdate />} />
          <Route path='Coursecreation' element={<CourseCreation />} />
          <Route path='/courseupdate/:courseCreationId' element={<CourseUpdate />} />
          <Route path="/InstructionPage" element={<InstructionPage />} />
          <Route path='/Testcreation' element={<TestCreation />} />
          <Route path='/testUpdate/:testCreationTableId' element={<TestUpdate />} />
          <Route path='/DocumentUpload' element={<DocumentUpload />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
