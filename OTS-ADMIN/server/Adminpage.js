const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
// const fs = require('fs').promises;
const app = express();
const port = 3081;

app.use(express.json());
app.use(cors());


const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'admin_project',
});

// const storage = multer.diskStorage({
//   destination: async (req, file, cb) => {
//     const uploadDir = 'uploads/';
//     await fs.mkdir(uploadDir, { recursive: true });
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

//______________________exam creation start__________________________

//-----------------------------geting subjects in exam creation page ------------------------
app.get('/subjects', async (req, res) => {
  // Fetch subjects
  try {
    const [rows] = await db.query('SELECT * FROM subjects');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//--------------------------------------------END--------------------------------------------------
//---------------------------------------------inserting exam creation page data-------------------------------------------------

app.post('/exams', async (req, res) => {
  // Create exams
  const { examName, startDate, endDate, selectedSubjects } = req.body;

  try {
    const [examResult] = await db.query(
      'INSERT INTO exams (examName, startDate, endDate) VALUES (?, ?, ?)',
      [examName, startDate, endDate]
    );

    const insertedExamId = examResult.insertId;
    for (const subjectId of selectedSubjects) {
      await db.query(
        'INSERT INTO exam_creation_table (examId, subjectId) VALUES (?, ?)',
        [insertedExamId, subjectId]
      );
    }
    res.json({ message: 'Exam created successfully', examId: insertedExamId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  //--------------------------------------------END--------------------------------------------------
  //--------------------------------------------desplaying only selected subjects in table in ecam creation page --------------------------------------------------
 
app.get('/exams-with-subjects', async (req, res) => {
  // Display selected subjects in table
  try {
    const query = `
      SELECT e.examId, e.examName, e.startDate, e.endDate, GROUP_CONCAT(s.subjectName) AS subjects
      FROM exams AS e
      JOIN exam_creation_table AS ec ON e.examId = ec.examId
      JOIN subjects AS s ON ec.subjectId = s.subjectId
      GROUP BY e.examId
    `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
  //--------------------------------------------END--------------------------------------------------
  //--------------------------------------------Deleting exams from table(dalete button) --------------------------------------------------
  app.delete('/exams/:examId', async (req, res) => {
    const examId = req.params.examId;
  
    try {
      await db.query('DELETE FROM exams WHERE examId = ?', [examId]);
      // You might also want to delete related data in other tables (e.g., exam_creation) if necessary.
  
      res.json({ message: `Exam with ID ${examId} deleted from the database` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //--------------------------------------------END--------------------------------------------------

  //-------------------------------------------insertion/Deleting subjects in table --------------------------------------------------
  app.put('/exams/:examId/subjects', async (req, res) => {
    const { examId } = req.params;
    const { subjects } = req.body;
  
    try {
      // First, you can delete the existing subjects associated with the exam.
      await db.query('DELETE FROM exam_creation_table WHERE examId = ?', [examId]);
  
      // Then, insert the updated subjects into the exam_creation_table.
      for (const subjectId of subjects) {
        await db.query(
          'INSERT INTO exam_creation_table (examId, subjectId) VALUES (?, ?)',
          [examId, subjectId]
        );
      }
  
      res.json({ message: 'Subjects updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//--------------------------------------------END--------------------------------------------------

//--------------------------------------------updationg exam--------------------------------------------------
  app.get('/update/:examId', async (req, res) => {
    const query = 'SELECT * FROM exams WHERE examId = ?';
    const examId = req.params.examId;
    try {
      const [result] = await db.query(query, [examId]);
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //--------------------------------------------END--------------------------------------------------
  //--------------------------------------------updation subjects--------------------------------------------------
app.put('/updatedata/:examId', async (req, res) => {
  const updateExamQuery = "UPDATE exams SET examName=?, startDate=?, endDate=? WHERE examId=?";
  const updateSubjectsQuery = "UPDATE exam_creation_table SET subjectId=? WHERE examId=?";

  const examId = req.params.examId;
  const { examName, startDate, endDate, subjects } = req.body;

  try {
    // Update exam details
    await db.query(updateExamQuery, [examName, startDate, endDate, examId]);

    // Check if subjects is an array before updating
    if (Array.isArray(subjects)) {
      // Update subjects
      await Promise.all(subjects.map(subjectId => db.query(updateSubjectsQuery, [subjectId, examId])));
    }

    res.json({ updated: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//--------------------------------------------END--------------------------------------------------
//--------------------------------------------geting only selected subjects in edit page--------------------------------------------------
app.get('/exams/:examId/subjects', async (req, res) => {
    const examId = req.params.examId;
  
    try {
      const [rows] = await db.query('SELECT subjectId FROM exam_creation_table WHERE examId = ?', [examId]);
      const selectedSubjects = rows.map(row => row.subjectId);
      res.json(selectedSubjects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//--------------------------------------------END--------------------------------------------------
//--------------------------------------------updating subjects--------------------------------------------------
  app.put('/exams/:examId/subjects', async (req, res) => {
    const { examId } = req.params;
    const { subjects } = req.body;
  
    try {
      // First, delete the existing subjects associated with the exam.
      await db.query('DELETE FROM exam_creation_table WHERE examId = ?', [examId]);
  
      // Then, insert the updated subjects into the exam_creation_table.
      for (const subjectId of subjects) {
        await db.query(
          'INSERT INTO exam_creation_table (examId, subjectId) VALUES (?, ?)',
          [examId, subjectId]
        );
      }
  
      res.json({ message: 'Subjects updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //--------------------------------------------END--------------------------------------------------
//_____________________Exam creation end__________________________
//______________________courese creation start__________________________

// --------------- fetch type of test names -----------------------------
app.get('/type_of_tests', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT typeOfTestId, typeOfTestName FROM type_of_test');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// --------------- fetch type of Questions -----------------------------
app.get('/type_of_questions', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT quesionTypeId, typeofQuestion FROM quesion_type');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// app.get('/question_types', async (req, res) => {
//   try {
//     const query = 'SELECT * FROM quesion_type'; // Replace with your actual query
//     const [rows] = await db.query(query);
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


// --------------- fetch exams -----------------------------
app.get('/courese-exams', async (req, res) =>{
  try{
const [rows] = await db.query('SELECT  examId,examName FROM exams');
res.json(rows);
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 // --------------- fetch subjects -----------------------------
app.get('/courese-exam-subjects/:examId/subjects', async (req, res) => {
  const examId = req.params.examId;

  try {
    const query = `
      SELECT s.subjectId, s.subjectName
      FROM subjects AS s
      JOIN exam_creation_table AS ec ON s.subjectId = ec.subjectId
      WHERE ec.examId = ?
    `;
    const [rows] = await db.query(query, [examId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --------------- inserting data into course_creation_table -----------------------------
app.post('/course-creation', async (req, res) => {
  const {
    courseName, examId, courseStartDate, courseEndDate, cost, discount, totalPrice,
  } = req.body;

  try {
    // Insert the course data into the course_creation_table
    const [result] = await db.query(
      'INSERT INTO course_creation_table (courseName,  examId,  courseStartDate, courseEndDate , cost, Discount, totalPrice) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [courseName, examId, courseStartDate, courseEndDate, cost, discount, totalPrice]
    );

    // Check if the course creation was successful
    if (result && result.insertId) {
      const courseCreationId = result.insertId;

      // Return the courseCreationId in the response
      res.json({ message: 'Course created successfully', courseCreationId });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --------------- inserting data into course_typeOftests,course_subjects,course_type_of_question  -----------------------------
app.post('/course_type_of_question', async (req, res) => {
  try {
    // Extract data from the request body
    const { courseCreationId, typeOfTestIds, subjectIds, typeofQuestion } = req.body;
    // console.log('Received request to add subjects and question types for courseCreationId:', courseCreationId);


    console.log('Received data:', req.body);

    for (const typeOfTestId of typeOfTestIds) {
      const query = 'INSERT INTO course_typeOftests (courseCreationId, typeOfTestId) VALUES (?, ?)';
      const values = [courseCreationId, typeOfTestId];
    
      // Log the query before execution
      console.log('Executing query:', db.format(query, values));
    
      // Execute the query
      await db.query(query, values);
    }
    
    // Insert subjects into the course_subjects table
    for (const subjectId of subjectIds) {
      const query = 'INSERT INTO course_subjects (courseCreationId, subjectId) VALUES (?, ?)';
      const values = [courseCreationId, subjectId]
      console.log('Executing query:', db.format(query, values));
      await db.query(query, values);
    }

    // Insert question types into the course_type_of_question table
     for (const quesionTypeId of typeofQuestion) {
      const query = 'INSERT INTO course_type_of_question (courseCreationId, quesionTypeId) VALUES (?, ?)';
      const values = [courseCreationId, quesionTypeId]
      console.log('Executing query:', db.format(query, values));
      await db.query(query, values);
    }

    // Respond with success message
    res.json({ success: true, message: 'Subjects and question types added successfully' });
  } catch (error) {
        console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// --------------- geting data into course_creation_table,course_typeOftests,course_subjects,course_type_of_question  -----------------------------
app.get('/course_creation_table', async (req, res) => {
  try {
    const query = `
    SELECT
    cc.*,
    subjects.subjects AS subjects,
    questions.quesion_types AS question_types,
    e.examName,
    typeOfTests.type_of_test AS type_of_test
FROM
    course_creation_table cc
      
    LEFT JOIN(
    SELECT ctt.courseCreationId,
        GROUP_CONCAT(t.typeOfTestName) AS type_of_test
    FROM
        course_typeoftests ctt
    LEFT JOIN type_of_test t ON
        ctt.typeOfTestId = t.typeOfTestId
    GROUP BY
        ctt.courseCreationId
) AS typeOfTests
ON
    cc.courseCreationId = typeOfTests.courseCreationId
    
    
LEFT JOIN(
    SELECT cs.courseCreationId,
        GROUP_CONCAT(s.subjectName) AS subjects
    FROM
        course_subjects cs
    LEFT JOIN subjects s ON
        cs.subjectId = s.subjectId
    GROUP BY
        cs.courseCreationId
) AS subjects
ON
    cc.courseCreationId = subjects.courseCreationId
LEFT JOIN(
    SELECT ct.courseCreationId,
        GROUP_CONCAT(q.typeofQuestion) AS quesion_types
    FROM
        course_type_of_question ct
    LEFT JOIN quesion_type q ON
        ct.quesionTypeId = q.quesionTypeId
    GROUP BY
        ct.courseCreationId
) AS questions
ON
    cc.courseCreationId = questions.courseCreationId
JOIN exams AS e
ON
    cc.examId = e.examId;
     `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// --------------- deleting data into course_creation_table,course_typeOftests,course_subjects,course_type_of_question  -----------------------------
app.delete('/course_creation_table_Delete/:courseCreationId', async (req, res) => {
  const courseCreationId = req.params.courseCreationId;

  try {
    await db.query('DELETE course_creation_table, course_subjects, course_type_of_question, course_typeoftests FROM course_creation_table LEFT JOIN course_typeoftests ON course_creation_table.courseCreationId = course_typeoftests.courseCreationId LEFT JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId LEFT JOIN course_type_of_question ON course_creation_table.courseCreationId = course_type_of_question.courseCreationId WHERE course_creation_table.courseCreationId = ?', [courseCreationId]);

    res.json({ message: `course with ID ${courseCreationId} deleted from the database` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --------------- updating data into course_creation_table,course_typeOftests,course_subjects,course_type_of_question  -----------------------------
app.get('/courseupdate/:courseCreationId', async (req, res) => {
    const courseCreationId = req.params.courseCreationId;
  
    try {
      const query = `
      SELECT
      cc.*,
      subjects.subjects AS subjects,
      questions.quesion_types AS question_types,
      e.examName,
      typeOfTests.type_of_test AS type_of_test
  FROM
      course_creation_table cc
      
   LEFT JOIN(
      SELECT ctt.courseCreationId,
          GROUP_CONCAT(t.typeOfTestName) AS type_of_test
      FROM
          course_typeoftests ctt
      LEFT JOIN type_of_test t ON
          ctt.typeOfTestId = t.typeOfTestId
      GROUP BY
          ctt.courseCreationId
  ) AS typeOfTests
  ON
      cc.courseCreationId = typeOfTests.courseCreationId   
      
  LEFT JOIN(
      SELECT cs.courseCreationId,
          GROUP_CONCAT(s.subjectName) AS subjects
      FROM
          course_subjects cs
      LEFT JOIN subjects s ON
          cs.subjectId = s.subjectId
      GROUP BY
          cs.courseCreationId
  ) AS subjects
  ON
      cc.courseCreationId = subjects.courseCreationId
  LEFT JOIN(
      SELECT ct.courseCreationId,
          GROUP_CONCAT(q.typeofQuestion) AS quesion_types
      FROM
          course_type_of_question ct
      LEFT JOIN quesion_type q ON
          ct.quesionTypeId = q.quesionTypeId
      GROUP BY
          ct.courseCreationId
  ) AS questions
  ON
      cc.courseCreationId = questions.courseCreationId
  JOIN exams AS e
  ON
      cc.examId = e.examId
  WHERE
      cc.courseCreationId = ?;
      `;
  
      const [course] = await db.query(query, [courseCreationId]);
  
      if (!course) {
        res.status(404).json({ error: 'Course not found' });
        return;
      }
  
      res.json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


  // --------------- feaching selected data from course_typeOftests,course_subjects,course_type_of_question  -----------------------------
 app.get('/course_subjects/:courseCreationId', async (req, res) => {
    const courseCreationId = req.params.courseCreationId;
  
    try {
      // Query the database to get selected subjects for the specified courseCreationId
      const query = `
        SELECT cs.subjectId
        FROM course_subjects AS cs
        WHERE cs.courseCreationId = ?
      `;
      const [rows] = await db.query(query, [courseCreationId]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/course-type-of-questions/:courseCreationId', async (req, res) => {
    const courseCreationId = req.params.courseCreationId;
  
    try {
      const query = `
        SELECT ctoq.quesionTypeId, qt.typeofQuestion
        FROM course_type_of_question AS ctoq
        JOIN quesion_type AS qt ON ctoq.quesionTypeId = qt.quesionTypeId
        WHERE ctoq.courseCreationId = ?
      `;
      const [rows] = await db.query(query, [courseCreationId]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/course-type-of-test/:courseCreationId', async (req, res) => {
    const courseCreationId = req.params.courseCreationId;
  
    try {
      const query = `
        SELECT ctot.typeOfTestId , tt.typeOfTestName
        FROM course_typeoftests AS ctot
        JOIN type_of_test AS tt ON ctot.typeOfTestId  = tt.typeOfTestId 
        WHERE ctot.courseCreationId = ?
      `;
      const [rows] = await db.query(query, [courseCreationId]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.put('/update-course/:courseCreationId', async (req, res) => {
    const courseCreationId = req.params.courseCreationId;
  
    const {
      courseName,
      selectedExam,
      courseStartDate,
      courseEndDate,
      cost,
      discount,
      totalPrice,
    } = req.body;
  
    const updateQuery = `
      UPDATE course_creation_table
      SET
        courseName = ?,
        examId = ?,
        courseStartDate = ?,
        courseEndDate = ?,
        cost = ?,
        Discount = ?,       
        totalPrice = ?
      WHERE courseCreationId = ?;
    `;
  
    try {
      await db.query(updateQuery, [
        courseName,
        selectedExam,
        courseStartDate,
        courseEndDate,
        cost,
        discount,
        totalPrice,
        courseCreationId,
      ]);
      const selectedtypeOfTest = req.body.selectedtypeOfTest;
      const deleteTypeOfTestQuery = 'DELETE FROM course_typeoftests WHERE courseCreationId = ?';
      await db.query(deleteTypeOfTestQuery, [courseCreationId]);
  
      const insertTestOfTestQuery = 'INSERT INTO course_typeoftests (courseCreationId, typeOfTestId) VALUES (?, ?)';
      for (const typeOfTestId of selectedtypeOfTest) {
        await db.query(insertTestOfTestQuery, [courseCreationId, typeOfTestId]);
      }

      // Handle subjects update (assuming course_subjects table has columns courseCreationId and subjectId)
      const selectedSubjects = req.body.selectedSubjects;
      const deleteSubjectsQuery = 'DELETE FROM course_subjects WHERE courseCreationId = ?';
      await db.query(deleteSubjectsQuery, [courseCreationId]);
  
      const insertSubjectsQuery = 'INSERT INTO course_subjects (courseCreationId, subjectId) VALUES (?, ?)';
      for (const subjectId of selectedSubjects) {
        await db.query(insertSubjectsQuery, [courseCreationId, subjectId]);
      }
  
      // Handle question types update (assuming course_type_of_question table has columns courseCreationId and quesionTypeId)
      const selectedQuestionTypes = req.body.selectedQuestionTypes;
      const deleteQuestionTypesQuery = 'DELETE FROM course_type_of_question WHERE courseCreationId = ?';
      await db.query(deleteQuestionTypesQuery, [courseCreationId]);
  
      const insertQuestionTypesQuery = 'INSERT INTO course_type_of_question (courseCreationId, quesionTypeId) VALUES (?, ?)';
      for (const quesionTypeId of selectedQuestionTypes) {
        await db.query(insertQuestionTypesQuery, [courseCreationId, quesionTypeId]);
      }
  
      res.json({ message: 'Course updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
//______________________courese creation end __________________________
//______________________INSTRUCTION page __________________________
//______________________end __________________________

//______________________TEST CREATION PAGE __________________________

app.get('/testcourses', async (req, res) => {
  try {
    const [ rows ] = await db.query('SELECT courseCreationId,courseName FROM course_creation_table');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/create-test', async (req, res) => {
  const {
    testName,
    selectedCourse,
    startDate,
    startTime,
    endDate,
    endTime,
    duration,
    totalQuestions,
    totalMarks,
    calculator,
    status,
  } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO test_creation_table (TestName, courseCreationId, testStartDate, teatEndDate, testStartTime, testEndTime, Duration, TotalQuestions, totalMarks, calculator, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [testName, selectedCourse, startDate, endDate, startTime, endTime, duration, totalQuestions, totalMarks, calculator, status]
    );

    if (result && result.insertId) {
      const testCreationTableId = result.insertId;
      res.json({ success: true, testCreationTableId, message: 'Test created successfully' });
    }
  } catch (error) {
    console.error('Error creating test:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});



//______________________end __________________________



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});