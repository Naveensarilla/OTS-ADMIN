
import React, { useEffect, useRef, useState } from 'react';
import '../SubjectTest/SubjectTest.css'
import { useNavigate } from 'react-router-dom'
import HomeHeader from '../../Components/HomeHeader/HomeHeader';



const PreviousTest = ({ seconds }) => {

    const [countdown, setCountdown] = useState(seconds);
    const timerId = useRef();

    useEffect(() => {
        if (countdown <= 0) {
            clearInterval(timerId.current);
            alert("End");
        }
    }, [countdown]);
    const navigate = useNavigate();
    const startCountdown = () => {
        timerId.current = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        navigate('/Paper');

    };

    const myComponentStyle1 = {
        color: 'white'
    }
    const myComponentStyle2 = {
        color: 'white'
    }
    return (
        <div className='home-main-page'>
            <div>
                <HomeHeader />
            </div>
            <div className='test-card'>
                <div className='test-card-header'>
                    <div className='test-contents1'><h3 className='jee-test-1'>JEE MAIN 2024 TEST-1</h3><span style={myComponentStyle2} class="material-symbols-outlined">
                        lock_open
                    </span></div>
                    <p className='testCard-second-header'>Available Till: 31 May,2024</p>
                    <p className='free-title'>FREE</p>
                </div>
                <div>
                    <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">help</span><p>90 Questions</p></div>

                    <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">
                        schedule
                    </span><p>180 Minutes</p></div>

                    <div className='test-contents2'><span style={myComponentStyle1} class="material-symbols-outlined">
                        trending_up
                    </span><p>300 Marks</p></div>

                    <div className='test-btn'><button onClick={startCountdown} className='play-btn'><span class="material-symbols-outlined">
                        chevron_right
                    </span>Start Test</button></div>

                </div>
            </div>
        </div>
    )
}

export default PreviousTest