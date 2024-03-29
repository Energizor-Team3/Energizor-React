import './ModifyUser.css';
import moment from 'moment';
import { callModifyUserAPI, callTeamListAPI, callUserDetailAPI } from '../../apis/UserAPICalls';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function ModifyUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userDetail = useSelector((state) => state.userReducer);
    const { userCode } = useParams();
    console.log('[ModifyUser] userCode1 : ', userCode);
    const [modifyMode, setModifyMode] = useState(true);

    useEffect(() => {
        console.log('[ModifyUser] userCode2 : ', userCode);
        dispatch(
            callUserDetailAPI({
                userCode: userCode,
            })
        );
    }, [userCode]);

    console.log('userDetail', userDetail);

    const [form, setForm] = useState({
        userName: '',
        team: '',
        userRank: '',
        entDate: '',
        email: '',
        phone: '',
        offUsed: '',
        resignDate: '',
        adminRole: '',
    });

    useEffect(() => {
        const hasAdminRole = userDetail.authorities?.some((role) => role.authority === 'ROLE_ADMIN');
        setIsAdmin(hasAdminRole);

        if (userDetail && Object.keys(userDetail).length > 0) {
            setForm((prevForm) => ({
                ...prevForm,
                userName: userDetail.userName || '',
                team: userDetail.team ? userDetail.team.teamCode : '',
                userRank: userDetail.userRank || '',
                entDate: userDetail.entDate || '',
                email: userDetail.email || '',
                phone: userDetail.phone || '',
                offUsed: userDetail.dayoff ? userDetail.dayoff.offUsed : '',
                resignDate: userDetail.resignDate || '',
                adminRole: hasAdminRole,
            }));
        }
    }, [userDetail]);

    // Team 정보 상태
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const teams = await callTeamListAPI();
                setTeams(teams); // 상태 업데이트
            } catch (error) {
                console.error('팀 목록을 불러오는 중 오류 발생:', error);
            }
        };

        fetchTeams();
    }, []);

    // 관리자 권한 설정
    const [isAdmin, setIsAdmin] = useState();

    const handleAdminChange = (e) => {
        const isChecked = e.target.checked;
        setIsAdmin(isChecked);
        setForm((prevForm) => ({
            ...prevForm,
            isAdmin: isChecked,
        }));
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const onClickModifyUserHandler = async () => {
        console.log('[ModifyUser] onClickModifyUserHandler', modifyMode);
        setModifyMode(true);

        // teamDTO 값을 정확하게 찾아서 설정
        const selectedTeam = teams.find((team) => team.teamCode.toString() === form.team);

        const requestBody = {
            userId: userDetail.userId,
            userName: form.userName,
            team: selectedTeam ? selectedTeam : null, // teamDTO가 없는 경우 null 처리
            userRank: form.userRank,
            // entDate: moment.utc(form.entDate).format('YYYY-MM-DD'),
            entDate: form.entDate,
            email: form.email,
            phone: form.phone,
            offUsed: form.offUsed,
            // resignDate: moment.utc(form.resignDate).format('YYYY-MM-DD'),
            resignDate: form.resignDate,
            adminRole: form.isAdmin,
        };

        try {
            // API 호출
            await dispatch(callModifyUserAPI(userCode, requestBody, navigate));
        } catch (error) {
            // 에러 처리
            alert(error.message);
        }
    };

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

            <main
                className="mainArea"
                style={{ background: 'white' }}
            >
                <div className="content">
                    <div className="subject">
                        <strong>직원 정보 수정</strong>
                        <div className="line"></div>
                    </div>

                    <div className="modify_user_wrap">
                        <div className="regist_user_wrap">
                            <form className="regist_user_section">
                                <div className="modify_title">기본 정보</div>
                                <div className="regist_user">
                                    <label className="regist_user_label">사번(ID)</label>
                                    <div className="regist_user_id">{userDetail.userId}</div>
                                </div>
                                <div className="regist_user">
                                    <label className="regist_user_label">이름</label>
                                    <input
                                        name="userName"
                                        value={form.userName}
                                        className="regist_user_input"
                                        type="text"
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="regist_user">
                                    <label className="regist_user_label">팀</label>
                                    <select
                                        className="regist_user_input"
                                        name="team"
                                        value={form.team}
                                        onChange={onChangeHandler}
                                    >
                                        {teams.map((team) => (
                                            <option
                                                key={team?.teamCode}
                                                value={team?.teamCode}
                                            >
                                                {team?.teamName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="regist_user">
                                    <label className="regist_user_label">직급</label>
                                    <select
                                        className="regist_user_input"
                                        name="userRank"
                                        value={form.userRank}
                                        onChange={onChangeHandler}
                                    >
                                        <option value="사원">사원</option>
                                        <option value="대리">대리</option>
                                        <option value="과장">과장</option>
                                        <option value="차장">차장</option>
                                        <option value="부장">부장</option>
                                        <option value="이사">이사</option>
                                        <option value="사장">사장</option>
                                    </select>
                                </div>
                                <div className="regist_user">
                                    <label className="regist_user_label">입사일</label>
                                    <input
                                        className="regist_user_input"
                                        name="entDate"
                                        value={form.entDate}
                                        type="date"
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="regist_user">
                                    <label className="regist_user_label">이메일</label>
                                    <input
                                        className="regist_user_input"
                                        name="email"
                                        value={form.email}
                                        type="text"
                                        onChange={onChangeHandler}
                                    />
                                </div>
                                <div className="regist_user">
                                    <label className="regist_user_label">휴대폰</label>
                                    <input
                                        className="regist_user_input"
                                        name="phone"
                                        value={form.phone}
                                        type="text"
                                        onChange={onChangeHandler}
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modify_sub_wrap">
                            <div className="regist_user_wrap">
                                <form
                                    action="/"
                                    className="regist_user_section_leave"
                                    method="get"
                                >
                                    <div className="modify_title">연차 관리</div>
                                    <div className="regist_user">
                                        <label className="regist_user_label">총 연차</label>
                                        <div className="regist_user_id">{userDetail.dayoff?.offCount}</div>
                                    </div>
                                    <div className="regist_user">
                                        <label className="regist_user_label">사용 연차</label>
                                        <input
                                            className="regist_user_input"
                                            name="offUsed"
                                            value={form.offUsed}
                                            type="number"
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                    <div className="regist_user">
                                        <label className="regist_user_label">잔여 연차</label>
                                        <div className="regist_user_id">
                                            {userDetail.dayoff?.offCount - form.offUsed}
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="regist_user_wrap">
                                <form
                                    action="/"
                                    className="regist_user_section_resign"
                                    method="get"
                                >
                                    <div className="modify_title">퇴사 정보</div>
                                    <div className="regist_user">
                                        <label className="regist_user_label">퇴사일</label>
                                        <input
                                            className="regist_user_input"
                                            name="resignDate"
                                            value={form.resignDate}
                                            type="date"
                                            onChange={onChangeHandler}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="regist_user_wrap">
                                <form className="regist_user_section_admin">
                                    <div className="modify_title">관리자 권한 부여</div>
                                    <div className="regist_user">
                                        <label className="auth_admin">관리자 권한</label>
                                        <label className="switch">
                                            <input
                                                name="adminRole"
                                                value={form.isAdmin}
                                                type="checkbox"
                                                checked={isAdmin}
                                                onChange={handleAdminChange}
                                            />
                                            <span className="slider" />
                                        </label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="regist_user_btn"
                        onClick={onClickModifyUserHandler}
                    >
                        직원 정보 수정
                    </button>
                </div>
            </main>
        </div>
    );
}

export default ModifyUser;
