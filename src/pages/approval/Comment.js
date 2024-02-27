import React, { useState } from 'react';
import './Comment.css'
import { useSelector, useDispatch } from 'react-redux';
import {callInsetCommentAPI} from '../../apis/ApprovalAPICalls'


function Comment( documentCode) {
  const dispatch = useDispatch();
  const [newComment, setNewComment] = useState("");
  
  const handleInputChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmit = () => {
    if (newComment.trim() !== "") {
      

      dispatch(callInsetCommentAPI(documentCode, newComment))
      setNewComment("");
    }
  };

  
  return (
    <div className="comment-section">
    <h2>댓글</h2>
    
    {/* 댓글 목록
    <ul className="comment-list">
      {comments.map((comment, index) => (
        <li key={index} className="comment-item">
          <p className="comment-text">{comment}</p>
        </li>
      ))}
    </ul> */}

    {/* 댓글 입력 폼 */}
    <div className="comment-form">
      <textarea
        className="comment-input"
        placeholder="댓글을 입력하세요..."
        value={newComment}
        onChange={handleInputChange}
      ></textarea>
      <button className="submit-button" onClick={handleSubmit}>댓글 작성</button>
    </div>
  </div>
);
}

export default Comment;
