import './MyPage.css';
import { callMyPageAPI, callUpdateProfileAPI, callDeleteProfileAPI } from '../../apis/UserAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

function MyPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const myInfo = useSelector((state) => state.userReducer);
    const profileImageInput = useRef(null);
    const [profileImagePath, setProfileImagePath] = useState(myInfo.profilePath);

    useEffect(() => {
        dispatch(callMyPageAPI());
    }, []);

    useEffect(() => {
        const newPath = `${myInfo.profilePath}?${new Date().getTime()}`;
        setProfileImagePath(newPath);
    }, [myInfo.profilePath]);

    console.log('myInfo', myInfo);

    const onClickMyInfoHandler = () => {
        console.log('내 정보 클릭');
        if (window.location.pathname !== '/my-page') {
            navigate('/my-page', { replace: true });
        }
    };

    const onClickChangePWHandler = () => {
        console.log('비밀번호 변경 클릭');
        if (window.location.pathname !== '/changepwd') {
            navigate('/changepwd', { replace: true });
        }
    };

    // 이미지 파일을 formData로 넘기는 핸들러
    const handleProfileImageChange = (e) => {
        const file = e.target.files[0]; // 선택된 파일 가져오기
        if (!file) {
            console.error('선택된 파일이 없습니다.');
            return;
        }

        const formData = new FormData();
        formData.append('profilePath', file); 

        dispatch(
            callUpdateProfileAPI({
                form: formData,
            })
        )
            .then((response) => {
                if (response && response.newImagePath) {
                    console.log('Profile image updated:', response.newImagePath);
                } else {
                    console.error('No image path in response');
                }
            })
            .catch((error) => {
                console.error('Profile update failed:', error);
            });
    };

    const handleProfileImageDelete = () => {
        dispatch(callDeleteProfileAPI())
            .catch((error) => {
                console.error('Profile deletion failed:', error);
            });
    };

    return (
        <div id="wrap">
            <section>
                <article>
                    <h2 style={{ marginBottom: 50 }}>마이페이지</h2>
                    <ul className="sub_list">
                        <li onClick={onClickMyInfoHandler}>
                            <div>
                                <img
                                    src="/mypage/profile.png"
                                    alt=""
                                />
                                <span>내 정보</span>
                            </div>
                        </li>
                        <li
                            className="sub_list_text"
                            onClick={onClickChangePWHandler}
                        >
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
                        <div className="line"></div>
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
                                    <input
                                        type="file"
                                        ref={profileImageInput}
                                        name="profilePath"
                                        accept="image/jpg,image/png,image/jpeg,image/gif"
                                        onChange={handleProfileImageChange}
                                        style={{ display: 'none' }}
                                    />
                                    <button
                                        onClick={() => profileImageInput.current.click()}
                                        className="photo_regist"
                                    >
                                        사진 변경
                                    </button>
                                    <button
                                        type="button"
                                        className="photo_delete"
                                        onClick={handleProfileImageDelete}
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
                                <strong className="user_info_content">{myInfo?.userRank}</strong>
                            </div>
                            <div className="user_info">
                                <span className="user_info_label">이메일</span>
                                <strong className="user_info_content">{myInfo?.email}</strong>
                            </div>
                            <div className="user_info">
                                <span className="user_info_label">휴대폰</span>
                                <strong className="user_info_content">{myInfo?.phone}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MyPage;
