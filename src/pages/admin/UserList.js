import './UserList.css';
import moment from 'moment';
import { callUserListAPI } from '../../apis/UserAPICalls';

import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

function UserList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userList = useSelector((state) => state.userReducer);
    const userListContent = userList?.data?.content;

    const pageInfo = userList.pageInfo;

    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [showRetired, setShowRetired] = useState(false);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    const initiateSearch = () => {
        setStart(0); // Reset to the first page or as needed
        setCurrentPage(1); // Reset to the first page if your logic requires
        dispatch(
            callUserListAPI({
                currentPage: 1, // Assuming you want to search from the first page
                searchTerm: searchTerm,
            })
        );
    };

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(
            callUserListAPI({
                currentPage: currentPage,
                searchTerm: searchTerm,
            })
        );
    }, [currentPage, searchTerm]);

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

    const handleUserClick = (userCode) => {
        navigate(`/modifyuser/${userCode}`);
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
                                <div className="retiredEmp">
                                    <input
                                        type="checkbox"
                                        className="retiredCheck"
                                        checked={showRetired}
                                        onChange={(e) => setShowRetired(e.target.checked)}
                                    />
                                    <label> 퇴사자 보기</label>
                                </div>
                                <input
                                    type="search"
                                    placeholder="직원명을 입력하세요."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            console.log('검색!!!!');
                                            initiateSearch();
                                        }
                                    }}
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
                                userListContent
                                    .filter((user) => {
                                        return showRetired
                                            ? moment.utc(user.resignDate).format('YYYY-MM-DD') !==
                                                  '9999-12-31'
                                            : true;
                                    })
                                    .map((user) => (
                                        <tr
                                            key={user?.userCode}
                                            className="user-row"
                                            onClick={() => handleUserClick(user.userCode)}
                                        >
                                            <td>{user?.userId}</td>
                                            <td>{user?.userName}</td>
                                            <td>{user?.team?.teamName}</td>
                                            <td>{user?.phone}</td>
                                            <td>{user?.email}</td>
                                            <td>{moment.utc(user.entDate).format('YYYY-MM-DD')}</td>
                                            <td>{user?.dayoff?.offCount}</td>
                                            <td>{user?.dayoff?.offUsed}</td>
                                            <td>{user?.dayoff?.offCount - user?.dayoff?.offUsed}</td>
                                            <td>
                                                {moment.utc(user.resignDate).format('YYYY-MM-DD') ===
                                                '9999-12-31'
                                                    ? '재직 중'
                                                    : moment(user.resignDate).format('YYYY-MM-DD')}
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>

                    <div className="pagingArea">
                        <div style={{ listStyleType: 'none', display: 'flex' }}>
                            {Array.isArray(userListContent) && (
                                <button
                                    onClick={() => setCurrentPage(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="pagingBtn"
                                >
                                    &lt;
                                </button>
                            )}
                            {pageNumber.map((num) => (
                                <li
                                    key={num}
                                    onClick={() => setCurrentPage(num)}
                                >
                                    <button
                                        style={currentPage === num ? { backgroundColor: '#94A9FF' } : null}
                                        className="pagingBtn"
                                    >
                                        {num}
                                    </button>
                                </li>
                            ))}
                            {Array.isArray(userListContent) && (
                                <button
                                    className="pagingBtn"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                    disabled={currentPage === pageInfo.pageEnd || pageInfo.total === 0}
                                >
                                    &gt;
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UserList;
