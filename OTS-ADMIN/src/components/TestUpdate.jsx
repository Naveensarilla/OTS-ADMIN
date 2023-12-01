import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const TestUpdate = () => {
  const { testCreationTableId } = useParams();
  const [courses, setCourses] = useState([]);
  const [typeOfTests, setTypeOfTests] = useState([]);
  const [instructionsData, setInstructionsData] = useState([]);
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
    totalMarks: '',
    calculator: 'No',
    status: 'Inactive',
    sectionName: '',
    noOfQuestions: '',
    QuestionLimit: '',
    instructionId:'',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
  
    setTestData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: updatedValue,
      };
      console.log(updatedData); // Add this line for debugging
      return updatedData;
    });
  };
  
  
  function formatTime(dateTimeString) {
    if (dateTimeString === 'Invalid Time') {
      return '00:00'; // or any other default time you prefer
    }

    const formattedTime = moment(dateTimeString, 'HH:mm:ss.SSSSSS').format('HH:mm:ss');
    return formattedTime !== 'Invalid date' ? formattedTime : 'Invalid Time';
  }

  // const formatDate = (dateString) => {
  //   if (!dateString) {
  //     return '';
  //   }
  //   const date = new Date(dateString);
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');

  //   return `${year}-${month}-${day}`;
  // };
  useEffect(() => {
  fetch('http://localhost:3081/instructions')
  .then((response) => response.json())
  .then((data) => setInstructionsData(data))
  .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    // Fetch courses from the API
    fetch('http://localhost:3081/testcourses')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  useEffect(() => {
    // Fetch type of tests from the API based on the selected course
    if (testData.selectedCourse) {
      fetch(`http://localhost:3081/course-typeoftests/${testData.selectedCourse}`)
        .then((response) => response.json())
        .then((data) => setTypeOfTests(data))
        .catch((error) => console.error('Error fetching type of tests:', error));
    }
  }, [testData.selectedCourse]);


  useEffect(() => {
    fetch(`http://localhost:3081/testupdate/${testCreationTableId}`)
      .then((response) => {
        console.log('Response Status:', response.status);
        return response.json();
      })
      .then((data) => {
        console.log('Fetched Data:', data);
        setTestData({
          ...data,
          selectedCourse: data.courseCreationId,
          selectedTypeOfTest: data.courseTypeOfTestId,
          sectionName: data.sectionName,
          noOfQuestions: data.noOfQuestions,
          QuestionLimit: data.QuestionLimit,
          instructionId: data.instructionId,
        });
      })
      .catch((error) => console.error('Error fetching test data:', error));
  }, [testCreationTableId]);
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3081/test-update/${testCreationTableId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TestName: testData.TestName,
          selectedCourse: testData.selectedCourse,
          selectedTypeOfTest: testData.selectedTypeOfTest,
          testStartDate: testData.testStartDate,
          testEndDate: testData.testEndDate,
          testStartTime: testData.testStartTime,
          testEndTime: testData.testEndTime,
          Duration: testData.Duration,
          TotalQuestions: testData.TotalQuestions,
          totalMarks: testData.totalMarks,
          calculator: testData.calculator,
          status: testData.status,
          sectionName: testData.sectionName,
          noOfQuestions: testData.noOfQuestions,
          QuestionLimit: testData.QuestionLimit,
          instructionId:testData.instructionId,

        }),
      });
   
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };
  const handleSectionChange = (e, index) => {
    const { name, value, type } = e.target;
    const updatedValue = type === 'number' ? parseFloat(value) : value;
  
    setTestData((prevData) => {
      const updatedSections = [...prevData.selectedsections];
      updatedSections[index] = {
        ...updatedSections[index],
        [name]: updatedValue,
      };
      return {
        ...prevData,
        selectedsections: updatedSections,
      };
    });
  };
  return (
    <div>
      <h2>Test Update Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Test Name:
          <input type="text" name="TestName" value={testData.TestName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Select Course:
          <select name="selectedCourse" value={testData.selectedCourse} onChange={handleChange}>
            <option value="">Select a Course</option>
            {courses.map((course) => (
              <option key={course.courseCreationId} value={course.courseCreationId}>
                {course.courseName}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Type of Tests:
          <select name="selectedTypeOfTest" value={testData.selectedTypeOfTest} onChange={handleChange}>
            <option value="">Select a Type of Test</option>
            {typeOfTests.map((typeOfTest) => (
              <option key={typeOfTest.TypeOfTestId} value={typeOfTest.TypeOfTestId}>
                {typeOfTest.TypeOfTestName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Test Start Date:
          <input type="date" name="testStartDate" value={testData.testStartDate} onChange={handleChange} />
        </label>
        <br />

        <label>
          Test End Date:
          <input type="date" name="testEndDate" value={testData.testEndDate} onChange={handleChange} />
        </label>
        <br />

        <label>
          Start Time:
          <input type="time" name="testStartTime" value={formatTime(testData.testStartTime)} onChange={handleChange} />
        </label>
        <br />

        <label>
          End Time:
          <input type="time" name="testEndTime" value={formatTime(testData.testEndTime)} onChange={handleChange} />
        </label>
        <br />

        <label>
          Duration (in minutes):
          <input type="number" name="Duration" value={testData.Duration} onChange={handleChange} />
        </label>
        <br />

        <label>
          Total Questions:
          <input type="number" name="TotalQuestions" value={testData.TotalQuestions} onChange={handleChange} />
        </label>
        <br />

        <label>
          Total Marks:
          <input type="number" name="totalMarks" value={testData.totalMarks} onChange={handleChange} />
        </label>
        <br />
        <label>
          Section Name:
          <input type="text" name="sectionName" value={testData.sectionName} onChange={handleChange} />
        </label>
        <br />
        <label>
          Number of Questions:
          <input type="number" name="noOfQuestions" value={testData.noOfQuestions} onChange={handleChange} />
        </label>
        <br />
        <label>
          Question Limit:
          <input type="number" name="QuestionLimit" value={testData.QuestionLimit} onChange={handleChange} />
        </label>

        <label>
  Instructions:
  <select
    value={testData.instructionId}
    name="instructionId"
    onChange={handleChange}
  >
    <option value="">Select an instruction</option>
    {instructionsData.map((instruction) => (
      <option key={instruction.instructionId} value={instruction.instructionId}>
        {instruction.instructionHeading}
      </option>
    ))}
  </select>
</label>


        <label>
          Calculator:
          <select name="calculator" value={testData.calculator} onChange={handleChange}>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />

        <label>
          Status:
          <select name="status" value={testData.status} onChange={handleChange}>
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


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import moment from 'moment';

// const TestUpdate = () => {
//   const { testCreationTableId } = useParams();
//   const [courses, setCourses] = useState([]);
//   const [typeOfTests, setTypeOfTests] = useState([]);
//   const [instructionsData, setInstructionsData] = useState([]);
//   const [testData, setTestData] = useState({
//     TestName: '',
//     selectedCourse: '',
//     courseTypeOfTestId: '', // Corrected variable name
//     testStartDate: '',
//     testEndDate: '',
//     testStartTime: '',
//     testEndTime: '',
//     Duration: '',
//     TotalQuestions: '',
//     totalMarks: '',
//     calculator: 'No',
//     status: 'Inactive',
//     sectionName: '',
//     noOfQuestions: '',
//     QuestionLimit: '',
//     instructionId: '',
//   });

//   const handleChange = (e) => {
//     const { name, value, type } = e.target;
//     const updatedValue = type === 'number' ? parseFloat(value) : value;

//     setTestData((prevData) => ({
//       ...prevData,
//       [name]: updatedValue,
//     }));
//   };

//   function formatTime(dateTimeString) {
//     if (dateTimeString === 'Invalid Time') {
//       return '00:00'; // or any other default time you prefer
//     }

//     const formattedTime = moment(dateTimeString, 'HH:mm:ss.SSSSSS').format('HH:mm:ss');
//     return formattedTime !== 'Invalid date' ? formattedTime : 'Invalid Time';
//   }

//   useEffect(() => {
//     // Fetch instructions with error handling
//     fetch('http://localhost:3081/instructions')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch instructions');
//         }
//         return response.json();
//       })
//       .then((data) => setInstructionsData(data))
//       .catch((error) => console.error('Error fetching instructions:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch courses with error handling
//     fetch('http://localhost:3081/testcourses')
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch courses');
//         }
//         return response.json();
//       })
//       .then((data) => setCourses(data))
//       .catch((error) => console.error('Error fetching courses:', error));
//   }, []);

//   useEffect(() => {
//     // Fetch type of tests from the API based on the selected course with error handling
//     if (testData.selectedCourse) {
//       fetch(`http://localhost:3081/course-typeoftests/${testData.selectedCourse}`)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Failed to fetch type of tests');
//           }
//           return response.json();
//         })
//         .then((data) => setTypeOfTests(data))
//         .catch((error) => console.error('Error fetching type of tests:', error));
//     }
//   }, [testData.selectedCourse]);

//   useEffect(() => {
//     // Fetch test data for update with error handling
//     fetch(`http://localhost:3081/testupdate/${testCreationTableId}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Failed to fetch test data for update');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setTestData({
//           ...data,
//           selectedCourse: data.courseCreationId,
//           courseTypeOfTestId: data.courseTypeOfTestId,
//           sectionName: data.sectionName,
//           noOfQuestions: data.noOfQuestions,
//           QuestionLimit: data.QuestionLimit,
//           instructionId: data.instructionId,
//         });
//       })
//       .catch((error) => console.error('Error fetching test data:', error));
//   }, [testCreationTableId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     try {
//       const response = await fetch(`http://localhost:3081/create-test`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           TestName: testData.TestName,
//           selectedCourse: testData.selectedCourse,
//           courseTypeOfTestId: testData.courseTypeOfTestId,
//           testStartDate: testData.testStartDate,
//           testEndDate: testData.testEndDate,
//           testStartTime: testData.testStartTime,
//           testEndTime: testData.testEndTime,
//           Duration: testData.Duration,
//           TotalQuestions: testData.TotalQuestions,
//           totalMarks: testData.totalMarks,
//           calculator: testData.calculator,
//           status: testData.status,
//           sectionName: testData.sectionName,
//           noOfQuestions: testData.noOfQuestions,
//           QuestionLimit: testData.QuestionLimit,
//           instructionId: testData.instructionId,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create test');
//       }
  
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error creating test:', error);
//     }
//   };

//   const handleSectionChange = (e, index) => {
//     const { name, value, type } = e.target;
//     const updatedValue = type === 'number' ? parseFloat(value) : value;

//     setTestData((prevData) => {
//       const updatedSections = [...prevData.selectedsections];
//       updatedSections[index] = {
//         ...updatedSections[index],
//         [name]: updatedValue,
//       };
//       return {
//         ...prevData,
//         selectedsections: updatedSections,
//       };
//     });
//   };

//   return (
//     <div>
//       <h2>Test Update Form</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Test Name:
//           <input type="text" name="TestName" value={testData.TestName} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Select Course:
//           <select name="selectedCourse" value={testData.selectedCourse} onChange={handleChange}>
//             <option value="">Select a Course</option>
//             {courses.map((course) => (
//               <option key={course.courseCreationId} value={course.courseCreationId}>
//                 {course.courseName}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Type of Tests:
//           <select name="courseTypeOfTestId" value={testData.courseTypeOfTestId} onChange={handleChange}>
//             <option value="">Select a Type of Test</option>
//             {typeOfTests.map((typeOfTest) => (
//               <option key={typeOfTest.TypeOfTestId} value={typeOfTest.TypeOfTestId}>
//                 {typeOfTest.TypeOfTestName}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <label>
//           Test Start Date:
//           <input type="date" name="testStartDate" value={testData.testStartDate} onChange={handleChange} />
//         </label>
//         <br />

//         <label>
//           Test End Date:
//           <input type="date" name="testEndDate" value={testData.testEndDate} onChange={handleChange} />
//         </label>
//         <br />

//         <label>
//           Start Time:
//           <input type="time" name="testStartTime" value={formatTime(testData.testStartTime)} onChange={handleChange} />
//         </label>
//         <br />

//         <label>
//           End Time:
//           <input type="time" name="testEndTime" value={formatTime(testData.testEndTime)} onChange={handleChange} />
//         </label>
//         <br />

//         <label>
//           Duration (in minutes):
//           <input type="number" name="Duration" value={testData.Duration} onChange={handleChange} />
//         </label>
//         <br />

//         <label>
//           Total Questions:
//           <input type="number" name="TotalQuestions" value={testData.TotalQuestions} onChange={handleChange} />
//         </label>
//         <br />

//         <label>
//           Total Marks:
//           <input type="number" name="totalMarks" value={testData.totalMarks} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Section Name:
//           <input type="text" name="sectionName" value={testData.sectionName} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Number of Questions:
//           <input type="number" name="noOfQuestions" value={testData.noOfQuestions} onChange={handleChange} />
//         </label>
//         <br />
//         <label>
//           Question Limit:
//           <input type="number" name="QuestionLimit" value={testData.QuestionLimit} onChange={handleChange} />
//         </label>

//         <label>
//           Instructions:
//           <select
//             value={testData.selectedInstruction}
//             name="instructionId"
//             onChange={handleChange}
//           >
//             <option value="">Select an instruction</option>
//             {instructionsData.map((instruction) => (
//               <option key={instruction.instructionId} value={instruction.instructionId}>
//                 {instruction.instructionHeading}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Calculator:
//           <select name="calculator" value={testData.calculator} onChange={handleChange}>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </label>
//         <br />

//         <label>
//           Status:
//           <select name="status" value={testData.status} onChange={handleChange}>
//             <option value="Active">Active</option>
//             <option value="Inactive">Inactive</option>
//           </select>
//         </label>
//         <br />

//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default TestUpdate;
