import MainCSS from './Main.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Main() {
    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    console.log('---------------',window.localStorage.getItem('accessToken'));
    return (
        <>
            <main>
                <div className={MainCSS.main_wrap}>
                    <div className={MainCSS.main_profile}>
                        <div className={MainCSS.user_photo}>
                            <img
                                src={process.env.PUBLIC_URL + '/mypage/user_photo_sample.png'}
                                alt="프로필사진"
                            />
                        </div>
                        <div className={MainCSS.main_profile_info}>
                            <p>김뫄뫄</p>
                            <br />
                            <h4>관리본부/인사팀</h4>
                            <button className={MainCSS.go_mypage}>마이페이지</button>
                        </div>
                    </div>

                    <div className={MainCSS.main_commute}>
                        <h1>근태</h1>
                        {/*     <div className={MainCSS.attendance-container}>
                            <div className={MainCSS.info}>
                                <p id="date-info">오늘 날짜: </p>
                                <p id="time-info">현재 시각: </p>
                                <p id="start-time-info">출근 시각: </p>
                                <p id="end-time-info">퇴근 시각: </p>
                            </div>
                    
                            <div className={MainCSS.button-container}>
                                <button id="in-btn" onclick="recordTime('start')">출근</button>
                                <button id="out-btn" onclick="recordTime('end')">퇴근</button>
                            </div>
                        </div> */}
                    </div>

                    <div className={MainCSS.main_note}>
                        <h1>쪽지</h1>
                    </div>
                </div>

                <div className={MainCSS.main_wrap}>
                    <div className={MainCSS.main_project}>
                        <h1>프로젝트</h1>
                    </div>
                </div>

                <div className={MainCSS.main_wrap}>
                    <div className={MainCSS.main_approval}>
                        <h1>결재</h1>
                    </div>
                    <div className={MainCSS.main_board}>
                        <h1>내 게시판</h1>
                    </div>
                    <div className={MainCSS.main_notice}>
                        <h1>공지사항</h1>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;
