import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import HeaderCSS from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

import {
    callLogoutAPI
} from '../../apis/UserAPICalls'


function Header() {

    //const isLogin = false;
    const navigate = useNavigate();

    // 리덕스를 이용하기 위한 디스패처, 셀렉터 선언
    const dispatch = useDispatch();
    const loginUser = useSelector(state => state.userReducer);  // 저장소에서 가져온 loginUser 정보
    const isLogin = window.localStorage.getItem('accessToken');    // Local Storage 에 token 정보 확인
    const [isHovered, setIsHovered] = useState(false);

    const onClickLogoHandler = () => {
        // 로고 클릭시 메인 페이지로 이동
        navigate("/", { replace: true })
    }

    const handleIconClick = () => {
        // 클릭한 아이콘에 따라 다른 작업 수행
        console.log('Icon Clicked');
      };

/*     const onClickMypageHandler = () => {    

        // 토큰이 만료되었을때 다시 로그인
        const token = decodeJwt(window.localStorage.getItem("accessToken"));
        console.log('[Header] onClickMypageHandler token : ', token);
        
        if (token.exp * 1000 < Date.now()) {
            setLoginModal(true);
            return ;
        }

        navigate("/mypage", { replace: true });
    } */

    const onClickLogoutHandler = () => {
        window.localStorage.removeItem('accessToken');  
        //로그아웃
        dispatch(callLogoutAPI());
        
        alert('로그아웃이 되어 메인화면으로 이동합니다.');
        navigate("/login", { replace: true })
        window.location.reload();
    }

    return (
        <>

        </>
    );
}

export default Header;