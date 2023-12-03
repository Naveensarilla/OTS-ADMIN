import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
const TestPage = () => {
  const [testData, setTestData] = useState([]);
  const [typeOfTest, setTypeOfTest] = useState([]);
  const { courseCreationId } = useParams();
  useEffect(() => {
    const fetchTestData = async () => {
      try {
        const responseTest = await fetch(`http://localhost:3081/feachingtest/${courseCreationId}`);
        const testData = await responseTest.json();
        setTestData(testData);


        const responseTypeOfTest = await fetch('http://localhost:3081/feachingtypeoftest');
        const typeOfTestData = await responseTypeOfTest.json();
        setTypeOfTest(typeOfTestData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTestData();
  }, [courseCreationId]);

  const handleTypeOfTestClick = async (typeOfTestId) => {
    try {
      // Fetch tests based on typeOfTestId
      const response = await fetch(`http://localhost:3081/feachingtestbytype/${typeOfTestId}`);
      const testData = await response.json();
      setTestData(testData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        <ul>
        {typeOfTest.map((type) => (
          <li key={type.typeOfTestId}>
            {/* Use the Link to trigger the handleTypeOfTestClick */}
            <Link to="#" onClick={() => handleTypeOfTestClick(type.typeOfTestId)}>
             {type.typeOfTestName}
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {testData.map((test) => (
          <React.Fragment key={test.testCreationTableId}>
            <li>
              Test Name: {test.TestName}
            </li>
            <li>
              Test Start Date: {test.testStartDate}
            </li>
            <li>
              Test End Date: {test.testEndDate}
            </li>
            <li><Link to={`/Instructions/${test.testCreationTableId}`}>start Test</Link></li>

          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default TestPage;
