import LoginCSS from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { callLoginAPI } from '../../apis/UserAPICalls';
import { POST_LOGIN } from '../../modules/UserModule';


// 
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

        if (loginUser.message === 'Login Success') {
            console.log('[Login] Login SUCCESS {}', loginUser);
            navigate('/main', { replace: true });
        } else if (loginUser.status === 500) {
            alert('ID와 비밀번호가 일치하지 않습니다.')
        }
    }, [loginUser, navigate]);

    // 로그인 상태일 시 로그인페이지로 접근 방지
    if (loginUser.length > 0) {
        console.log('[Login] Login is already authenticated by the server');
        return <Navigate to="/main" />;
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSearchPwdHandler = () => {
        navigate('/searchpwd', { replace: true });
    };

    const onKeyPressHandler = (e) => {
        if (e.key === 'Enter') {
            // 엔터 키를 눌렀을 때 로그인 버튼 클릭
            onClickLoginHandler();
        }
    };

    // 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동
    const onClickLoginHandler = () => {
        dispatch(
            callLoginAPI({
                // 로그인
                form: form,
            })
        );
    };

    return (
        <body className={LoginCSS.body}>
            <div className={LoginCSS.login_wrap}>
                <img src={process.env.PUBLIC_URL + '/common/Logo.png'} alt="로고" />
                <input 
                    className={LoginCSS.login} 
                    name='userId'
                    type="text" 
                    placeholder="ID"
                    onChange={ onChangeHandler }
                />
                <input 
                    className={LoginCSS.login}
                    name='userPw'
                    type="password" 
                    placeholder="Password" 
                    onChange={ onChangeHandler }
                    onKeyPress={onKeyPressHandler}
                />
                <button 
                    onClick={ onClickLoginHandler }
                    className={LoginCSS.login_btn}
                >
                    로그인
                </button>
                <div className={LoginCSS.additional_options}>
                    <span className={LoginCSS.find_pw} onClick={ onClickSearchPwdHandler }>비밀번호 찾기</span>
                </div>
            </div>
        </body>
    );
}

export default Login;
