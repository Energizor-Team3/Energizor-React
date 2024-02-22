import React, { useEffect, useRef, useState } from 'react';



function EducationForm(){

    return(
        <div className="wrap2">
        <div className="approval">
          <span className="texttitle">기 안</span>
          <ul className="approvalul">
              <input type='text' className="one" />
              <li className="two">
                <img src="" alt="" />
              </li>
              <input type="text" className="three" />
              <input className="four" />
            </ul>
            {/* <span className="texttitle">결 재</span>
              {approvalLine.map((approval, index) => (
                <ul className="approvalul" key={index}>
                  <input className="one" value={approval.team?.dept?.deptName + '/' + approval.team?.teamName} readOnly />
                  <input className="two"  onClick={() => deleteline(approval?.userCode)} placeholder='결재자 제거'/>
                    <input className="three" value={approval.userName} readOnly />
                    <input className="four" readOnly />
                </ul>
              ))}
              </div>
              <div className='approval'>
                <span className="texttitle">참 조</span>
                {referenceLine.map((reference, index) => (
                <ul className='approvalul' key={index}>                
                  <input className='one' value={reference.team?.dept?.deptName + '/' + reference.team?.teamName} readOnly />
                  <input className='two'  onClick={() => deleteline2(reference?.userCode)} placeholder='참조자 제거'/>
                  <input className='three' value={reference.userName} readOnly />
                  <input className='four' readOnly />                    
                </ul>
                  ))} */}
              </div>
        <table>
          <thead>
            <tr>
              <th className="title">
                <h1>교육신청서</h1>
              </th>
              <th className="title" />
            </tr>
          </thead>
          <tbody className="tbtb">
            <tr>
              <td className="text">제목</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  className="inputtext"
                  name='eduTitle'
                 
                  
                />
              </td>
            </tr>
            <tr>
              <td className="text">부서</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="에브리웨어"
                  className="inputtext"
                 
                />
              </td>
            </tr>
            <tr>
              <td className="text">직위/직책</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="직위/ 직책 자동으로 입력됩니다."
                  className="inputtext"
                  

                />
              </td>
            </tr>
            <tr>
              <td className="text">기안자명</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="기안자명 자동으로 입력됩니다."
                  className="inputtext"
                  
                />
              </td>
            </tr>
            <tr>
              <td className="text">기안일</td>
              <td className="inputsize">
                <input
                  type="text"
                  placeholder="조직원이 기안하는 날짜가 자동으로 입력됩니다."
                  className="inputtext"
                  
                />
              </td>
            </tr>
            <tr>
              <td className="text">교육 일수 </td>
              <td className="inputsize">
                <input type="text" className="inputtext1"  />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="selectdetail">
          <thead>
            <tr>
              <th>교육명</th>
              <th>교육 기간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  className="inputbox"
                  placeholder="교육명을 입력하세요"
                  name="eduName"
                 
                  
                />
              </td>
              <td>
                <input type="date" id="start-date" className="inputbox44"   name="eduStart"  />
                <label htmlFor="">~</label>
                <input type="date" id="end-date" className="inputbox44"  name="eduFinish"  />
              </td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>교육기관</th>
              <th>교육비</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="hihi2">
                <input
                  type="text"
                  className="inputbox"
                  placeholder="교육기관을 입력하세요"
                  name="eduInstitution"
                  
                  
                />
              </td>
              <td className="hihi2">
                <input
                  type="text"
                  className="inputbox"
                  placeholder="교육비를 입력하세요"
                  name="eduPrice"
                  
                  
                />
              </td>
            </tr>
          </tbody>
          <thead className="contenttitle">
            <tr>
              <th colSpan={2} className="contenttitle">
                목적 및 내용
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={2} className="hihi">
                <textarea
                  
                  id=""
                  cols={30}
                  rows={10}
                  placeholder="교육 목적 및 내용을 입력하세요"
                  className="inputbox2"
                  name="eduContent"
                  
                  
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}
export default EducationForm;