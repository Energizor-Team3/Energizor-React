import SearchPwdCSS from './SearchPwd.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { callSearchPwdAPI } from '../../apis/UserAPICalls';

function SearchPwd() {
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();


    // 폼 데이터 한번에 변경 및 State에 저장
    const [form, setForm] = useState({
        userId: '',
        email: '',
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const onClickSearchPwdHandler = async () => {
        try {
            const result = await dispatch(callSearchPwdAPI({ form: form }));

            if (result.data === 'Update') {
                navigate("/searchpwdemail", { replace: true });
            } else {
                alert("인증메일 발송에 실패했습니다. 다시 시도해주세요.");
            }
        } catch (error) {
            console.error('인증메일 발송에 실패했습니다.', error);
            alert("인증메일 발송에 실패했습니다. 다시 시도해주세요.");
        }
    };
    


    return (
        <div className={SearchPwdCSS.body}>
            <div className={SearchPwdCSS.login_wrap}>
                <img src={process.env.PUBLIC_URL + '/common/Logo.png'} alt="로고" />
                <span className={SearchPwdCSS.find_pw_title}>비밀번호 찾기</span>
                <input className={SearchPwdCSS.find_pw} name='userId' type="text" onChange={ onChangeHandler } placeholder="ID" />
                <input className={SearchPwdCSS.find_pw} name='email' type="text" onChange={ onChangeHandler } placeholder="Email" />
                <button type="submit" className={SearchPwdCSS.find_pw_btn} onClick={ onClickSearchPwdHandler }>인증메일 발송</button>
            </div>
        </div>

    );
}

export default SearchPwd;