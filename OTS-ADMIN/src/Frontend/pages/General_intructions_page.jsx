import React, { useEffect, useRef, useState } from 'react';
import {
    General_intructions_page_content,
    Navbar,
} from "../../Data/Introduction_page_DATA"
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import Paper from '../Paper/Paper';
// import Paper1 from '../Paper/Paper1'
// import Paper1 from '../Paper/Paper1';

const General_intructions_page = () => {
    return (
        <>
            <General_intructions_page_header />
            <General_intructions_page_container  seconds={600}/>
        </>
    );
};

export default General_intructions_page;

export const General_intructions_page_header = () => {
    return (
        <>
            {Navbar.map((nav, index) => {
                return (
                    <div className="Quiz_General_header" key={index}>
                        <h1>{nav.Q_page_title}</h1>
                        <div className="Q_title">
                            {/* <p>{nav.time_limt}</p> */}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export const General_intructions_page_container = () => {

    

    //  const [countdown, setCountdown] = useState(seconds);
        // const timerId = useRef();

        // useEffect(() => {
        //     if (countdown <= 0) {
        //         clearInterval(timerId.current);
        //         alert("End");
        //     }
        // }, [countdown]);
        // const navigate = useNavigate();
        // const startCountdown = () => {
        //     timerId.current = setInterval(() => {
        //         setCountdown((prev) => prev - 1);
        //     }, 1000);
        //     navigate('/Paper');
        // };
        const [isChecked, setIsChecked] = useState(false);
 
        const handleCheckboxChange = (e) => {
          setIsChecked(e.target.checked);
        };
    return (
        <>
            {General_intructions_page_content.map((gipc, index) => {
                return (
                    <div key={index} className="Q_container g_container">
                        <h3>{gipc.gnheading}</h3>

                        <div className="Gn_table">
                            <table>
                                <tr>
                                    <th>{gipc.gn_table_heading1}</th>
                                    <th>{gipc.gn_table_heading2}</th>
                                    <th>{gipc.gn_table_heading3}</th>
                                </tr>

                                <tr>
                                    <th>{gipc.m}</th>
                                    <td>{gipc.mq}</td>
                                    <td>{gipc.mm}</td>
                                </tr>
                                <tr>
                                    <th>{gipc.p}</th>
                                    <td>{gipc.pq}</td>
                                    <td>{gipc.pm}</td>
                                </tr>
                                <tr>
                                    <th>{gipc.c}</th>
                                    <td>{gipc.cq}</td>
                                    <td>{gipc.cm}</td>
                                </tr>
                                <tr>
                                    <td>{gipc.t}</td>
                                    <th>{gipc.tq}</th>
                                    <th>{gipc.tm}</th>
                                </tr>
                            </table>
                        </div>
                        < ul className="gn_points">
                            <li>
                                This test contains
                                <strong>
                                    90&nbsp;questions (need to answer 75 questions).
                                </strong>
                                &nbsp;
                            </li>

                            <li>
                                Total duration of the test is <strong>180&nbsp;minutes.</strong>
                            </li>

                            <li>
                                There are <strong>3 sections</strong> in the question paper
                                consisting of{" "}
                                <strong>Physics, Chemistry and Mathematics</strong> having{" "}
                                <strong>30&nbsp;questions</strong> in each section (
                                <strong>20 MCQs + 10 Numeric Value</strong> Answer Based
                                Questions).
                            </li>


                            <li>
                                <strong>Single Choice Type questions</strong>&nbsp;are
                                allotted <strong>4 (Four)</strong> marks for each question
                                answered correctly and <strong>1 (One) mark</strong> will be
                                deducted for <strong>indicating incorrect </strong>response.
                            </li>

                            <li><strong>Numerical</strong> <strong>Value</strong> &nbsp;Type questions are allotted <strong>4 (Four)</strong> marks for each question answered correctly and<strong>&nbsp;1&nbsp;(one) marks</strong> will be deducted for <strong>indicating incorrect</strong> response.</li>

                            <li>
                                In each section in{" "}
                                <strong>
                                    Numerical Value Type Questions, 5 Questions out of 10 can be
                                    attempted.
                                </strong>
                            </li>

                            <li>In each section in <strong>Numerical Value Type Questions, 5 Questions out of 10 can be attempted.</strong></li>
                            <li>
                                In all the sections, <strong>No deduction</strong> from the
                                total score will be made if <strong>no response</strong> is
                                indicated.
                            </li>


                            <li>
                                The countdown timer at the top right corner of screen will
                                display the remaining time available for you to complete the
                                examination. When the timer reaches zero, the examination will
                                end by itself.
                            </li>


                            <li>Use a scribble pad for any rough work.</li>


                            <li>You are not allowed to use a calculator.</li>

                        </ul>
                    </div>
                );
            })}

            {/* <div className="gn_next_btn_container">
        <Link to='/' className="intro_next_btn">NEXT <AiOutlineArrowRight/></Link>
      </div> */}
      <div>
      {/* <input type="checkbox" onClick={checkbox}/> */}
     
      <div className="gn_checkbox">
      <input type="checkbox" onChange={handleCheckboxChange} className="checkbox" />
      <p> I agree to these <b> Terms and Conditions.</b></p>
      </div>
    </div>
   
 <div className="gn_next_btn_container">
        {isChecked ? (
            //  to="/Paper1" 
          <Link to="/Paper"  className="gn_next_btn">
            I am ready to begin <AiOutlineArrowRight />
          </Link>
        ) : (
          <span className="disabled-link gn_next_btn_bull ">
            I am ready to begin <AiOutlineArrowRight />
          </span>
        )}
      </div>
        </>

    );
};
