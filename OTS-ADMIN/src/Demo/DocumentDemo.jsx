import React, { useState, useEffect } from 'react';

const DocumentUpload = () => {
  const [tests, setTests] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedTest, setSelectedTest] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
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
 
    // Fetch subjects data based on the selected test
    try {
      const response = await fetch(`http://localhost:3081/subjects/${testCreationTableId}`);
 
      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error('Error fetching subjects data:', error);
    }
  };
  const handleSubjectChange = async (event) => {
    const subjectId = event.target.value;
    setSelectedSubject(subjectId);
 
    // Fetch sections data based on the selected subject
    try {
      const response = await fetch(`http://localhost:3081/sections/${subjectId}`);
 
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
    formData.append('subjectId', selectedSubject);
    formData.append('sectionId', selectedSection);
    formData.append('testCreationTableId', selectedTest);

    fetch('http://localhost:3081/upload', {
      method: 'POST',
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
        <label htmlFor="subjectSelect">Select Subject:</label>
        <select id="subjectSelect" onChange={handleSubjectChange} value={selectedSubject}>
          <option value="">Select a Subject</option>
          {subjects.map(subject => (
            <option key={subject.subjectId} value={subject.subjectId}>
              {subject.subjectName}
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





app.post('/upload', upload.single('document'), async (req, res) => {
    const docxFilePath = `uploads/${req.file.filename}`;
    const outputDir = `uploads/${req.file.originalname}_images`;
    try {
      await fs.mkdir(outputDir, { recursive: true });
        const result = await mammoth.convertToHtml({ path: docxFilePath });
        const htmlContent = result.value;
        const $ = cheerio.load(htmlContent);
        const textResult = await mammoth.extractRawText({ path: docxFilePath });
        const textContent = textResult.value;
        const textSections = textContent.split('\n\n');
  
        // Get all images in the order they appear in the HTML
        const images = [];
        $('img').each(function (i, element) {
            const base64Data = $(this).attr('src').replace(/^data:image\/\w+;base64,/, '');
            const imageBuffer = Buffer.from(base64Data, 'base64');
            images.push(imageBuffer);
        });
  
        let j = 0;
        let Question_id;
        for (let i = 0; i < images.length; i++) {
            if (j == 0) {
                const questionRecord = {
                    "question_img": images[i],
                    "testCreationTableId": req.body.testCreationTableId,
                    "sectionId": req.body.sectionId
                };
                console.log(j);
                Question_id = await insertRecord('questions', questionRecord);
                j++;
            } else if (j > 0 && j < 5) {
                const optionRecord = {
                    "option_img": images[i],
                    "question_id": Question_id
                };
                console.log(j);
                await insertRecord('options', optionRecord);
                j++;
            } else if (j == 5) {
                const solutionRecord = {
                    "solution_img": images[i],
                    "question_id": Question_id
                };
                console.log(j);
                await insertRecord('solution', solutionRecord);
                j = 0;
            }
        }
        res.send('Text content and images extracted and saved to the database with the selected topic ID successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error extracting content and saving it to the database.');
    }
  });
  
  async function insertRecord(table, record) {
    try {
        const [result] = await db.query(`INSERT INTO ${table} SET ?`, record);
        console.log(`${table} id: ${result.insertId}`);
        return result.insertId;
    } catch (err) {
        console.error(`Error inserting data into ${table}: ${err}`);
        throw err;
    }
  }