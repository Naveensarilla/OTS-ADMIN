import React, { useState, useEffect } from 'react';

// Custom hook for fetching data
const useFetchCount = (url) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming data is an array and the count is in the first object
        const firstObject = data[0];
        const totalCount = firstObject ? firstObject.count : 0;

        console.log('Data received:', totalCount);
        setCount(totalCount);
      })
      .catch((error) => console.error(`Error fetching count from ${url}:`, error.message));
  }, [url]);

  return count;
};

const Dashboard = () => {
  const courseCount = useFetchCount('http://localhost:3081/courses/count');
  const testCount = useFetchCount('http://localhost:3081/test/count');
  const questionCount = useFetchCount('http://localhost:3081/question/count');

  return (
    <div class="bg-gray-100 ml-[255px] " >
    <div class=" min-h-screen flex  gap-4 items-center justify-center">
    
      <h2 class=" bg-pink-500 text-xl font-semibold mb-4 p-8 rounded-lg shadow-lg max-w-md w-full">Total Courses: {courseCount}</h2>
      <h2 class='bg-sky-500 text-xl font-semibold mb-4 p-8 rounded-lg shadow-lg max-w-md w-full'>Total Tests: {testCount}</h2>
      <h2 class='bg-lime-300 text-xl font-semibold mb-4  p-8 rounded-lg shadow-lg max-w-md w-full'>Total Questions: {questionCount}</h2>
    </div></div>
  );
};

export default Dashboard;
