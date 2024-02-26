import './UserRegist.css';
import { callTeamListAPI, callUserRegistAPI } from '../../apis/UserAPICalls';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function UserRegist() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [form, setForm] = useState({
        userName: '',
        userPw: '',
        team: '',
        userRank: '',
        entDate: '',
        email: '',
        phone: '',
    });

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

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickUserRegistHandler = async () => {
        console.log('[UserRegist] onClickUserRegistHandler');

        // teamDTO 값을 정확하게 찾아서 설정
        const selectedTeam = teams.find((team) => team.teamCode.toString() === form.team);

        const requestBody = {
            userName: form.userName,
            userPw: form.userPw,
            team: selectedTeam ? selectedTeam : null, // teamDTO가 없는 경우 null 처리
            userRank: form.userRank,
            entDate: form.entDate,
            email: form.email,
            phone: form.phone,
        };

        try {
            // API 호출
            await dispatch(callUserRegistAPI(requestBody, navigate));
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

            <main style={{ background: 'white' }}>
                <div className="content">
                    <div className="subject">
                        <strong>직원 등록</strong>
                        <div className="line">
                        </div>
                    </div>

                    <div className="regist_user_wrap">
                        <div className="regist_user_section">
                            <div className="regist_user">
                                <label className="regist_user_label">사번(ID)</label>
                                <div className="regist_user_id">자동 부여</div>
                            </div>
                            <span className="id_comment">※ 입사일 + 3자리 숫자</span>
                            <div className="regist_user">
                                <label className="regist_user_label">이름</label>
                                <input
                                    className="regist_user_input"
                                    name="userName"
                                    type="text"
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="regist_user">
                                <label className="regist_user_label">초기 비밀번호</label>
                                <input
                                    className="regist_user_input"
                                    name="userPw"
                                    type="password"
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
                                    <option value="">팀을 선택하세요</option>
                                    {teams.map((team) => (
                                        <option
                                            key={team.teamCode}
                                            value={team.teamCode}
                                        >
                                            {team.teamName}
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
                                    <option value="">직급을 선택하세요</option>
                                    <option value="employee">사원</option>
                                    <option value="manager">대리</option>
                                    <option value="seniorManager">과장</option>
                                    <option value="associateDirector">차장</option>
                                    <option value="generalManager">부장</option>
                                    <option value="director">이사</option>
                                    <option value="president">사장</option>
                                </select>
                            </div>
                            <div className="regist_user">
                                <label className="regist_user_label">입사일</label>
                                <input
                                    className="regist_user_input"
                                    name="entDate"
                                    type="date"
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="regist_user">
                                <label className="regist_user_label">이메일</label>
                                <input
                                    className="regist_user_input"
                                    name="email"
                                    type="text"
                                    onChange={onChangeHandler}
                                />
                            </div>
                            <div className="regist_user">
                                <label className="regist_user_label">휴대폰</label>
                                <input
                                    className="regist_user_input"
                                    name="phone"
                                    type="text"
                                    onChange={onChangeHandler}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="regist_user_btn"
                            onClick={onClickUserRegistHandler}
                        >
                            직원 등록
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default UserRegist;
