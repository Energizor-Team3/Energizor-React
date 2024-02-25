import {
    callInboxApprovalHeaderAPI,callApprovalCompleteHeaderAPI
  } from '../../apis/ApprovalAPICalls';
  import { useSelector, useDispatch } from 'react-redux';
  import React,{ useEffect, useState } from 'react';
  import './ApprovalSubHeader.css'
  
  function ApprovalSubHeader(){
  
    
    const dispatch = useDispatch();
    const inboxDocumentHeader  = useSelector((state) => state.approvalHeaderReducer);
    const ap123  = useSelector((state) => state.approvalHeaderSubReducer);
    
  
    
    console.log('inboxDocumentHeader',  inboxDocumentHeader );
    console.log('ap123',  ap123 );
    
    
    
    
    useEffect(()=>{
      dispatch(callInboxApprovalHeaderAPI());
      dispatch(callApprovalCompleteHeaderAPI())
    },[])
  
  
      return(
        <>

        <div className="stats-box">
        <div className="stat-item">
          <div className="stat-label"><a href="./approvalmain">결재 대기</a></div>
          <div className="stat-value"><a href="./approvalmain">{inboxDocumentHeader.length}</a></div>
        </div>
        <div className="stat-item">
          <div className="stat-label"><a href="/approvaling">결재 진행</a></div>
          <div className="stat-value"><a href="/approvaling">{ap123.length}</a></div>
        </div>
        <div className="stat-item">
          <div className="stat-label">내문서함</div>
          <div className="stat-value">50</div>
        </div>
      </div>
          
            
            </>
      )
  }
  
  export default ApprovalSubHeader;
  
  