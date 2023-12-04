import React, { useState, useEffect } from 'react';

const DisplayImages = () => {
  const [imageNames, setImageNames] = useState([]);

  useEffect(() => {
    const fetchImageNames = async () => {
      try {
        const response = await fetch('http://localhost:3081/image-list');
        const data = await response.json();
        setImageNames(data);
      } catch (error) {
        console.error('Error fetching image names:', error);
      }
    };

    fetchImageNames();
  }, []);

  return (
    <div>
      {imageNames.map((imageName, index) => (
        <img key={index} src={`http://localhost:3081/images/${imageName}`} alt={`Image ${index}`} />
      ))}
    </div>
  );
};

export default DisplayImages;
