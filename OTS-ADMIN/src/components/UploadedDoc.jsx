import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="documentInfo_container">
      <h2 style={{ textTransform: "uppercase" }}>uploaded documents</h2>
      <div className="documentInfo_contant">
        {data.map((item) => (
          <ul key={item.document_Id} style={{ display: "flex" }} className={item.document_Id % 2 === 0 ? "evenRow" : "oddRow"}>
            <li className="documentInfo">
              <div style={{ display: "flex", gap: "1rem", padding: "10px" }}>
                <p style={{ width: "110px" }}> Doc ID: {item.document_Id}</p>
                <p style={{ width: "500px" }}> Name: {item.documen_name}</p>
                <p style={{ width: "170px" }}>
                  Test Creation Table ID: {item.testCreationTableId}
                </p>
                <p style={{ width: "140px" }}>subject Id : {item.subjectId}</p>
              </div>
            </li>
            <Link to={`/getSubjectData/${item.subjectId}/${item.testCreationTableId}`}>Open Document</Link>
          </ul>
        ))}
      </div>
    </div>
  );
};
