import React, { useEffect } from 'react';
import './FilePopup.css'; // 팝업에 대한 스타일
import {callSelectFileAPI} from '../../apis/ApprovalAPICalls'
import { useSelector, useDispatch } from 'react-redux';



const FilePopup = ({ isOpen, handleClose, content }) => {
    const dispatch = useDispatch();
    const image = useSelector((state) => state?.approvalFileReducer || [] ); // 파일
    useEffect(()=>{
      if(content != undefined){

        dispatch(callSelectFileAPI(content))
      }
      },[])


    
    console.log(image,'image1111111111111111')
    console.log(content,'zzzzzzzzzzzzzzzzzzzzzz')
    if (!isOpen) return null;

    
  return (
    <div className="popup-overlay1" onClick={handleClose}>
      <div className="popup-container1" onClick={(e) => e.stopPropagation()}>
        <img src={image.apFileNameChange} alt='파일이 없습니다.'></img>
        <button className="popup-close-btn1" onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
};

export default FilePopup;