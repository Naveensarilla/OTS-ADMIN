import React, { useState, useEffect } from 'react';

const Testcreation = () => {
  const [testName, setTestName] = useState('');
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [duration, setDuration] = useState('');
  const [totalQuestions, setTotalQuestions] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [calculator, setCalculator] = useState('no');
  const [status, setStatus] = useState('inactive');
  const [typeOfTests, setTypeOfTests] = useState([]);
  const [selectedtypeOfTest,setSelectedtypeOfTest] = useState('');
  const [numberOfSections, setNumberOfSections] = useState(1);
  const [questionLimitChecked, setQuestionLimitChecked] = useState(false);
  useEffect(() => {
    fetch('http://localhost:3081/testcourses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:3081/course-typeoftests/${selectedCourse}`)
        .then((response) => response.json())
        .then((data) => setTypeOfTests(data))
        .catch((error) => console.error('Error fetching course_typeoftests:', error));
    }
  }, [selectedCourse]);

  const handleSelectChange = (e) => {
    setSelectedCourse(e.target.value);
  };
 const handleSelectTypeOfTest =(e) =>{
  setSelectedtypeOfTest(e.target.value);
 }
  const handleInputChange = (e) => {
    setTestName(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleTotalQuestionsChange = (e) => {
    setTotalQuestions(e.target.value);
  };

  const handleTotalMarksChange = (e) => {
    setTotalMarks(e.target.value);
  };
  const handleCalculatorChange = (e) => {
    setCalculator(e.target.value);
  };
  
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleQuestionLimitChange = (e) => {
    setQuestionLimitChecked(e.target.checked);
  };

  const addSection = () => {
    setNumberOfSections((prevSections) => prevSections + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form with selectedCourse:', selectedCourse);
      console.log('Submitting form with selectedtypeOfTest:', selectedtypeOfTest);
  
      const response = await fetch('http://localhost:3081/create-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testName,
          selectedCourse,
          selectedtypeOfTest,
          startDate,
          startTime,
          endDate,
          endTime,
          duration,
          totalQuestions,
          totalMarks,
          calculator,
          status,
        }),
      });
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <div>
     <form onSubmit={handleSubmit}>
        <label>
          Test Name:
          <input type="text" value={testName} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Select Course:
          <select value={selectedCourse} onChange={handleSelectChange}>
            <option value="" disabled>Select a course</option>
            {courses.map((course) => (
              <option key={course.courseCreationId} value={course.courseCreationId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </label>
        <br/>

        <div>
  <label>
    Type of Tests:
    <select value={selectedtypeOfTest} onChange={handleSelectTypeOfTest}>
      <option value="" disabled>Select a type of test</option>
      {typeOfTests.map((typeOfTest) => (
        <option key={typeOfTest.TypeOfTestId} value={typeOfTest.TypeOfTestId}>
          {typeOfTest.TypeOfTestName}
        </option>
      ))}
    </select>
  </label>
</div>


        <label>
        Test  Start Date:
          <input type="date" value={startDate} onChange={handleStartDateChange}  />
        </label>
        <label>
         Start Time:
          <input type="time" value={startTime} onChange={handleStartTimeChange}  />
        </label>
        <br />
        <label>
         Test End Date:
          <input type="date" value={endDate} onChange={handleEndDateChange}  />
        </label>
        <label>
          End Time:
          <input type="time" value={endTime} onChange={handleEndTimeChange} />
        </label>
        <br/>
        <label>
          Duration (in minutes):
          <input type="number" value={duration}  onChange={handleDurationChange} min="1" />
        </label>
        <br />
        <label>
          Total Questions:
          <input type="number" value={totalQuestions} onChange={handleTotalQuestionsChange} min="1"/>
        </label>
        <br />
        <label>
          Total Marks:
          <input type="number" value={totalMarks} onChange={handleTotalMarksChange}min="1" />
        </label>
        <br/>
        <div>
          <label>SECTION</label>
          <br/>
          <label>
            <input
              type="checkbox"
              checked={questionLimitChecked}
              onChange={handleQuestionLimitChange}
            />Question Limit:
          </label>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Section</th>
                {questionLimitChecked && <th>Question Limit</th>}
                <th>No of Question</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: numberOfSections }, (_, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <input type="text" />
                  </td>
                  {questionLimitChecked && (
                    <td>
                      <input type="number" />
                    </td>
                  )}
                  <td>
                    <input type="number" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <button type="button" onClick={addSection}>
            +
          </button>
        </div>
        <br/>
        <label>
        Calculator:
        <select value={calculator} onChange={handleCalculatorChange}>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>
      <br />
      <label>
        Status:
        <select value={status} onChange={handleStatusChange}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </label>
      <br />
        <button type="submit">Submit</button>
      </form>

    </div>
  )
}

export default Testcreation