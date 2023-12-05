import React, { useState, useEffect } from 'react';

const ImageComponent = () => {
  const [imageIds, setImageIds] = useState([]); // Replace with your actual image IDs
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagePromises = imageIds.map(async (id) => {
          const response = await fetch(`http://localhost:3081/images/question/${id}`); // Replace with your actual API endpoint
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        });

        const imageUrls = await Promise.all(imagePromises);
        setImages(imageUrls);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [imageIds]);

  return (
    <div>
      {images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
};

export default ImageComponent;
