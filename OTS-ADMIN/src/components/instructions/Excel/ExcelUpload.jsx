import axios from 'axios';
import React, { useState } from 'react'

export const ExcelUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
    };
  

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const response = await axios.post('http://localhost:3081/uploadExcel', formData);
          console.log(response.data);
        } catch (error) {
          console.error('Error uploading file:', error.message);
        }
      };
  return (
    <div>
        <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
    </div>
  )
}
