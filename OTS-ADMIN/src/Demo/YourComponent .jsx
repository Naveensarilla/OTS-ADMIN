import React from 'react';
import ImageDisplay from './ImageDisplay ';

export const YourComponent = () => {
  // Define the number of images for each type
  const imageCounts = {
    question: 1,
    option: 4,
    solution: 1,
  };

  // Generate an array with the specified counts
  const imageArray = Object.entries(imageCounts).flatMap(([type, count]) =>
    Array.from({ length: count }, (_, index) => ({ type, id: index + 1 }))
  );

  return (
    <div>
      <ImageDisplay imageArray={imageArray} />
    </div>
  );
};
