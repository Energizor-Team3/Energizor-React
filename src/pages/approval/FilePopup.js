import React, { useEffect } from 'react';
import './FilePopup.css'; // 팝업에 대한 스타일
import {callSelectFileAPI} from '../../apis/ApprovalAPICalls'
import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver'; // 추가된 부분



const FilePopup = ({ isOpen, handleClose, content }) => {
    const dispatch = useDispatch();
    const image = useSelector((state) => state?.approvalFileReducer ); // 파일
    useEffect(() => {
      // content가 undefined이거나 내용이 없을 경우 handleClose를 호출하여 팝업을 닫습니다.
      if (!content) {
        handleClose();
      } else {
        // content가 있을 때만 API 호출을 수행합니다.
        dispatch(callSelectFileAPI(content));
      }
    }, [content, dispatch, handleClose]);

    const imageContent = content ? (
      <img className='imgkkk' src={image.apFileNameChange} alt={image.apFileNameOrigin} />
    ) : (
      <p>파일이 없습니다.</p>
    );
    
    console.log(image,'image1111111111111111')
    console.log(content,'zzzzzzzzzzzzzzzzzzzzzz')
    if (!isOpen || !content) return null;

    fetch(image.apFileNameChange)
    .then(response => response.blob())
    .then(blob => {
      // 이제 blob 객체를 사용하여 createObjectURL을 호출할 수 있습니다.
      const url = window.URL.createObjectURL(blob);
      // ... 나머지 로직
    })
    .catch(error => console.error('Error:', error));


    const downloadFile = () => {
      saveAs(image.apFileNameChange, "file"); // 'downloadedImage'는 저장될 파일 이름입니다. 원하는 대로 변경하세요.
    };
    
  return (
    <div className="popup-overlay1" onClick={handleClose}>
      <div className="popup-container1" onClick={(e) => e.stopPropagation()}>
        {imageContent}
        <button className="popup-close-btn1" onClick={handleClose}>닫기</button>
        <button className="popup-close-btn1" onClick={downloadFile} >다운로드</button>
      </div>
    </div>
  );
};

export default FilePopup;