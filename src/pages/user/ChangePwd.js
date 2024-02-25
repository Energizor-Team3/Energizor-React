import './ChangePwd.css';
import { callPasswordUpdateAPI } from '../../apis/UserAPICalls';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';

function ChangePwd() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = decodeJwt(window.localStorage.getItem("accessToken"));   

    console.log('token 정보', token);

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

    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickChangePwdHandler = () => {

        console.log('[ChangePwd] onClickChangePwdHandler');

        const formData = new FormData();
        formData.append("currentPassword", form.currentPassword);
        formData.append("newPassword", form.newPassword);
        formData.append("confirmPassword", form.confirmPassword);

        dispatch(callPasswordUpdateAPI({
            form: formData
        }));         

        // navigate('/login', { replace: true});
        // window.location.reload();
    }

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

            <main
                className="mainArea"
                style={{ background: 'white' }}
            >
                <div className="content">
                    <div className="subject">
                        <strong>비밀번호 변경</strong>
                        <div className="line">
                            <div className="search_box">
                            </div>
                        </div>
                    </div>

                    <div className="pw_change_wrap">
                        <form
                            className="pw_change_section"
                        >
                            <div className="pw_change">
                                <label className="pw_change_label">현재 비밀번호</label>
                                <input
                                    className="pw_change_input"
                                    type="password"
                                    name='currentPassword'
                                    value={form.currentPassword}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="pw_change">
                                <label className="pw_change_label">변경할 비밀번호</label>
                                <input
                                    className="pw_change_input"
                                    type="password"
                                    name='newPassword'
                                    value={form.newPassword}
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="pw_change">
                                <label className="pw_change_label">비밀번호 재확인</label>
                                <input
                                    className="pw_change_input"
                                    type="password"
                                    name='confirmPassword'
                                    value={form.confirmPassword}
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </form>
                        <button
                            type="submit"
                            className="pw_change_btn"
                            onClick={onClickChangePwdHandler}
                        >
                            비밀번호 변경
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );

}

export default ChangePwd;