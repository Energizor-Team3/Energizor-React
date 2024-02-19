import SearchPwdCSS from './SearchPwd.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

function SearchPwdEmail() {
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    // const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.userReducer); // API 요청하여 가져온 loginUser 정보

    // 폼 데이터 한번에 변경 및 State에 저장
    // const [form, setForm] = useState({
    //     userId: '',
    //     email: '',
    // });

    // useEffect(() => {
    //     if (loginUser.status === 200) {
    //         console.log('[Login] Login SUCCESS {}', loginUser);
    //         navigate('/', { replace: true });
    //     }
    // }, [loginUser]);

    // 로그인 상태일 시 로그인페이지로 접근 방지
    if (loginUser.length > 0) {
        console.log('[Login] Login is already authenticated by the server');
        return <Navigate to="/" />;
    }

    const onClickBackLoginHandler = () => {
        // 현재 경로가 '/login'이 아닐 때만 네비게이션 실행
        if (window.location.pathname !== '/login') {
            navigate('/login', { replace: true });
        }
    };

    return (
        <body className={SearchPwdCSS.body}>
            <div className={SearchPwdCSS.login_wrap}>
                <img
                    src={process.env.PUBLIC_URL + '/common/Logo.png'}
                    alt="로고"
                />
                <span className={SearchPwdCSS.find_pw_title}>비밀번호 찾기</span>
                <span className={SearchPwdCSS.send_email}>인증메일이 발송되었습니다.</span>
                <button
                    type="submit"
                    className={SearchPwdCSS.back_login_btn}
                    onClick={onClickBackLoginHandler}
                >
                    로그인 화면 돌아가기
                </button>
            </div>
        </body>
    );
}

export default SearchPwdEmail;
