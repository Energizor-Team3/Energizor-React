import {
    callInboxApprovalHeaderAPI,callApprovalCompleteHeaderAPI,
    callTotalDocumentAPI,
    callRejection2API,
    callApprovalCompleteAPI
  } from '../../apis/ApprovalAPICalls';
  import { useSelector, useDispatch } from 'react-redux';
  import React,{ useEffect, useState } from 'react';
  import './ApprovalSubHeader.css'
  
  function ApprovalSubHeader(){
  
    
    const dispatch = useDispatch();
    const inboxDocumentHeader = useSelector((state) => state.approvalHeaderReducer || []);
    const ap123 = useSelector((state) => state.approvalHeaderSubReducer || []);
    const total = useSelector((state) => state.approvalLineReducer || []);
    const rejection = useSelector((state) => state.approvalSubReducer?.data?.content || []);
    const complete = useSelector((state) => state.approvalReducer?.data?.content || []);
    

    
  
    
    console.log('rejection',  rejection );
    console.log('total',  total );
    console.log('complete',  complete );
    console.log('inboxDocumentHeader',  inboxDocumentHeader );
    console.log('ap123',  ap123 );
    
    const num = 
            total +
            (Array.isArray(rejection) ? rejection.length : 0) +
            (Array.isArray(complete) ? complete.length : 0);
    
    console.log(num, '갯수')
    
    useEffect(()=>{
      dispatch(callInboxApprovalHeaderAPI());
      dispatch(callApprovalCompleteHeaderAPI())
      dispatch(callTotalDocumentAPI())
      dispatch(callRejection2API())
      dispatch(callApprovalCompleteAPI())
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
          <div className="stat-label"><a href="/inbox">내문서함</a></div>
          <div className="stat-value"><a href="/inbox">{num}</a></div>
        </div>
      </div>
          
            
            </>
      )
  }
  
  export default ApprovalSubHeader;
  
  