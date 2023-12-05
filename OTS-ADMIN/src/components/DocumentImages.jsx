import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "../Demo/ImageGallery ";

const DocumentImages = () => {
  // // working for getting data hgfjd1232

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3081/documentName");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [questionData, setQuestionData] = useState([]);

  useEffect(() => {
    // Fetch all images from the server
    fetch("http://localhost:3081/api/getAllImages")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setQuestionData(data);
        } else {
          console.error(
            "Invalid data structure received from the server:",
            data
          );
        }
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div>
      {/* // working for getting data hgfjd1232
       */}
      <div>
        {data.map((item) => (
          <ul key={item.document_Id} style={{ display: "flex", gap: "3rem" }}>
            <li>
              Doc ID: {item.document_Id}, Test ID:{" "}
            
              Name:   {item.documen_name}

              testCreationTableId: {item.testCreationTableId}
            </li>
            <Link>Open dgsf</Link>
          </ul>
        ))}
      </div>

<br />
<br />
<div>
    <ImageGallery />
</div>
1

      <br />
      <br />
      {questionData.map((question, index) => (
        <div key={index}>
          <h2>Question {index + 1}</h2>
          <img src={question.questionImage} alt={`Question ${index + 1}`} />

          <h3>Option Images</h3>
          {question.optionImages.map((image, optionIndex) => (
            <img
              key={optionIndex}
              src={image}
              alt={`Option ${optionIndex + 1}`}
            />
          ))}

          <h3>Solution Image</h3>
          {question.solutionImage && (
            <img src={question.solutionImage} alt={`Solution ${index + 1}`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default DocumentImages;
