import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Leftnav from "./components/Leftnav.jsx";
import ExamCreation from "./components/Examcreation.jsx";
import Coursecreation from "./components/Coursecreation.jsx";
import Examupdate from "./components/Examupdate.jsx";
import Coureseupdate from "./components/Coureseupdate.jsx";
import InstructionPage from "./components/InstructionPage.jsx";
// import InstructionUpdate from './components/InstructionUpdate.jsx';
import Testcreation from "./components/Testcreation.jsx";
import { Edit_instructions } from "./components/instructions/Edit_instructions.jsx";
import { UpdateInstruction } from "./components/instructions/UpDAteInstraction.jsx";
function App() {
  return (
    <Router>
      <Header />
      <div className="common_grid_app">
        <Leftnav />
        <Routes>
          <Route path="/exams" element={<ExamCreation />} />
          <Route path="/update/:examId" element={<Examupdate />} />
          <Route path="Coursecreation" element={<Coursecreation />} />
          <Route
            path="/courseupdate/:courseCreationId"
            element={<Coureseupdate />}
          />
          <Route path="/InstructionPage" element={<InstructionPage />} />
          {/* <Route path="/InstructionUpdate/:instructionId" element={<InstructionUpdate />} />  */}
          <Route path="/editIntractions" element={<Testcreation />} />

          {/* Mr.kevin */}
          <Route path="/Testcreation" element={<Edit_instructions />} />
          <Route path="/InstructionPage">
            <Route
              path="editIns/:instructionId/:id"
              element={<UpdateInstruction />}
            />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
