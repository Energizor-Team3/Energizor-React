import React, { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { useDispatch, Provider } from 'react-redux';
import { callAttendancePOSTAPI, callAttendancePUTAPI } from '../../apis/AttendanceAPICalls';
import './attendance.css'
import { redirect } from 'react-router';
import ReactDOM from 'react-dom';
import store from '../../Store';
import axios from 'axios';
import thunk from 'redux-thunk';


// ReactDOM.render(
//     <Provider store={store}>
//     </Provider>,
//     document.getElementById('root')
// );

function AttendanceDetailModal ({ setIsModalOpen, handleClose, userCode }) {
    const dispatch = useDispatch();


    const closeModal = () => {
        setIsModalOpen(false);
    };

    

    const handleCheckIn = async () => {
        try {
            // 출근 API 호출
            await dispatch(callAttendancePOSTAPI({ cCode: userCode, form: { userCode, cState: '출근' } }));
            console.log("출근클릭");
            handleClose(); // handleClose 함수 호출
        } catch (error) {
            console.error('Error while checking in:', error);
        }
    }

    const handleCheckOut = async () => {
        try {
            // 퇴근 API 호출
            await dispatch(callAttendancePUTAPI({ cCode: userCode, form: {userCode, cState: '퇴근' } }));
            console.log("퇴근클릭");
            handleClose(); // handleClose 함수 호출
        } catch (error) {
            console.error('Error while checking out:', error);
        }
    }

    /* today */
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
            <span className="e1243_67">08:53:15</span>
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
    )
}

export default AttendanceDetailModal