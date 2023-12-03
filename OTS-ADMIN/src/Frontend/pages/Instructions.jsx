
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai"
import { Link } from "react-router-dom";
import './Instructions.scss'
// =============================== nav-data ===============================
import { Navbar, Intro_content } from "../../Data/Introduction_page_DATA";

// =============================== css ===============================
// import "./styles/introducationpage.css";
const Introduction_page = () => {
    return (
        <>
            <Header />
            <Intro_container />
        </>
    );
};

export default Introduction_page;

export const Header = () => {
    return (
        <>
            {Navbar.map((nav, index) => {
                return (
                    <div className="Quiz_header" key={index}>
                        <div className="Q_logo">
                            <img src={nav.Q_logo} alt="" />
                        </div>
                        <div className="Q_title">
                            <h1>{nav.Q_page_title}</h1>
                        </div>
                    </div>
                );
            })}
        </>
    );
};
export const Intro_container = () => {
    return (
        <>
            {Intro_content.map((Intro_content, index) => {
                return (

                    <div key={index} className="Q_container">
                        <h2>{Intro_content.Intro_content_text_center}</h2>
                        <h3>{Intro_content.Intro_content_text_subheading_1}</h3>
                        <ol>
                            <li>{Intro_content.Intro_content_points_1}</li>
                            <li>{Intro_content.Intro_content_points_2}</li>
                            <li>{Intro_content.Intro_content_points_3}</li>
                            <div className="img_container">
                                <p>

                                    <div className=" intro_img intro_img1">1</div>{" "}
                                    {Intro_content.Intro_content_points_p1}
                                </p>
                                <p>

                                    <div className=" intro_img intro_img2">3</div>
                                    {Intro_content.Intro_content_points_p2}
                                </p>
                                <p>

                                    <div className="  intro_img intro_img3">5</div>
                                    {Intro_content.Intro_content_points_p3}
                                </p>
                                <p>

                                    <div className=" intro_img intro_img4">7</div>
                                    {Intro_content.Intro_content_points_p4}
                                </p>
                                <p>

                                    <div className=" intro_img intro_img5">9</div>
                                    {Intro_content.Intro_content_points_p5}
                                </p>
                            </div>
                            <p>{Intro_content.Intro_content_points_p}</p>
                            <h3>{Intro_content.Intro_content_text_subheading_2}</h3>
                            <li>
                                {Intro_content.Intro_content_points_4}

                                <ol>
                                    <li>{Intro_content.Intro_content_points_4_a}</li>
                                    <li>{Intro_content.Intro_content_points_4_b}</li>
                                    <li>{Intro_content.Intro_content_points_4_c}</li>
                                </ol>
                            </li>

                            <li>
                                {Intro_content.Intro_content_points_5}{" "}
                                <span> {Intro_content.span_1}</span>
                                {Intro_content.Intro_content_points_5__}
                            </li>
                            <h3>{Intro_content.Intro_content_text_subheading_3}</h3>
                            <li>
                                {Intro_content.Intro_content_points_6}
                                <ol>
                                    <li>{Intro_content.Intro_content_points_6_a}</li>
                                    <li>{Intro_content.Intro_content_points_6_b}</li>
                                    <li>
                                        {Intro_content.Intro_content_points_6_c}
                                        <span> {Intro_content.span_2}</span>
                                    </li>
                                    <li>
                                        {Intro_content.Intro_content_points_6_d}
                                        <span> {Intro_content.span_3}</span>{" "}
                                        {Intro_content.Intro_content_points_6_d__}
                                    </li>
                                    <li>{Intro_content.Intro_content_points_6_e}</li>
                                </ol>
                            </li>
                            <li>
                                {Intro_content.Intro_content_points_7}
                                <span> {Intro_content.span_4}</span>{" "}
                                {Intro_content.Intro_content_points_7__}
                            </li>
                            <li>{Intro_content.Intro_content_points_8}</li>
                            <h3>{Intro_content.Intro_content_text_subheading_4}</h3>
                            <li>{Intro_content.Intro_content_points_9}</li>
                            <li>{Intro_content.Intro_content_points_10}</li>
                            <li>{Intro_content.Intro_content_points_11}</li>
                            <li>{Intro_content.Intro_content_points_12}</li>
                        </ol>
                    </div>
                );
            })}
            <div className="intro_next_btn_container">
                <Link to='/General_intructions_page' className="intro_next_btn">NEXT <AiOutlineArrowRight /></Link>
            </div>
        </>
    );
};