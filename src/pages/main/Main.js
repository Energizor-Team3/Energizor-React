
import MainCSS from './Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callLogoutAPI, callMyPageAPI } from '../../apis/UserAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import MainPageCalendar from './MainPageCalendar';
import ApprovalSubHeader from '../approval/ApprovalSubHeader'
import MainNoticeCard from '../../components/main-cards/MainNoticeCard';
import AttendanceDetailModalMain from "./AttendanceDetailModalMain";

function Main() {
    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    console.log('---------------', window.localStorage.getItem('accessToken'));
    const token = decodeJwt(window.localStorage.getItem('accessToken'));
    const myInfo = useSelector((state) => state.userReducer);
    const [profileImagePath, setProfileImagePath] = useState(myInfo.profilePath);

    console.log('token 정보', token);
    console.log('myInfo', myInfo);

    useEffect(() => {
        dispatch(callMyPageAPI());
    }, []);

    useEffect(() => {
        const newPath = `${myInfo.profilePath}?${new Date().getTime()}`;
        setProfileImagePath(newPath);
    }, [myInfo.profilePath]);

    const navigate = useNavigate();

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');
        //로그아웃
        dispatch(callLogoutAPI());

        alert('로그아웃되어 로그인 화면으로 이동합니다.');
        navigate('/login', { replace: true });
        window.location.reload();
    };

    const onClickMyPageHandler = () => {
        console.log('마이페이지 클릭');
        if (window.location.pathname !== '/my-page') {
            navigate('/my-page', { replace: true });
        }
    };


    return (
        < >
            <main className={MainCSS.main} >
                <div className={MainCSS.main_wrap}>
                    <div className={MainCSS.main_profile}>
                        <div className={MainCSS.user_photo}>
                            <img
                                src={myInfo.profilePath}
                                alt="프로필사진"
                            />
                        </div>
                        <div className={MainCSS.main_profile_info}>
                            <p>{myInfo.userName}</p>
                            <br />
                            <h4>
                                {myInfo.team?.dept?.deptName}/{myInfo.team?.teamName}
                            </h4>
                            <button
                                className={MainCSS.go_mypage}
                                onClick={onClickMyPageHandler}
                            >
                                마이페이지
                            </button>
                            <button
                                className={MainCSS.go_mypage}
                                onClick={onClickLogoutHandler}
                            >
                                로그아웃
                            </button>
                        </div>
                    </div>

                    <div className={MainCSS.main_commute}>
                        <h1>근태</h1>

                        <AttendanceDetailModalMain/>

                    </div>

                    {/* <div className={MainCSS.main_note}>
                        <h1>쪽지</h1>
                    </div> */}
                </div>

                <div className={MainCSS.main_wrap}>
                    <div className={MainCSS.main_project}>
                        
                         <MainPageCalendar />

                    </div>
                </div>

                <div className={MainCSS.main_wrap}>
                    <div className={MainCSS.main_approval}>
                        <h1>결재</h1>
                        <ApprovalSubHeader/>
                    </div>
                    <div className={MainCSS.main_notice}>
                        <h1>공지사항</h1>
                        <MainNoticeCard/>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;