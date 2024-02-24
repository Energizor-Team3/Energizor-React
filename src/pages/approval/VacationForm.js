// function VacationForm(){
//     return(
//         <div id="wrap">
//   <section>
//     <article>
//       <h2>전자결재</h2>
//       <div>
//         <a href="/views/approval/newApproval.html">
//           <button className="btn">신규기안</button>
//         </a>
//       </div>
//       <ul className="sub_list">
//         <li>
//           <div>
//             <img src="/common/Approval.png" alt="" /> 
//             <span>
//               <a href="/views/approval/approvalMain.html">결재할 문서</a>
//             </span>
//           </div>
//         </li>
//         <li className="sub_list_text">
//           <div>
//             <img src="/common/Approval.png" alt="" />
//             <span>
//               <a href="/views/approval/approvaling.html">진행중인 문서</a>
//             </span>
//           </div>
//         </li>
//         <li>
//           <div>
//             <img src="/common/Mydocumentbox.png" alt="" />
//             <span>
//               <a href="/views/approval/mydocument.html">내 문서함</a>
//             </span>
//           </div>
//         </li>
//         <li>
//           <div>
//             <img src="/common/Temporarystoragebox.png" alt="" />
//             <span>
//               <a href="/views/approval/temporarystorage.html">임시보관함</a>
//             </span>
//           </div>
//         </li>
//         <li>
//           <div>
//             <img src="/common/Shareddocumentbox.png" alt="" />
//             <span>
//               <a href="/views/approval/sharedinbox.html">공유받은 문서함</a>
//             </span>
//           </div>
//         </li>
//       </ul>
//     </article>
//   </section>
//   <main>
//     <div className="content">
//       <div className="subject">
//       <strong>신규 기안</strong>
//           <div className="line">
//             <div className="search_box">
//               <span>
//                 <button onClick={toggleContent}>결재지정</button>
//               </span>
//               <span>
//                 <button onClick={onClickcallSaveGeneralDraftAPI}>임시저장</button>
//               </span>
//               <input
//         type="file"
//         ref={imageInput}
//         onChange={onFileChange}
//         style={{ display: 'none' }} // 시각적으로 숨김 처리
//       />
//               <span>
//                 <button onClick={ onClickImageUpload }>첨부파일</button>
//               </span>
//           </div>
//         </div>
//       </div>
//       <div className="select_line">
//       </div>
//       <div className='side'>
//       <div className="wrap2">
//       <div className="approval">
//           <span className="texttitle">기 안</span>
//           <ul className="approvalul">
//               <input type='text' className="one" value={userDetail?.team?.dept?.deptName + "/" + userDetail?.team?.teamName}/>
//               <li className="two">
//                 <img src="" alt="" />
//               </li>
//               <input type="text" className="three" value={userDetail?.userName}/>
//               <input className="four" value={currentTimeString}/>
//             </ul>
//             <span className="texttitle">결 재</span>
//               {approvalLine.map((approval, index) => (
//                 <ul className="approvalul" key={index}>
//                   <input className="one" value={approval.team?.dept?.deptName + '/' + approval.team?.teamName} readOnly />
//                   <input className="two"  onClick={() => deleteline(approval?.userCode)} placeholder='결재자 제거'/>
//                     <input className="three" value={approval.userName} readOnly />
//                     <input className="four" readOnly />
//                 </ul>
//               ))}
//               </div>
//               <div className='approval'>
//                 <span className="texttitle">참 조</span>
//                 {referenceLine.map((reference, index) => (
//                 <ul className='approvalul' key={index}>                
//                   <input className='one' value={reference.team?.dept?.deptName + '/' + reference.team?.teamName} readOnly />
//                   <input className='two'  onClick={() => deleteline2(reference?.userCode)} placeholder='참조자 제거'/>
//                   <input className='three' value={reference.userName} readOnly />
//                   <input className='four' readOnly />                    
//                 </ul>
//                   ))}
//               </div>
//         <table>
//           <thead>
//             <tr>
//               <th className="title">
//                 <h1>휴가신청서</h1>
//               </th>
//               <th className="title" />
//             </tr>
//           </thead>
//           <tbody className="tbtb">
//             <tr>
//               <td className="text">제목</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="제목을 입력하세요"
//                   className="inputtext"
//                   name='offApplyTitle'
//                   value={form.offApplyTitle}
//                   onChange={onChangeHandler}
//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">부서</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="에브리웨어"
//                   className="inputtext"
//                   value={userDetail?.team?.dept?.deptName + '/' + userDetail?.team?.teamName}

//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">직위/직책</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="직위/ 직책 자동으로 입력됩니다."
//                   className="inputtext"
//                   value={userDetail?.userRank}

//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">기안자명</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="기안자명 자동으로 입력됩니다."
//                   className="inputtext"
//                   value={userDetail?.userName}

//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">기안일</td>
//               <td className="inputsize">
//                 <input
//                   type="text"
//                   placeholder="조직원이 기안하는 날짜가 자동으로 입력됩니다."
//                   className="inputtext"
//                   value={currentTimeString}

//                 />
//               </td>
//             </tr>
//             <tr>
//               <td className="text">남은연차</td>
//               <td className="inputsize">
//                 <input type="text" className="inputtext1" value={(userDetail?.dayOff?.offCount) - (userDetail?.dayOff?.offUsed)}/>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <table className="selectdetail">
//           <thead>
//             <tr>
//               <th colspan="2">휴가 기간</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td colspan="2">
//                 <input type="date" 
//                 id="start-date" 
//                 className="inputbox1"  
//                 name='offStart'
//                   value={form.offStart}
//                   onChange={onChangeHandler}/>
//                 <label htmlFor="">~</label>
//                 <input type="date" id="end-date" className="inputbox1" 
//                 name='offEnd'
//                 value={form.offEnd}
//                 onChange={onChangeHandler}/>
//               </td>
//             </tr>
//           </tbody>
//           <thead>
//             <tr>
//               <th>휴가 일수</th>
//               <th>휴가 사유</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="hihi">
//                 <input
//                   type="text"
//                   className="inputbox"
//                   placeholder="휴가 일수를 입력하세요"
//                   value={(getDaysDifference(form.offStart,form.offEnd) + 1)}
//                 />
//               </td>
//               <td className="hihi">
//                 <input
//                   type="text"
//                   className="inputbox"
//                   placeholder="휴가 사유를 입력하세요"
//                   name='offReason'
//                 value={form.offReason}
//                 onChange={onChangeHandler}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>
//         <div className="btn1">
//           <button className="btn" onClick={onClickInsertDocumentHandler}>기안</button>
//         </div>
//       </div>
//       <div className='og' id='og' >
//         <ApprovalGroup onUserSelect={handleUserSelect} />
//         </div>
//       </div>
//     </div>
//   </main>
// </div>
//     )
// }
// export default VacationForm;