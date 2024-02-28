import MainCSS from './Main.module.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AttendanceDetailModalMain from "./AttendanceDetailModalMain";
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

                        <AttendanceDetailModalMain/>
                        

                    


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
