import React, { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { useDispatch, Provider, useSelector } from 'react-redux';
import { callAttendancePOSTAPI, callAttendancePUTAPI } from '../../apis/AttendanceAPICalls';
import './attendance.css';
import { redirect } from 'react-router';
import ReactDOM from 'react-dom';
import store from '../../Store';
import axios from 'axios';
import thunk from 'redux-thunk';

function AttendanceDetailModal ({ setIsModalOpen, userCode, commute }) {
    const dispatch = useDispatch();

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCheckIn = async () => {
        try {
            // 출근 API 호출
            await dispatch(callAttendancePOSTAPI({ cCode: userCode, form: { userCode, cState: '출근' } }));
            console.log("출근클릭");
        } catch (error) {
            console.error('Error while checking in:', error);
        }
        window.location.reload();
    };

    const handleCheckOut = async () => {
        try {
            // 퇴근 API 호출
            await dispatch(callAttendancePUTAPI({ cCode: userCode, form: {userCode, cState: '퇴근', cEndTime: toLocaleString} }));
            console.log("퇴근클릭");
        } catch (error) {
            console.error('Error while checking out:', error);
        }
    };

    /* 출근 시간 표시 */
    // 오늘 날짜와 출근 시간을 상태로 관리
    const [todayDate, setTodayDate] = useState(new Date());
    const [startTime, setStartTime] = useState(null);
    
    // 컴포넌트가 마운트될 때 실행되는 useEffect 훅을 사용하여 오늘 날짜와 출근 시간 설정
    useEffect(() => {
        const currentTime = new Date();
        setTodayDate(currentTime);
        setStartTime(currentTime.toLocaleTimeString());
    }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행되도록 설정


    /* 시간 */
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return (() => clearInterval(id))
    }, []);

    /* 날짜 */
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentDate(new Date());
        }, 1000); // 1초마다 현재 시간 업데이트

        return () => clearInterval(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }, []);
    const formatDate = (date) => {
        const options = { year: '2-digit', month: '2-digit', day: '2-digit', weekday: 'short' };
        const formattedDate = date.toLocaleString('ko-KR', options);
        return formattedDate.replace('.', '-');
    };

    return (
        <div className="e233_2863">
            <span className="e233_2864">출퇴근 등록</span>
            <div className="e233_2865" onClick={closeModal}/>
            <span className="e233_2866">출근 시간 :</span>
            <span className="e233_2867">퇴근 시간 :</span>
            <span className="e233_2868">08:53:15</span>
            {/* {startTime && <span className="e233_2868">{startTime}</span>} */}
            <span className="e1243_67">19:30:31</span>
            <span className="e233_2869">{formatDate(currentDate)}</span>
            {/* <span className="e233_2870">03:36:06</span> */}
            <span className="e233_2870">{time.toLocaleTimeString('en-US', {hour12: false})}</span>
            
            <button className="e233_2871">
                <div className="e233_2872" />
                <span className="e233_2873" onClick={handleCheckIn}>출근</span>
                
            </button>
            <button className="e233_2874">
                <div className="e233_2875" />
                <span className="e233_2876" onClick={handleCheckOut}>퇴근</span>
            </button>
        </div>
            );
}

export default AttendanceDetailModal;