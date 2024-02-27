import React, { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { useDispatch, Provider } from 'react-redux';
import { callAttendancePOSTAPI, callAttendancePUTAPI } from '../../apis/AttendanceAPICalls';
import './attendanceMain.css'
import { redirect } from 'react-router';
import ReactDOM from 'react-dom';
import store from '../../Store';



// ReactDOM.render(
//     <Provider store={store}>
//     </Provider>,
//     document.getElementById('root')
// );

// reportWebVitals();



function AttendanceDetailModal ({setIsModalOpen, handleClose, userCode}) {
    const dispatch = useDispatch();


    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCheckIn = () => {
    //     dispatch(callAttendancePOSTAPI({ form: { userCode, cState: '출근' } }));
    //     handleClose();
    // }

    // const handleCheckOut = () => {
    //     dispatch(callAttendancePUTAPI({ cCode: userCode, form: { cState: '퇴근' } }));
    //     handleClose();
    // }


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
        return formattedDate.replace('-', '-');
    };




    return (
        <section className="e233_28631">
            <span className="e233_28641">출퇴근 등록</span>
            {/* <div className="e233_2865" /> */}
            <span className="e233_28661">출근 시간 :</span>
            <span className="e233_28671">퇴근 시간 :</span>
            <span className="e233_28681">08:53:15</span>
            <span className="e1243_671">08:53:15</span>
            <span className="e233_28691">{formatDate(currentDate)}</span>
            <span className="e233_28701">{time.toLocaleTimeString('en-US', {hour12: false})}</span>
            <div className="e233_28711">
                <div className="e233_2872" />
                <span className="e233_2873">출근</span>
            </div>
            <div className="e233_28741">
                <div className="e233_2875" />
                <span className="e233_2876">퇴근</span>
            </div>
        </section>
    )
}


export default AttendanceDetailModal