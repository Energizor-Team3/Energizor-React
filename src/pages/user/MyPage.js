import  './MyPage.css';
import { callMyPageAPI } from '../../apis/UserAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

function MyPage() {
    const dispatch = useDispatch();
    const myInfo = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(callMyPageAPI());
    }, []);

    console.log('myInfo', myInfo);

    return (
        <div id="wrap">
            <section>
                <article>
                    <h2 style={{ marginBottom: 50 }}>마이페이지</h2>
                    <ul className="sub_list">
                        <li>
                            <div>
                                <img
                                    src="/mypage/profile.png"
                                    alt=""
                                />
                                <span>내 정보</span>
                            </div>
                        </li>
                        <li className="sub_list_text">
                            <div>
                                <img
                                    src="/mypage/password.png"
                                    alt=""
                                />
                                <span>비밀번호 변경</span>
                            </div>
                        </li>
                    </ul>
                </article>
            </section>

            <main style={{ background: 'white' }}>
                <div className="content">
                    <div className="subject">
                        <strong>내 프로필</strong>
                        <div className="line">
                            <div className="search_box"></div>
                        </div>
                    </div>

                    <div className="sub_content">
                        <div className="info_picture">
                            <div className="info_photo_wrap">
                                <div className="user_photo">
                                    <img
                                        src={myInfo.profilePath}
                                        alt="프로필사진"
                                    />
                                </div>
                                <div className="user_photo_edit">
                                    <button
                                        type="submit"
                                        className="photo_regist"
                                    >
                                        사진 등록
                                    </button>
                                    <button
                                        type="submit"
                                        className="photo_delete"
                                    >
                                        사진 삭제
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="info_section">
                            <div className="user_info">
                                <span className="user_info_label">ID(사번)</span>
                                <strong className="user_info_content">{myInfo?.userId}</strong>
                            </div>
                            <div className="user_info">
                                <span className="user_info_label">이름</span>
                                <strong className="user_info_content">{myInfo?.userName}</strong>
                            </div>
                            <div className="user_info">
                                <span className="user_info_label">팀</span>
                                <strong className="user_info_content">
                                    {myInfo?.team?.dept?.deptName}/{myInfo?.team?.teamName}
                                </strong>
                            </div>
                            <div className="user_info">
                                <span className="user_info_label">직급</span>
                                <strong className="user_info_content">
                                    {myInfo?.userRank}  
                                </strong>
                            </div>
                            <div className="user_info">
                                <span className="user_info_label">이메일</span>
                                <strong className="user_info_content">
                                    {myInfo?.email}
                                </strong>
                            </div>
                            <div className="user_info">
                                <span className="user_info_label">휴대폰</span>
                                <strong className="user_info_content">
                                    {myInfo?.phone}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyPage;
