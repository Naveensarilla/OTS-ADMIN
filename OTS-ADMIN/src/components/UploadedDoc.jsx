import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const UploadedDoc = () => {
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

  return (
    <div>
      <div>
        {data.map((item) => (
          <ul key={item.document_Id} style={{ display: "flex", gap: "3rem" }}>
            <li>
              Doc ID: {item.document_Id}, Name: {item.documen_name}, Test Creation Table ID: {item.testCreationTableId}
            </li>
            <Link to={`/api/getDocumentData/${item.document_Id}`}>Open Document</Link>
          </ul>
        ))}
      </div>
    </div>
  );
};
