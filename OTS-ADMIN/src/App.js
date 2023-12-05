import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Leftnav from "./components/Leftnav.jsx";
import Dashbaord from "./components/Dashboard.jsx";
import ExamCreation from "./components/Examcreation.jsx";
import Coursecreation from "./components/Coursecreation.jsx";
import NewExamUpdataion from "./components/NewExamUpdataion.jsx";
import Coureseupdate from "./components/Coureseupdate.jsx";
import InstructionPage from "./components/InstructionPage.jsx";
// import InstructionUpdate from './components/InstructionUpdate.jsx';
import { UpdateInstruction } from "./components/UpdateInstruction.jsx";
import Testcreation from "./components/Testcreation.jsx";
import TestUpdate from "./components/TestUpdate.jsx";
import DocumentUpload from "./components/DocumentUpload.jsx";
import GettinggInstructions from "./components/GettinggInstructions .jsx";
import { YourComponent } from "./Demo/YourComponent .jsx";
import QuestionDetails from "./Demo/QuestionDetails .jsx";
import ImageComponent from "./Demo/ImageComponent .jsx";
import ImageDisplay from "./Demo/ImageDisplay .jsx";
import { DocumentData } from "./components/DocumentData.jsx";
import UpdatingInst from "./Demo/UpdatingInst.jsx";
import DocgetImages from "./Demo/DocgetImages.jsx";
function App() {
  return (
    <Router>
      <Header />
      <div className="common_grid_app">
        <Leftnav />
        <Routes>
          <Route path="/" element={<Dashbaord />} />
          <Route path="/exams" element={<ExamCreation />} />
          <Route path="/update/:examId" element={<NewExamUpdataion />} />
          <Route path="Coursecreation" element={<Coursecreation />} />
          <Route
            path="/courseupdate/:courseCreationId"
            element={<Coureseupdate />}
          />
          <Route path="/InstructionPage" element={<InstructionPage />} />
          {/* <Route path="/InstructionUpdate/:instructionId" element={<InstructionUpdate />} />  */}
          <Route path="/Testcreation" element={<Testcreation />} />
          <Route
            path="/testUpdate/:testCreationTableId"
            element={<TestUpdate />}
          />
          <Route path="/DocumentUpload" element={<DocumentUpload />} />
          {/* <Route path="/Testcreation" element={<EditInstructions />} /> */}
          <Route
            path="/InstructionPage/editIns/:instructionId/:id"
            element={<UpdateInstruction />}
          />
           <Route
            path="/Instruction/editIns/:instructionId/"
            element={<GettinggInstructions />}
          />
          <Route path="/images/:question_id" component={ImageDisplay} />

          {/* document list */}
          <Route
            path="/api/getDocumentData/:document_Id"
            element={<DocgetImages />}
          />
        </Routes>
      </div>

      {/* demo */}

      {/* below code working */}
      <YourComponent />
      {/* <QuestionDetails /> */}
      {/* <DocgetImages /> */}
      {/* <ImageComponent /> */}
    </Router>
  );
}

export default App;
