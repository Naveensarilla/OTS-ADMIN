import React, { useEffect, useState } from "react";
import iitjee from "../../Images/iit-jee-course.jpg";
import neet from "../../Images/neet.jpg";
import axios from "axios";

import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";

// ------------------------------------------------------------------------- Questions link---------------------------------------------

// import Questions from '../Questions';
// ------------------------------------------------------------------------- Exams link---------------------------------------------

// import Exams from './Exams';
// ------------------------------------------------------------------------- data ---------------------------------------------

import {
  FooterData,
  nav,
  quiz__Home_continer_left,
  quiz__Home_continer_right,
} from "./Data/HomeLandingPage";

// ------------------------------------------------------------------------- css ---------------------------------------------

import "./HomeLandingPage.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HomeLandingPage = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4009/courses")
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const [questions, setQuestions] = useState([]);
  // useEffect(() => {
  //     axios.get('http://localhost:3002/ug_questions')
  //         .then((res) => {
  //             setQuestions(res.data);
  //             console.log(res.data)
  //         })
  //         .catch((error) => {
  //             console.error('Error fetching data:', error);
  //         });
  // }, []);

  // const [options, setOptions] = useState([]);
  // useEffect(() => {
  //     axios.get('http://localhost:3002/ug_questions/ug_options')
  //         .then((res) => {
  //             setOptions(res.data);
  //             console.log(res.data)
  //         })
  //         .catch((error) => {
  //             console.error('Error fetching data:', error);
  //         });
  // }, []);

  return (
    <>
      <Header />
      <Home_section />
      <Quiz_Courses />
      <Footer />

      {/* <div>
                <div className='courses'>
                    {courses.map((courses, index) => (
                        <h3 key={index}>
                            {courses.course_id}.
                            <Link to='/Questions' element={<Questions />}>
                                {courses.course_name}
                            </Link>
                        </h3>
                    ))}
                </div> */}

      {/* <div className='ug_questions'>
                  {questions.map((questions,index)=> (
                    <div key={questions.id}>
                          {index+1}.<img src={questions.questionTitle} alt={`Question ${questions.id}`} />
                          {options.map((options, index) => (
                              <div key={options.id}>
                                  <ul>
                                      <li>
                                          <img src={options.optionURL} alt={`Option ${options.id}`} />
                                      </li>
                                  </ul>
                              </div>
                          ))
                          }
                    </div>
                ))}
                 
              </div> */}

      {/* </div> */}
    </>
  );
};

export default HomeLandingPage;

// ------------------------------------------------------------------------- header start ---------------------------------------------

export const Header = () => {
  // const [courses, setCourses] = useState([]);
  const [examsug, setExamsug] = useState([0]);

  useEffect(() => {
    axios
      .get("http://localhost:4009/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // const [questions, setQuestions] = useState([]);
  // useEffect(() => {
  //     axios.get('http://localhost:3002/ug_questions')
  //         .then((res) => {
  //             setQuestions(res.data);
  //             console.log(res.data)
  //         })
  //         .catch((error) => {
  //         });
  // }, []);

  // const [options, setOptions] = useState([]);
  // useEffect(() => {
  //     axios.get('http://localhost:3002/ug_questions/ug_options')
  //         .then((res) => {
  //             setOptions(res.data);
  //             console.log(res.data)
  //         })
  //         .catch((error) => {
  //             console.error('Error fetching data:', error);
  //         });
  // }, []);
  const [coursesBtnContainerVisible, setCoursesBtnContainerVisible] =
    useState(false);
  const toggleCoursesBtnContainer = () => {
    setCoursesBtnContainerVisible(!coursesBtnContainerVisible);
  };
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);

  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };
  return (
    <>
      <div className="Quiz_main_page_header">
        {nav.map((nav, index) => {
          return (
            <div key={index} className="Quiz_main_page_navbar">
              <div className="logo">
                <img src={nav.logo} alt="" />
              </div>
              {/* <li  className={showcardactive1?"showcardactive":"showcardactivenone"}> */}

              <div
                className={
                  !showQuizmobilemenu
                    ? "Quiz_main_page_navbar_SUBpart Quiz_main_page_navbar_SUBpart_mobile"
                    : "Quiz_main_page_navbar_SUBpart_mobile"
                }
              >
                <ul>
                  <li>
                    <a href="#home" className="Quiz__home">
                      Home
                    </a>
                  </li>
                  <li className="courses_btn_continer">
                    <button
                      className="courses_btn"
                      onClick={toggleCoursesBtnContainer}
                    >
                      {" "}
                      <h3>courses</h3>
                    </button>
                    {coursesBtnContainerVisible ? (
                      <div className="courses">
                        {examsug.map((e) => {
                          return (
                            <div key={examsug.exam_id}>
                              <a href="">{e.exam_name} </a>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </li>
                </ul>
                <div className="Quiz_main_page_login_signUp_btn">
                  <button>
                    {" "}
                    <h3>Login</h3>
                  </button>
                  <button className="quiz_sign_UP">
                    {" "}
                    <h3>Sign up</h3>
                  </button>
                </div>
              </div>
              <div className="quz_menu" onClick={QuiZ_menu}>
                <div className="lines"></div>
                <div className="lines"></div>
                <div className="lines"></div>
              </div>
            </div>
          );
        })}

        {/* <div className='ug_questions'>
                  {questions.map((questions,index)=> (
                    <div key={questions.id}>
                          {index+1}.<img src={questions.questionTitle} alt={`Question ${questions.id}`} />
                          {options.map((options, index) => (
                              <div key={options.id}>
                                  <ul>
                                      <li>
                                          <img src={options.optionURL} alt={`Option ${options.id}`} />
                                      </li>
                                  </ul>
                              </div>
                          ))
                          }
                    </div>
                ))}
                 
              </div> */}
      </div>
    </>
  );
};

// ------------------------------------------------------------------------- header end ---------------------------------------------

// ------------------------------------------------------------------------- home section ---------------------------------------------

export const Home_section = () => {
  return (
    <>
      <div className="quiz__Home_continer" id="home">
        <div>
          <div className="quiz__Home_continer_left">
            {quiz__Home_continer_left.map((home, index) => {
              return (
                <div key={index} className="quiz__Home_continer_left_subpart">
                  <h3>{home.home_title}</h3>
                  <div className="home_highlight_btns">
                    {/* <button>{home.course1}</button> */}
                    {/* <button>{home.course2}</button>
                                        <button>{home.course3}</button>
                                        <button>{home.course4}</button> */}
                  </div>
                  <div className="home_para_start">
                    <p>{home.our_info}</p>
                    <button>
                      {" "}
                      <a href="#ugcoures">{home.get_started} </a>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="quiz__Home_continer_right">
            {quiz__Home_continer_right.map((homer, index) => {
              return (
                <div key={index}>
                  <Carousel
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                  >
                    <div>
                      <img src={homer.carousel1} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel2} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel3} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel4} alt="" />
                    </div>
                  </Carousel>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

//  export const Home_cards=()=>{
//     return(
//         <>
//          {/* <Courses/> */}
//             {/* <Dropdown /> */}
//         </>
//     )
//  }

export const Quiz_Courses = () => {
  const [coursesug, setCoursesug] = useState([]);
  const [coursespg, setCoursespg] = useState([]);
  const [coursesmba, setCoursesmba] = useState([]);
  const [coursesca, setCoursesca] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4009/coursesug")
      .then((res) => {
        setCoursesug(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4009/coursespg")
      .then((res) => {
        setCoursespg(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4009/coursesmba")
      .then((res) => {
        setCoursesmba(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4009/coursesca")
      .then((res) => {
        setCoursesca(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [examsug, setExamsug] = useState([0]);
  const [examspg, setExamspg] = useState([0]);
  const [examsmba, setExamsmba] = useState([0]);
  const [examsca, setExamsca] = useState([0]);

  useEffect(() => {
    axios
      .get("http://localhost:4009/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(setExamsug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4009/examspg")
      .then((res) => {
        setExamspg(res.data);
        console.log(setExamspg);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4009/examsmba")
      .then((res) => {
        setExamsmba(res.data);
        console.log(setExamsmba);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4009/examsca")
      .then((res) => {
        setExamsca(res.data);
        console.log(setExamsca);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [showcard1, setshowcard1] = useState(true);
  const [showcard2, setshowcard2] = useState(false);
  const [showcard3, setshowcard3] = useState(false);
  const [showcard4, setshowcard4] = useState(false);
  const [showcardactive1, setshowcardactive1] = useState(true);
  const [showcardactive2, setshowcardactive2] = useState(false);
  const [showcardactive3, setshowcardactive3] = useState(false);
  const [showcardactive4, setshowcardactive4] = useState(false);

  const displayexamsug = () => {
    setshowcard1(true);
    setshowcard2(false);
    setshowcard3(false);
    setshowcard4(false);
    setshowcardactive1(true);
    setshowcardactive2(false);
    setshowcardactive3(false);
    setshowcardactive4(false);
  };

  const displayexamspg = () => {
    setshowcard1(false);
    setshowcard2(true);
    setshowcard3(false);
    setshowcard4(false);
    setshowcardactive1(false);
    setshowcardactive2(true);
    setshowcardactive3(false);
    setshowcardactive4(false);
  };
  const displayexamsmba = (e) => {
    setshowcard1(false);
    setshowcard2(false);
    setshowcard3(true);
    setshowcard4(false);
    setshowcardactive1(false);
    setshowcardactive2(false);
    setshowcardactive3(true);
    setshowcardactive4(false);
  };
  const displayexamsca = (e) => {
    setshowcard1(false);
    setshowcard2(false);
    setshowcard3(false);
    setshowcard4(true);
    setshowcardactive1(false);
    setshowcardactive2(false);
    setshowcardactive3(false);
    setshowcardactive4(true);
  };

  // ------------------------exam cards fetching code------------------------------------------

  const [examCardName, setExamCardName] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4009/examData`)
      .then((response) => {
        setExamCardName(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [examCardDetails, setExamCardDetails] = useState([]);
  const examId = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:4009/feachingcourse/${examId}`)
      .then((response) => {
        setExamCardDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [examId]);
  // ------------------------exam cards fetching code------------------------------------------
  return (
    <>
      <div className="Quiz_cards_page" id="ugcoures">
        <div className="Quiz_cards_page_titles">
          {/* ------------------------ ug cards----------------------------- */}

          <div onClick={displayexamsug}>
            {coursesug.map((e, i) => {
              return (
                <div key={i}>
                  <li
                    className={
                      showcardactive1 ? "showcardactive" : "showcardactivenone"
                    }
                  >
                    {e.course_name}
                  </li>
                </div>
              );
            })}
          </div>
          {/* ------------------------ pg cards----------------------------- */}
          <div onClick={displayexamspg}>
            {coursespg.map((e, i) => {
              return (
                <div key={i}>
                  <li
                    className={
                      showcardactive2 ? "showcardactive" : "showcardactivenone"
                    }
                  >
                    {e.course_name}
                  </li>
                </div>
              );
            })}
          </div>
          {/* ------------------------ mba cards----------------------------- */}

          <div onClick={displayexamsmba}>
            {coursesmba.map((e, i) => {
              return (
                <div key={i}>
                  <li
                    className={
                      showcardactive3 ? "showcardactive" : "showcardactivenone"
                    }
                  >
                    {e.course_name}
                  </li>
                </div>
              );
            })}
          </div>

          {/* ------------------------ ca cards----------------------------- */}

          {/* <div onClick={displayexamsca}>
        {coursesca.map((e,i)=>{
            return(
                <div key={i}>
                    <li className={showcardactive4?"showcardactive":"showcardactivenone"}>{e.course_name}</li>
                </div>
            )
        })
        }
</div> */}
        </div>

        <div>
          {/* ------------------------ ug cards----------------------------- */}

          {showcard1 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examsug.map((e) => {
                return (
                  <div key={examsug.exam_id}>
                    <Link to="/home">
                      <h1>{e.exam_name}</h1>{" "}
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : null}
          {/* ------------------------ pg cards----------------------------- */}

          {showcard2 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examspg.map((e) => {
                return (
                  <div key={examspg.exam_id}>
                    <h1>{e.exam_name}</h1>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* ------------------------ mba cards----------------------------- */}

          {showcard3 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examsmba.map((e) => {
                return (
                  <div key={examsmba.exam_id}>
                    <h1>{e.exam_name}</h1>
                  </div>
                );
              })}
            </div>
          ) : null}

          {/* ------------------------ ca cards----------------------------- */}

          {showcard4 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examsca.map((e) => {
                return (
                  <div key={examsca.exam_id}>
                    <h1>{e.exam_name}</h1>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
      <div className="CurrentCourses_div">
        <h1>Current Courses</h1>

        <div className="card_container">
          <div className="first_card">
            <h4>Mock Test-1</h4>
            <div class="card">
              <img src={iitjee} alt="card" width={350} />
              <div class="container">
                <h4>
                  <b>IIT-JEE(Mains&Advanced)</b>
                </h4>
                <br />
                <p>Validity: 25-12-2023</p>
                <p>No of Tests: 3</p>
                <div className="start_now">
                  <Link to="/QuizHome">Start Now</Link>
                </div>
                <div id="buy_now_btn">
                  {/* <Link to='/Payment'> <p>
                    Buy Now: <span>Cost:5000/-</span>
                  </p></Link> */}
                  {/* <Link to="/QuizHome">Start Now</Link> */}
                </div>
              </div>
            </div>
          </div>
          <div className="first_card">
            <h4>Mock Test-2</h4>
            <div class="card">
              <img src={neet} alt="card" width={350} height={230} />
              <div class="container">
                <h4>
                  <b>NEET</b>
                </h4>
                <br />
                <p>Validity: 25-12-2023</p>
                <p>No of Tests: 4</p>
                <div className="start_now">
                  <Link to="/QuizHome">Start Now</Link>
                </div>
                <div id="buy_now_btn">
                  {/* <Link to='/Payment'> <p>
                    Buy Now: <span>Cost:5000/-</span>
                  </p></Link> */}
                  {/* <Link to="/QuizHome">Start Now</Link> */}
                </div>
              </div>
            </div>
          </div>

          {/* --------------practice-------------------- */}

          {/* <div className="first_card">
            <ul>
              {examCardName.map((cardItem) => (
                <li key={cardItem.examId}>
                  <h4>{cardItem.examName}</h4>
                </li>
              ))}
              <div className="card">
                <img src={iitjee} alt="card" width={350} />
                <div className="container">
                  <ul>
                    <h1>hello</h1>
                    {examCardDetails.map((cardDetails) => {
                      <li key={cardDetails.courseCreationId}>
                        <h4>
                          <b>{cardDetails.courseName}</b>
                        </h4>
                        <br />
                        <p>
                          Validity: {cardDetails.courseStartDate}to
                          {cardDetails.courseEndDate}
                        </p>
                        <div className="start_now">
                          <Link to="/QuizHome">Start Now</Link>
                        </div>
                      </li>;
                    })}
                  </ul>
                </div>
              </div>
            </ul>
          </div> */}

          <div className="first_card">
            <ul>
              {examCardName.map((cardItem) => (
                <li key={cardItem.examId}>
                  <h4>{cardItem.examName}</h4>
                </li>
              ))}
              <div className="card">
                <img src={iitjee} alt="card" width={350} />
                <div className="container">
                  <ul>
                    {examCardDetails.map((cardDetails) => (
                      <li key={cardDetails.courseCreationId}>
                        <h4>
                          <b>{cardDetails.courseName}</b>
                        </h4>
                        <br />
                        <p>
                          Validity: ({cardDetails.courseStartDate}) to (
                          {cardDetails.courseEndDate})
                        </p><br />
                        <div className="start_now">
                          <Link to="/QuizHome">Start Now</Link>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ul>
          </div>

          {/* --------------practice-------------------- */}
        </div>
      </div>
    </>
  );
};

// ------------------------------------------------------------------------- Footer ---------------------------------------------

export const Footer = () => {
  return (
    <div className="footer-container footerBg">
      <footer className="footer">
        {FooterData.map((footerItem, footerIndex) => {
          return (
            <div key={footerIndex} className={footerItem.footerCLass}>
              <h4 className={footerItem.footerCs}>{footerItem.fotterTitles}</h4>
              <p>{footerItem.text}</p>

              <ul className="Footer_Ul_links">
                <Link to={footerItem.PrivacyPolicy}>
                  <li>{footerItem.home}</li>
                </Link>

                <Link to={footerItem.TermsAndConditions}>
                  <li>{footerItem.about}</li>
                </Link>

                <Link to={footerItem.RefundPolicy}>
                  <li>
                    {footerItem.career}
                    {footerItem.icon}
                  </li>
                </Link>
              </ul>

              <div className="icontsFooter">
                <i id="footerIcons" className={footerItem.fb}></i>
                <i id="footerIcons" className={footerItem.insta}></i>
                <i id="footerIcons" className={footerItem.linkedin}></i>
                <i id="footerIcons" className={footerItem.youtube}></i>
              </div>
            </div>
          );
        })}
      </footer>
      <div
        className=" footer-linkss"
        style={{
          textAlign: "center",
          borderTop: "1px solid #fff",
          paddingTop: "10px",
          paddingBottom: "10px",
          color: "#fff",
        }}
      >
        {" "}
        <p style={{ margin: "0 auto" }}>
          Copyright © 2023 eGradTutor All rights reserved
        </p>
        {/* <div className='linkIcons' style={{display: 'flex', }}>
            <div className='bgIconLink'>
            <i class="fa-brands fa-facebook"></i>
            </div>
   
            <div className='bgIconLink'>
            <i class="fa-brands fa-instagram"></i>          
            </div>
   
            <div className='bgIconLink'>
            <i class="fa-brands fa-linkedin"></i>
            </div>
   
            <div className='bgIconLink'>
            <i class="fa-brands fa-youtube"></i>          
            </div>
          </div>  */}
      </div>
    </div>
  );
};

//  export const Courses = () => {

//     const [courses, setCourses] = useState([]);

//     useEffect(() => {
//       axios.get('http://localhost:4009/courses')
//         .then((res) => {
//           setCourses(res.data);
//           console.log(res.data)
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }, []);

//     const [selectedCategory, setSelectedCategory] = useState('UG'); // Default to 'UG'
//     const selectCategory = (category) => {
//         setSelectedCategory(category);
//       };
//   return (
//     <>
//        <div className='Quiz_courses'>
//          <div className='cou-container'>
//           <ul className='course-unorderlist'>
//             {courses.map((courses, index) => (
//               <p className="courselist" key={index}>

//                <Dropdown Coureses_Name={courses.course_name} Coureses_Id={courses.course_id} />
//               {/* <Link  className='link' to={`/quiz_coureses/${courses.Coureses_Id}`}>
//                 {courses.course_name}
//                 </Link> */}
//               </p>
//             ))}
//           </ul>

//         </div>
//       </div>
//     </>
//   )
// }

// export const Dropdown = ({ Coureses_Name, Coureses_Id }) => {
//     const [exams, setExams] = useState([]);
//     const[examdefault,setExamdefault]=useState([0])
//     useEffect(() => {
//         axios.get('http://localhost:4009/examsdefult')
//           .then((res) => {
//             setExamdefault(res.data);
//             console.log(examdefault)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);
//     const displayexams = (e) => {
//         setshowcard(!showcard)
//       console.log(e.target.value)
//       axios.get(`http://localhost:4009/exams/` + e.target.value)
//         .then((res) => {
//           setExams(res.data);
//           console.log(res)
//         })
//         .catch((error) => {
//           console.error("Error fetching data:", error);
//         });
//     }
//     // const toggleCoursesBtnContainer = () => {
//     //     //     setCoursesBtnContainerVisible(!coursesBtnContainerVisible);
//     //     // };

//     const[showcard, setshowcard] = useState(0);
//     return (
//       <div>
// {
//     examdefault.map((e)=>{
//         return(
//             <div key={examdefault.exam_id}>
//         <h1>{e.exam_name}</h1>
//             </div>
//         )
//     })
// }

//         <li className='buttonli' key={Coureses_Id}>

//           <button className='button' value={Coureses_Id} onClick={displayexams}>
//             {Coureses_Name}
//             <p>
//             </p>
//           </button>

//           <ul className={showcard ? "exam" :"exam_none "}>

//             {exams.map((exam) => (
//               <li className="exams-name" key={exam.exam_id}>
//                 {/* <Link className="examslink" to={`/quiz_subjects/${exam.exam_id}`}>
//                   {exam.exam_name}
//                 </Link> */}
//                 <Link className="examslink" to='/test' >
//                   {exam.exam_name}
//                 </Link>

//               </li>
//             ))}

//           </ul>

//         </li>

//       </div>
//     )
//   }
