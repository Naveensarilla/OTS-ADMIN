
import React, { useEffect, useState } from "react";
import "./Paper.css";
import PaperHeader from "../../Components/PaperHeader/PaperHeader";
import RightSidebar from "../../Components/RightSidebar/RightSidebar";
// import "../../Components/RightSidebar/RightSidebar.css";
import { DotSpinner } from "@uiball/loaders";
import { Link } from "react-router-dom";
import QuizHome from "../QuizHome/QuizHome";
import DownloadQuizPage from "../DownloadQuizPage/DownloadQuizPage";

const Paper = ({ answeredQuestions }) => {
  const [Qimages, setQImages] = useState([]);
  const [questionStatus, setQuestionStatus] = useState([
    "notAnswered",
    ...Array(29).fill("notVisited"),
  ]);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(0);
  const updateCounters = () => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let markedForReview = 0;
    let Visited = 0;

    questionStatus.forEach((status) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        marked++;
      } else if (status === "Answered but marked for review") {
        markedForReview++;
      } else if (status === "notVisited") {
        Visited++;
      }
    });

    setAnsweredCount(answered);
    setNotAnsweredCount(notAnswered);
    setAnsweredmarkedForReviewCount(marked);
    setMarkedForReviewCount(markedForReview);
    setVisitedCount(Visited);
  };

  // const [Qimages, setQImages] = useState([]);
  const [OPTimages, setOPTImages] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(Qimages.length).fill("")
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    // Fetch data for Qimages (first image from each set of IDs 1-6, 7-12, ...)
    const fetchQImages = async () => {
      let fetchedQImages = [];

      for (let i = 1; i <= 1000; i += 6) {
        // Assuming there are 100 sets of images
        try {
          const response = await fetch(`http://localhost:4009/images/${i}`);
          const data = await response.json();
          if (data.length > 0) {
            fetchedQImages.push(data[0]); // Add only the first image from each set
          }
        } catch (error) {
          console.error("Error fetching Qimages:", error);
        }
      }

      setQImages(fetchedQImages);
    };

    // Fetch data for OPTimages (images 2 to 5 from each set of IDs 1-6, 7-12, ...)
    const fetchOPTImages = async () => {
      let fetchedOPTImages = [];

      for (let i = 1; i <= 1000; i += 6) {
        // Assuming there are 100 sets of images
        try {
          for (let j = i + 1; j <= i + 4; j++) {
            const response = await fetch(`http://localhost:4009/images/${j}`);
            const data = await response.json();
            if (data.length > 0) {
              fetchedOPTImages.push(data[0]); // Add the second to fifth images from each set
            }
          }
        } catch (error) {
          console.error("Error fetching OPTimages:", error);
        }
      }

      setOPTImages(fetchedOPTImages);
    };

    fetchQImages();
    fetchOPTImages();

    updateCounters();
  }, [questionStatus]); // Empty dependency array to fetch data only once when the component mounts

  const [timers, setTimers] = useState(new Array(Qimages.length).fill(0));
  const [timer, setTimer] = useState(0);

  const onAnswerSelected = (OptionLetter) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = OptionLetter;
    setSelectedAnswers(updatedSelectedAnswers);

    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[activeQuestion] = "answered";
    setQuestionStatus(updatedQuestionStatus);
  };

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
    if (activeQuestion > 0) {
      setActiveQuestion(activeQuestion - 1);
    }
  };

  const [accuracy, setAccuracy] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [topScore, setTopScore] = useState(0);
  const [liveRank, setLiveRank] = useState(0);

  // const calculateResult = () => {
  //     // Calculate accuracy
  //     const totalAttempted = answeredQuestions.length;
  //     const totalCorrect = result.correctAnswers;
  //     const calculatedAccuracy = (totalCorrect / totalAttempted) * 100;
  //     setAccuracy(calculatedAccuracy.toFixed(2));

  //     // Calculate average score
  //     const calculatedAverageScore = result.score / totalAttempted;
  //     setAverageScore(calculatedAverageScore.toFixed(2));

  //     // Placeholder for live ranking data - Replace this with actual data
  //     const calculatedTopScore = 100;
  //     const calculatedLiveRank = 1;

  //     setTopScore(calculatedTopScore);
  //     setLiveRank(calculatedLiveRank);
  // };

  const calculateResult = () => {
    // Make sure answeredQuestions is defined before accessing its length
    const totalAttempted = answeredQuestions ? answeredQuestions.length : 0;
    const totalCorrect = result.correctAnswers;
    const calculatedAccuracy =
      totalAttempted > 0 ? (totalCorrect / totalAttempted) * 100 : 0;
    setAccuracy(calculatedAccuracy.toFixed(2));

    const calculatedAverageScore =
      totalAttempted > 0 ? result.score / totalAttempted : 0;
    setAverageScore(calculatedAverageScore.toFixed(2));

    // Placeholder for live ranking data - Replace this with actual data
    const calculatedTopScore = 0;
    const calculatedLiveRank = 0;

    setTopScore(calculatedTopScore);
    setLiveRank(calculatedLiveRank);
  };

  const handleSubmit = () => {
    window.alert("Your Test has been Submitted!! Click Ok to See Result.");
    setShowResult(true);
    calculateResult();

    //starting result page code

    // const correctAnswer = Qimages[activeQuestion].correct_answer;
    // setResult((prev) =>
    //   selectedAnswers[activeQuestion] === correctAnswer
    //     ? {
    //         ...prev,
    //         score: prev.score + 5,
    //         correctAnswers: prev.correctAnswers + 1,
    //       }
    //     : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    // );
    // if (activeQuestion !== Qimages.length - 1) {
    //   setActiveQuestion((prev) => prev + 1);
    // } else {
    //   window.alert("Your Test has been Submitted!! Click Ok to See Result.");
    //   // setActiveQuestion(0);
    //   setShowResult(true);
    //   calculateResult(); //new added code
    // }
    //end result page code
  };

  const onClickNext = () => {
    // //starting result page code

    // const correctAnswer = Qimages[activeQuestion].correct_answer;
    // setResult((prev) =>
    //   selectedAnswers[activeQuestion] === correctAnswer
    //     ? {
    //         ...prev,
    //         score: prev.score + 5,
    //         correctAnswers: prev.correctAnswers + 1,
    //       }
    //     : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    // );
    // if (activeQuestion !== Qimages.length - 1) {
    //   setActiveQuestion((prev) => prev + 1);
    // } else {
    //   window.alert("Your Test has been Submitted!! Click Ok to See Result.");
    //   // setActiveQuestion(0);
    //   setShowResult(true);
    //   calculateResult(); //new added code
    // }
    // //end result page code

    setCurrentQuestionIndex((prevIndex) => {
      // Save the current timer value for the question

      const updatedTimers = [...timers];

      updatedTimers[prevIndex] = timer;

      setTimers(updatedTimers);
      return prevIndex + 1;
    });

    const updatedQuestionStatus = [...questionStatus];
    // updatedQuestionStatus[activeQuestion] = "notAnswered";

    // Set status of the next question (if any) to "notAnswered"
    if (activeQuestion < Qimages.length - 1) {
      updatedQuestionStatus[activeQuestion + 1] = "notAnswered";
    } else if (!selectedAnswers[activeQuestion] === "answered") {
      updatedQuestionStatus[activeQuestion] = "notAnswered";
    } else if (!markForReview() === true) {
      markForReview();
    } else if (selectedAnswers[activeQuestion]) {
      updatedQuestionStatus[activeQuestion] = "answered";
    } else if (!markForReview() === false) {
      markForReview();
    }

    setQuestionStatus(updatedQuestionStatus);

    const correctAnswer = Qimages[activeQuestion].correct_answer; // Replace 'correct_answer' with the actual property name
    const selectedAnswer = selectedAnswers[activeQuestion];

    if (selectedAnswer === correctAnswer) {
      setResult((prevResult) => ({
        ...prevResult,
        score: prevResult.score + 5,
        correctAnswers: prevResult.correctAnswers + 1,
      }));
    } else {
      setResult((prevResult) => ({
        ...prevResult,
        wrongAnswers: prevResult.wrongAnswers + 1,
      }));
    }

    if (activeQuestion < Qimages.length - 1) {
      setActiveQuestion((prevActiveQuestion) => prevActiveQuestion + 1);
    } else {
      // setShowResult(true);
      calculateResult();
    }
  };

  const markForReview = () => {
    // Update questionStatus for the marked question
    const updatedQuestionStatus = [...questionStatus];
    if (selectedAnswers[activeQuestion]) {
      updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
      // if(selectedAnswers[activeQuestion] === "Answered but marked for review"){
      //   updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
      // }
    } else if (!selectedAnswers[activeQuestion]) {
      updatedQuestionStatus[activeQuestion] = "marked";
    }

    setQuestionStatus(updatedQuestionStatus);
  };

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

  // Check if Qimages[currentQuestionIndex] is defined before accessing its properties
  const currentQuestion = Qimages[currentQuestionIndex];
  const questionImageSrc = currentQuestion
    ? `data:image/png;base64,${currentQuestion.image_data}`
    : "";
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  // const calculateResult = () => {
  //   // Implement additional result calculations here if needed
  //   // Example: Accuracy, Average Score, Top Score, Live Rank, etc.
  // };

  // Timer for whole page

  //   const totalTime = 180 * 60; // 180 minutes in seconds
  //   const [wtimer, setWTimer] = useState(totalTime);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setWTimer((prevTimer) => prevTimer - 1);
  //     }, 1000);

  //     // Clear the interval and handle time-up logic when timer reaches 0
  //     if (timer <= 0) {
  //       clearInterval(interval);
  //       // Handle time-up logic here (e.g., navigate to a different component)
  //     }

  //     // Clean up the interval on component unmount or when navigating away
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }, [timer]);

  //   const WformatTime = (seconds) => {
  //     const hours = Math.floor(seconds / 3600);
  //     const minutes = Math.floor((seconds % 3600) / 60);
  //     const remainingSeconds = seconds % 60;
  //     return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${remainingSeconds > 9 ? remainingSeconds : '0' + remainingSeconds}`;
  //   };

  // const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // const handleButtonClick = (questionNumber) => {
  //   onQuestionSelect(questionNumber);
  //   setAnsweredQuestions([...answeredQuestions, questionNumber]);
  // };



  // const buttons = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30,
  // ];
  // const renderList = buttons.map((item, index) => {
  //   let className = "quesAns-btn";
  //   if (questionStatus && questionStatus[index] === "answered") {
  //     className += "answered";
  //   }
  //   return (
  //     <div>
  //       <button className={className} onClick={() => handleButtonClick(item)}>
  //         {item}
  //       </button>
  //     </div>
  //   );
  // });

  const [opensubject_1, setOpensubject_1] = useState(true);
  const [opensubject_2, setOpensubject_2] = useState(false);
  const [opensubject_3, setOpensubject_3] = useState(false);

  const openAlertSubject1 = () => {
    setOpensubject_1(true);
    setOpensubject_2(false);
    setOpensubject_3(false);
  };
  const openAlertSubject2 = () => {
    setOpensubject_2(true);
    setOpensubject_1(false);
    setOpensubject_3(false);
  };
  const openAlertSubject3 = () => {
    setOpensubject_3(true);
    setOpensubject_2(false);
    setOpensubject_1(false);
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
    setActiveQuestion(questionNumber - 1);
  };

  return (
    <div>
      {!showResult ? (
        <div className="main">
          <div className="sub-main">
            <div>
              <PaperHeader />
            </div>
            <div className="quiz-container">
              {/* {!showResult ? ( */}
              <div>
                <div className="subjects">
                  <button className="subject-btn" onClick={openAlertSubject1}>
                    Mathematics
                  </button>
                  <button className="subject-btn" onClick={openAlertSubject2}>
                    Physics
                  </button>
                  <button className="subject-btn" onClick={openAlertSubject3}>
                    Chemistry
                  </button>
                </div>
                <div className="second-header">
                  <div className="single-select-question">
                    Single Select Question
                  </div>
                  <div className="right-header">
                    <div className="marks">
                      Marks: <div className="plus-mark">+1</div>
                      <div className="minus-mark">-1</div>
                    </div>
                    <div>Timer: {formatTime(timer)}</div>
                  </div>
                </div>
                {/* <div className="question-no">
               <span className="active-question-no">
                 Question No. {addLeadingZero(currentQuestionIndex + 1)}
               </span>
               <span className="total-question">
                 {" "}
                 of {addLeadingZero(Qimages.length)}
               </span>
             </div> */}

                {opensubject_1 ? (
                  <div className="Subject-Container">
                    Mathematics
                    <div className="question-no">
                      <span className="active-question-no">
                        Question No. {addLeadingZero(currentQuestionIndex + 1)}
                      </span>
                      <span className="total-question">
                        {" "}
                        of {addLeadingZero(Qimages.length)}
                      </span>
                    </div>
                    <h2 className="question">
                      {Qimages &&
                      Qimages.length > 0 &&
                      Qimages[activeQuestion] ? (
                        <div>
                          <img
                            src={`data:image/png;base64,${Qimages[activeQuestion].image_data}`}
                            alt={`QImage ${activeQuestion + 1}`}
                          />
                          <ul className="options-container">
                            {OPTimages.slice(
                              activeQuestion * 4,
                              activeQuestion * 4 + 4
                            ).map((optImage, optIndex) => (
                              <li key={optIndex}>
                                <input
                                  type="radio"
                                  name="index"
                                  checked={
                                    selectedAnswers[activeQuestion] ===
                                    String.fromCharCode(65 + optIndex)
                                  }
                                  onChange={() =>
                                    onAnswerSelected(
                                      String.fromCharCode(65 + optIndex)
                                    )
                                  }
                                />
                                <label className="alpha-index">
                                  <img
                                    src={`data:image/png;base64,${optImage.image_data}`}
                                    alt={`OPTImage ${optIndex + 2}-${
                                      optIndex + 5
                                    }`}
                                  />
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="loading-gif">
                          <DotSpinner size={90} speed={0.9} color="black" />
                        </div>
                      )}
                    </h2>
                  </div>
                ) : null}

                {opensubject_2 ? (
                  <div className="Subject-Container">
                    Physics
                    <div className="question-no">
                      <span className="active-question-no">
                        Question No. {addLeadingZero(currentQuestionIndex + 1)}
                      </span>
                      <span className="total-question">
                        {" "}
                        of {addLeadingZero(Qimages.length)}
                      </span>
                    </div>
                    <h2 className="question">
                      {Qimages &&
                      Qimages.length > 0 &&
                      Qimages[activeQuestion] ? (
                        <div>
                          <img
                            src={`data:image/png;base64,${Qimages[activeQuestion].image_data}`}
                            alt={`QImage ${activeQuestion + 1}`}
                          />
                          <ul className="options-container">
                            {OPTimages.slice(
                              activeQuestion * 4,
                              activeQuestion * 4 + 4
                            ).map((optImage, optIndex) => (
                              <li key={optIndex}>
                                <input
                                  type="radio"
                                  name="index"
                                  checked={
                                    selectedAnswers[activeQuestion] ===
                                    String.fromCharCode(65 + optIndex)
                                  }
                                  onChange={() =>
                                    onAnswerSelected(
                                      String.fromCharCode(65 + optIndex)
                                    )
                                  }
                                />
                                <label className="alpha-index">
                                  <img
                                    src={`data:image/png;base64,${optImage.image_data}`}
                                    alt={`OPTImage ${optIndex + 2}-${
                                      optIndex + 5
                                    }`}
                                  />
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="loading-gif">
                          <DotSpinner size={90} speed={0.9} color="black" />
                        </div>
                      )}
                    </h2>
                  </div>
                ) : null}

                {opensubject_3 ? (
                  <div className="Subject-Container">
                    Chemistry
                    <div className="question-no">
                      <span className="active-question-no">
                        Question No. {addLeadingZero(currentQuestionIndex + 1)}
                      </span>
                      <span className="total-question">
                        {" "}
                        of {addLeadingZero(Qimages.length)}
                      </span>
                    </div>
                    <h2 className="question">
                      {Qimages &&
                      Qimages.length > 0 &&
                      Qimages[activeQuestion] ? (
                        <div>
                          <img
                            src={`data:image/png;base64,${Qimages[activeQuestion].image_data}`}
                            alt={`QImage ${activeQuestion + 1}`}
                          />
                          <ul className="options-container">
                            {OPTimages.slice(
                              activeQuestion * 4,
                              activeQuestion * 4 + 4
                            ).map((optImage, optIndex) => (
                              <li key={optIndex}>
                                <input
                                  type="radio"
                                  name="index"
                                  checked={
                                    selectedAnswers[activeQuestion] ===
                                    String.fromCharCode(65 + optIndex)
                                  }
                                  onChange={() =>
                                    onAnswerSelected(
                                      String.fromCharCode(65 + optIndex)
                                    )
                                  }
                                />
                                <label className="alpha-index">
                                  <img
                                    src={`data:image/png;base64,${optImage.image_data}`}
                                    alt={`OPTImage ${optIndex + 2}-${
                                      optIndex + 5
                                    }`}
                                  />
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="loading-gif">
                          <DotSpinner size={90} speed={0.9} color="black" />
                        </div>
                      )}
                    </h2>
                  </div>
                ) : null}

                <div className="flex-right">
                  <button className="clear-btn" onClick={markForReview}>
                    Mark for Review & Next
                  </button>
                  <button className="clear-btn" onClick={clearResponse}>
                    Clear Response
                  </button>
                  <button
                    className="previous-btn"
                    onClick={goToPreviousQuestion}
                    disabled={activeQuestion === 0}
                  >
                    <i className="fa-solid fa-angles-left"></i> Previous
                  </button>
                  <button
                    className="save-btn"
                    onClick={onClickNext}
                    // disabled={!selectedAnswers[activeQuestion]}
                  >
                    {/* {activeQuestion === Qimages.length - 1
                      ? "Submit"
                      : "Save & Next"} */}
                    Save & Next
                    <i className="fa-solid fa-angles-right"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="flex-right">
          <button className="clear-btn" onClick={markForReview}>
            Mark for Review & Next
          </button>
          <button className="clear-btn" onClick={clearResponse}>
            Clear Response
          </button>
          <button
            className="previous-btn"
            onClick={goToPreviousQuestion}
            disabled={activeQuestion === 0}
          >
            <i className="fa-solid fa-angles-left"></i> Previous
          </button>
          <button
            className="save-btn"
            onClick={onClickNext}
            // disabled={!selectedAnswers[activeQuestion]}
          >
            {activeQuestion === Qimages.length - 1 ? "Submit" : "Save & Next"}
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div> */}
          </div>
          <div className="rightsidebar">
            <RightSidebar
              onQuestionSelect={handleQuestionSelect}
              questionStatus={questionStatus}
              setQuestionStatus={setQuestionStatus}
              answeredCount={answeredCount}
              notAnsweredCount={notAnsweredCount}
              answeredmarkedForReviewCount={answeredmarkedForReviewCount}
              markedForReviewCount={markedForReviewCount}
              VisitedCount={VisitedCount}
            />
            <button onClick={handleSubmit} id="resume_btn">
              Submit
            </button>
            {/* <Link to='/QuizHome' element={<QuizHome/>}><button id="resume_btn">Resume</button></Link> */}
          </div>
        </div>
      ) : (
        <div className="result">
          <h3 id="result_header">Result</h3>
          <div className="result_page_links">
            <Link id="result_btn" to="/QuizHome" element={<QuizHome />}>
              Back
            </Link>
            <br />
            {/* <Link to='/writtenTestPaper' element={<writtenTestPaper/>}>Review Your TestPaper</Link> */}
            {/* <br /> */}
            <Link
              id="result_btn"
              to="/DownloadQuizPage"
              element={<DownloadQuizPage />}
            >
              Download QuestionPaper
            </Link>
          </div>
          <div className="result_contents">
            <div className="section_1"></div>
            <div className="section_2"></div>
            <div className="section_3"></div>
            <p>
              Total Questions: <span>{Qimages.length}</span>
            </p>
            <p>
              Total Score:<span> {result.score}</span>
            </p>
            <p>
              Correct Answers:<span> {result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers:<span> {result.wrongAnswers}</span>
            </p>
            <p>
              Accuracy:<span> {accuracy}%</span>
            </p>
            <p>
              Average Score:<span> {averageScore}</span>
            </p>
            <p>
              Top Score:<span> {topScore}</span>
            </p>
            <p>
              Live Rank:<span> {liveRank}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paper;
