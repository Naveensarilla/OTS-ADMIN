import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
const TestUpdate = () => {
  const { testCreationTableId } = useParams();
  const [courses, setCourses] = useState([]);
  const [typeOfTests, setTypeOfTests] = useState([]);
  const [sections, setSections] = useState([]);
  const [testData, setTestData] = useState({
    TestName: '',
    selectedCourse: '',
    selectedTypeOfTest: '',
    testStartDate: '',
    testEndDate: '',
    testStartTime: '',
    testEndTime: '',
    Duration: '',
    TotalQuestions: '',
    sectionName:'',
    noOfQuestions:'',
    QuestionLimit:'',
    totalMarks: '',
    calculator: 'No',
    status: 'Inactive',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for form submission here
    console.log('Form submitted with data:', testData);
  };

  function formatTime(dateTimeString) {
    if (dateTimeString === 'Invalid Time') {
      return '00:00'; // or any other default time you prefer
    }
  
    const formattedTime = moment(dateTimeString, 'HH:mm:ss.SSSSSS').format('HH:mm:ss');
    return formattedTime !== 'Invalid date' ? formattedTime : 'Invalid Time';
  }

  const formatDate = (dateString) => {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    // Fetch courses from the API
    fetch('http://localhost:3081/testcourses')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    // Fetch type of tests from the API based on the selected course
    if (testData.selectedCourse) {
      fetch(`http://localhost:3081/course-typeoftests/${testData.selectedCourse}`)
        .then(response => response.json())
        .then(data => setTypeOfTests(data))
        .catch(error => console.error('Error fetching type of tests:', error));
    }
  }, [testData.selectedCourse]);

  useEffect(() => {
    // Fetch test data to pre-fill the form
    fetch(`http://localhost:3081/testupdate/${testCreationTableId}`)
      .then(response => response.json())
      .then(data => {
        // Populate the testData state with fetched data
        setTestData({
          ...data,
          selectedCourse: data.courseCreationId,
          selectedTypeOfTest: data.courseTypeOfTestId,
        });
        const sectionsData = [{
          sectionName: data.sectionName,
          noOfQuestions: data.noOfQuestions,
          QuestionLimit: data.QuestionLimit
        }];
        setSections(sectionsData);
        
      })
      .catch(error => console.error('Error fetching test data:', error));
  }, [testCreationTableId]);
  return (
    <div>
      <h2>Test Update Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Test Name:
          <input
            type="text"
            name="testName"
            value={testData.TestName}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Select Course:
          <select
            name="selectedCourse"
            value={testData.selectedCourse}
            onChange={handleChange}
          >
            <option value="">Select a Course</option>
            {courses.map(course => (
              <option key={course.courseCreationId} value={course.courseCreationId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Type of Tests:
          <select
            name="selectedTypeOfTest"
            value={testData.selectedTypeOfTest}
            onChange={handleChange}
          >
            <option value="">Select a Type of Test</option>
            {typeOfTests.map(typeOfTest => (
              <option key={typeOfTest.TypeOfTestId} value={typeOfTest.TypeOfTestId}>
                {typeOfTest.TypeOfTestName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Test Start Date:
          <input
            type="date"
            name="testStartDate"
            value={formatDate(testData.testStartDate)}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Test End Date:
          <input
            type="date"
            name="testEndDate"
            value={formatDate(testData.testEndDate)}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={formatTime(testData.testStartTime)}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={formatTime(testData.testEndDate)}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Duration (in minutes):
          <input
            type="text"
            name="duration"
            value={testData.Duration}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Total Questions:
          <input
            type="text"
            name="totalQuestions"
            value={testData.TotalQuestions}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Total Marks:
          <input
            type="text"
            name="totalMarks"
            value={testData.totalMarks}
            onChange={handleChange}
          />
        </label>
        <br />
        <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Section</th>
            <th>Number of Questions</th>
            <th>Question Limit</th>
          </tr>
        </thead>
        <tbody>
  {sections.map((section, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td><input type="text" name={`section${index + 1}`} defaultValue={section.sectionName} /></td>
      <td><input type="number" name={`numQuestions${index + 1}`} defaultValue={section.noOfQuestions} /></td>
      <td><input type="number" name={`questionLimit${index + 1}`} defaultValue={section.QuestionLimit} /></td>
    </tr>
  ))}
</tbody>
      </table>
        <label>
          Calculator:
          <select
            name="calculator"
            value={testData.calculator}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />

        <label>
          Status:
          <select
            name="status"
            value={testData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <br />


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestUpdate;
