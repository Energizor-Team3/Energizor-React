
import LoginCSS from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { callLoginAPI } from '../../apis/UserAPICalls';
import { POST_LOGIN } from '../../modules/UserModule';

function Login() {
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginUser = useSelector((state) => state.userReducer); // API 요청하여 가져온 loginUser 정보

    // 폼 데이터 한번에 변경 및 State에 저장
    const [form, setForm] = useState({
        userId: '',
        userPw: '',
    });

    useEffect(() => {
        if (loginUser.status === 200) {
            console.log('[Login] Login SUCCESS {}', loginUser);
            navigate('/', { replace: true });
        }
    }, [loginUser]);

    // 로그인 상태일 시 로그인페이지로 접근 방지
    if (loginUser.length > 0) {
        console.log('[Login] Login is already authenticated by the server');
        return <Navigate to="/" />;
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickRegisterHandler = () => {
        navigate('/register', { replace: true });
    };

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => {
        dispatch(
            callLoginAPI({
                // 로그인
                form: form,
            })
        );
        navigate("/main", { replace: true })
    };

    return (
        <div className={LoginCSS.login_wrap}>
            <img src={process.env.PUBLIC_URL + '/common/Logo.png'} alt="로고" />
            <input 
                className={LoginCSS.login} 
                name='userId'
                type="text" 
                placeholder="  ID"
                onChange={ onChangeHandler }
            />
            <input 
                className={LoginCSS.login}
                name='userPw'
                type="password" 
                placeholder="  Password" 
                onChange={ onChangeHandler }
            />
            <button 
                onClick={ onClickLoginHandler }
                className={LoginCSS.login_btn}
            >
                로그인
            </button>
            <div className={LoginCSS.additional_options}>
                <input 
                    type="checkbox" 
                    className={LoginCSS.save_id_check} 
                />
                <span className="save_id">ID 저장</span>
                <span className="find_pw">비밀번호 찾기</span>
            </div>
        </div>
    );
}

export default Login;
