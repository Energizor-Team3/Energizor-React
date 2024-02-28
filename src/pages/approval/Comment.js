
import './Comment.css'
import { useSelector, useDispatch } from 'react-redux';
import {callInsetCommentAPI, callSelectCommentAPI} from '../../apis/ApprovalAPICalls'
import React, { useEffect, useState } from 'react';




function Comment( {documentCode}) {
  const dispatch = useDispatch();

  const comments = useSelector((state) => state.approvalComment2Reducer);

  console.log(comments , "comment댓글댓글");

  useEffect(() => {
    dispatch(callSelectCommentAPI(documentCode))
  },[documentCode])




  
  
  
  const [form, setForm] = useState({
    acContent: '',
    documentDTO: '',
    
  })
  
  
    const handleInputChange = (e) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value
      });
    };


 

useEffect(() => {
  setForm(prevForm => ({
    ...prevForm,
    documentDTO: { documentCode: documentCode },
    
  }));
}, [documentCode]);

  const handleSubmit = () => {
    
    const result = window.confirm("댓글 등록을 진행 하시겠습니까?")
    if(result){
      dispatch(callInsetCommentAPI({ 
        acContent: form.acContent, 
        document: form.documentDTO // form.documentDTO는 { documentCode: documentCode } 형태임
      }));
      
      alert('댓글등록 완료 하셨습니다.')
      window.location.reload()
    }else{
      alert('취소하셨습니다.')
    }

      
    
  };
  useEffect(() => {
    
    console.log(form,"변하는값");
    
  }, [form]);
  
  return (
    <div className="comment-section">
    <h2>댓글</h2>
    
    {/* 댓글 목록 */}
    <ul className="comment-list">
    {comments != "조회성공" ? (
    comments.map((comment, index) => (
      <li key={index} className="comment-item">
        <div className="comment-metadata">
          <span className="comment-author">{comment?.user?.userName}</span>
          <span className="comment-department">{comment?.user?.team?.dept?.deptName + '/' +comment?.user?.team?.teamName}</span>
          <span className="comment-time">{comment?.acDate}</span>
        </div>
        <p className="comment-text">{comment?.acContent}</p>
      </li>
    ))
  ) : (
    <li className="comment-item">
      <p className="comment-text">댓글이 없습니다.</p>
    </li>
  )}
    </ul>

    {/* 댓글 입력 폼 */}
    <div className="comment-form">
      <textarea
        className="comment-input"
        placeholder="댓글을 입력하세요..."
        name='acContent'
        value={form.acContent}
        onChange={handleInputChange}
      ></textarea>
      <button className="submit-button" onClick={handleSubmit}>댓글 작성</button>
    </div>
  </div>
);
}

export default Comment;
