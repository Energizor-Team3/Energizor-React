import {
    callInboxApprovalHeaderAPI,callTotalDocumentAPI,callTotalDocumentProceedingAPI
  } from '../../apis/ApprovalAPICalls';
  import { useSelector, useDispatch } from 'react-redux';
  import React,{ useEffect, useState } from 'react';
  import './ApprovalSubHeader.css'
  
  function ApprovalSubHeader(){
  
    
    const dispatch = useDispatch();
    const inboxDocumentHeader  = useSelector((state) => state.approvalHeaderReducer);
    const totaldocumentproceeding  = useSelector((state) => state.approvalHeaderSubReducer);

  
    const totalInbox  = useSelector((state) => state.approvalLineReducer);
    
  
    
    console.log('inboxDocumentHeader',  inboxDocumentHeader );
    console.log('totaldocumentproceeding',  totaldocumentproceeding );
    console.log('totalInbox',  totalInbox );
    
    
    
    
    useEffect(()=>{
      dispatch(callInboxApprovalHeaderAPI());
      
      dispatch(callTotalDocumentAPI())
      dispatch(callTotalDocumentProceedingAPI())
    },[])
  
    
    
      return(
        <>

        <div className="stats-box">
        <div className="stat-item">
          <div className="stat-label"><a href="./approvalmain">결재 대기</a></div>
          <div className="stat-value"><a href="./approvalmain">{inboxDocumentHeader?.length}</a></div>
        </div>
        <div className="stat-item">
          <div className="stat-label"><a href="/approvaling">결재 진행</a></div>
          <div className="stat-value"><a href="/approvaling">{totaldocumentproceeding}</a></div>
        </div>
        <div className="stat-item">
          <div className="stat-label"><a href="/approvaling">내문서함</a></div>
          <div className="stat-value"><a href="/approvaling">{totalInbox}</a></div>
        </div>
      </div>
          
            
            </>
      )
  }
  
  export default ApprovalSubHeader;
  
  