import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import PaperHeader from "../../Components/PaperHeader/PaperHeader";
// import "./Paper.css";
const Paper1 = () => {
  const [questionData, setQuestionData] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [Subjects, setSubjects] = useState([]);
  const { testCreationTableId, subjectId } = useParams();
  const [sections, setSections] = useState([]);
 
 
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:3081/subjects/${testCreationTableId}`
        );
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchSubjects();
  }, [testCreationTableId]);
 
 
 
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `http://localhost:3081/fetchSections/${testCreationTableId}`
        );
        const data = await response.json();
        setSections(data);
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchSections();
  }, [testCreationTableId]);
 
 
  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3081/getPaperData/${testCreationTableId}/${subjectId}`
        );
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchQuestionData();
  }, [testCreationTableId]);
 
 
 
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionData.length).fill("")
  );
 
  const handleNextClick = () => {
    // Update the current question index to move to the next question
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questionData.length - 1 ? prevIndex + 1 : prevIndex
    );
  };
 
  const onAnswerSelected = (optionIndex) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);
  };
 
  const [activeQuestion, setActiveQuestion] = useState(0);
  const clearResponse = () => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = "";
    setSelectedAnswers(updatedSelectedAnswers);
  };
 
  const goToPreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Save the current timer value for the question
   
      const updatedTimers = [...timers];
 
      updatedTimers[prevIndex] = timer;
 
      setTimers(updatedTimers);
 
      // Move to the previous question
 
      return prevIndex - 1;
    });
 
    if (questionData > 0) {
      setActiveQuestion(questionData - 1);
    }
  };
 
  // ---------------------------------Timer code Start--------------------------------
  const [timer, setTimer] = useState(0);
  const [timers, setTimers] = useState(new Array(questionData.length).fill(0));
 
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
 
    const minutes = Math.floor((seconds % 3600) / 60);
 
    const remainingSeconds = seconds % 60;
 
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
  };
 
  useEffect(() => {
    // Set the timer to the saved value for the current question
    setTimer(timers[currentQuestionIndex] || 0);
    let interval;
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    // Clear the interval when the component unmounts or when the user moves to the next question
    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionIndex, timers]);
  // ------------------------------------Timer code end--------------------------------
 
  return (
    <div>
      {/* <div>
        <PaperHeader />
      </div> */}
      <div className="subjects">
        {Subjects.map((subjectTitle, index) => (
          <li key={index}>
            <button className="subject-btn">{subjectTitle.subjectName}</button>
          </li>
        ))}
      </div>
      <div className="second-header">
        <div className="single-select-question">
          {sections.map((sectionTitle,index)=>(
            <li key={index}>
              <p>{sectionTitle.sectionName}</p>
            </li>
          ))}
          {/* Single Select Question */}
        </div>
        <div className="right-header">
          <div className="marks">
            Marks: <div className="plus-mark">+1</div>
            <div className="minus-mark">-1</div>
          </div>
          <div>Timer: {formatTime(timer)}</div>
        </div>
      </div>
      <div>
      {questionData.length > 0 && (
        <div>
          <h4>
            {currentQuestionIndex + 1}.
            <img
              src={questionData[currentQuestionIndex].question_img}
              alt={`Question ${currentQuestionIndex + 1}`}
            />
          </h4>
 
          {questionData[currentQuestionIndex].optionImages.map(
            (OptionImage, optionIndex) => (
              <li key={optionIndex}>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}-option`}
                  value={optionIndex}
                  checked={
                    selectedAnswers[currentQuestionIndex] === optionIndex
                  }
                  onChange={() => onAnswerSelected(optionIndex)}
                />
                <img
                  key={optionIndex}
                  src={OptionImage.option_img}
                  alt={`Option ${optionIndex + 1}`}
                />
              </li>
            )
          )}
          <div className="flex-right">
            <button className="clear-btn" onClick={clearResponse}>
              Clear Response
            </button>
            <button
              className="previous-btn"
              onClick={goToPreviousQuestion}
              disabled={questionData === 0}
            >
              <i className="fa-solid fa-angles-left"></i> Previous
            </button>
            <button className="save-btn" onClick={handleNextClick}>
              Next <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </div>
      )}</div>
    </div>
  );
};
 
export default Paper1;