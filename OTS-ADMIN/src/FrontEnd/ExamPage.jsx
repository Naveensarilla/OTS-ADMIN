import React, { useEffect, useState } from 'react';
import "../components/header.css";
import { Link } from 'react-router-dom'; 

const ExamPage = () => {
  const [examData, setExamData] = useState([]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await fetch('http://localhost:3081/examData');
        const data = await response.json();
        setExamData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExamData();
  }, []);

  return (
    <div>
      <ul>
        {examData.map((exam) => (
          <React.Fragment key={exam.examId}>
            <li>
              {exam.examName}
            </li>
            <li>
              Start Date: {exam.startDate}
            </li>
            <li>
              End Date: {exam.endDate}
            </li>
            <li>
              {/* Link to CoursePage with the specific examId */}
              <Link to={`/feachingcourse/${exam.examId}`}>
                View Courses for {exam.examName}
              </Link>
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default ExamPage;
