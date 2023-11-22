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


  useEffect(() => {
    fetch('http://localhost:3081/testcourses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const handleSelectChange = (e) => {
    setSelectedCourse(e.target.value);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  try {
    const response = await fetch('http://localhost:3081/create-test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        testName,
        selectedCourse,
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
    console.log('Test Name submitted:', testName);
    console.log('Selected Course:', selectedCourse);
    console.log('Start Date:', startDate);
    console.log('Start Time:', startTime);
    console.log('End Date:', endDate);
    console.log('End Time:', endTime);
    console.log('Duration:', duration);
    console.log('Total Questions:', totalQuestions);
    console.log('Total Marks:', totalMarks);
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
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Section</th>
              <th>No of Question</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table></div>
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