import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CoursePage = () => {
  const [courseData, setCourseData] = useState([]);
  const { examId } = useParams(); // Get examId from route parameters

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`http://localhost:3081/feachingcourse/${examId}`);
        const data = await response.json();
        setCourseData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourseData();
  }, [examId]);

  return (
    <div>
      <h2>Courses for Exam {examId}</h2>
      <ul>
        {courseData.map((course) => (
          <React.Fragment key={course.courseCreationId}>
            <li>
             {course.courseName}
            </li>
            <li>
              Course Start Date: {course.courseStartDate}
            </li>
            <li>
              Course End Date: {course.courseEndDate}
            </li>
            <li>{course.cost}</li>
            <li>{course.Discount}%</li>
            <li>Price after discount:{course.totalPrice}</li>
            <li>
              <Link to={`/feachingtest/${course.courseCreationId}`}>
                Test Page
              </Link> </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default CoursePage;
