import React, { useState, useEffect } from 'react';

const DocumentUpload = ({testCreationTableId}) => {
  const [tests, setTests] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch tests data
    fetch('http://localhost:3081/tests')
      .then(response => response.json())
      .then(data => setTests(data))
      .catch(error => console.error('Error fetching tests data:', error));
  }, []);

  const handleTestChange = async (event) => {
    const testCreationTableId = event.target.value;
    setSelectedTest(testCreationTableId);

    // Fetch sections data based on the selected test
    try {
      const response = await fetch(`http://localhost:3081/sections/${testCreationTableId}`);
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections data:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSectionChange = (event) => {
    setSelectedSection(event.target.value);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('sectionId', selectedSection);
    formData.append('testCreationTableId', selectedTest);

    fetch('http://localhost:3082/upload', {
      method: 'post',
      body: formData,
    })
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        alert('Successfully uploaded Document');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <label htmlFor="testSelect">Select Test:</label>
        <select id="testSelect" onChange={handleTestChange} value={selectedTest}>
          <option value="">Select a Test</option>
          {tests.map(test => (
            <option key={test.testCreationTableId} value={test.testCreationTableId}>
              {test.TestName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sectionsSelect">Select Sections:</label>
        <select id="sectionsSelect" onChange={handleSectionChange} value={selectedSection}>
          <option value="">Select a Section</option>
          {sections.map(section => (
            <option key={section.sectionId} value={section.sectionId}>
              {section.sectionName}
            </option>
          ))}
        </select>
      </div>
      <h1>Document Image Uploader</h1>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
