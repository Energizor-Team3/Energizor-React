import './UserList.css';
import { callUserListAPI } from '../../apis/UserAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function UserList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userReducer);
    const userListContent = userList?.data?.content;

    useEffect(() => {
        dispatch(callUserListAPI());
    }, []);

    console.log('userList', userList);
    console.log('userListContent', userListContent);

    const onClickUserRegisterHandler = () => {
        console.log('직원 등록 클릭');
        if (window.location.pathname !== '/userregist') {
            navigate('/userregist', { replace: true });
        }
    };

    const onClickUserListHandler = () => {
        console.log('전직원 목록 클릭');
        if (window.location.pathname !== '/userlist') {
            navigate('/userlist', { replace: true });
        }
    };

    return (
        <div id="wrap">
            <section>
                <article>
                    <h2 style={{ marginBottom: 50 }}>인사관리</h2>
                    <ul className="sub_list">
                        <li onClick={onClickUserRegisterHandler}>
                            <div>
                                <img
                                    src="/mypage/regist_user.png"
                                    alt=""
                                />
                                <span>직원 등록</span>
                            </div>
                        </li>
                        <li
                            className="sub_list_text"
                            onClick={onClickUserListHandler}
                        >
                            <div>
                                <img
                                    src="/mypage/user_list.png"
                                    alt=""
                                />
                                <span>전직원 목록</span>
                            </div>
                        </li>
                    </ul>
                </article>
            </section>

            <main style={{ background: 'white' }}>
                <div className="content">
                    <div className="subject">
                        <strong>전직원 목록</strong>
                        <div className="line">
                            <div className="search_box">
                                <input
                                    type="search"
                                    placeholder="사번, 직원명을 입력하세요."
                                />
                            </div>
                        </div>
                    </div>
                    <table className="user_table">
                        <thead>
                            <tr>
                                <th>사번</th>
                                <th>이름</th>
                                <th>팀</th>
                                <th>휴대폰</th>
                                <th>이메일</th>
                                <th>입사일</th>
                                <th>총 연차</th>
                                <th>사용 연차</th>
                                <th>잔여 연차</th>
                                <th>퇴사일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(userListContent) &&
                                userListContent.map((user) => (
                                    <tr
                                        key={user?.userCode}
                                        className="user-row"
                                    >
                                        <td>{user?.userId}</td>
                                        <td>{user?.userName}</td>
                                        <td>{user?.team?.teamName}</td>
                                        <td>{user?.phone}</td>
                                        <td>{user?.email}</td>
                                        <td>{user?.entDate}</td>
                                        <td>{user?.dayoff?.offCount}</td>
                                        <td>{user?.dayoff?.offUsed}</td>
                                        <td>{user?.dayoff?.offCount - user?.dayoff?.offUsed}</td>
                                        <td>{user?.resignDate === '9999-12-30' ? '재직 중' : user?.resignDate}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <select
                        name="page_number_choice"
                        id="page_number_choice"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                    <label
                        className="page_number_choice_text"
                        htmlFor="page_number_choice"
                    >
                        페이지당 항목수
                    </label>
                </div>
            </main>
        </div>
    );
}

export default UserList;
