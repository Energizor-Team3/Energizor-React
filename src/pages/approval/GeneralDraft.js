import GeneralDraftCss from './GeneralDraft.css';
import NewApprovalingCss from './NewApprovaling.css';

// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState, useRef } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// import { call } from '../../apis/ApprovalAPICalls';


function GeneralDraft(){

    return(<div id="wrap">
    <header>
      <h1>
        <img src="/resources/images/Logo.png" alt="" />
      </h1>
      <nav>
        <div id="main_list_icon">
          <div>
            <a href="#">
              <img src="/resources/images/Home.png" alt="" />
            </a>
            <span>홈</span>
          </div>
          <div>
            <a href="/views/approval/approvalMain.html">
              <img src="/resources/images/Approval.png" alt="" />
            </a>
            <span>전자결재</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/Attendance.png" alt="" />
            </a>
            <span>근태관리</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/calendar.png" alt="" />
            </a>
            <span>일정관리</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/Address.png" alt="" />
            </a>
            <span>주소록</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/Organization.png" alt="" />
            </a>
            <span>조직도</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/Mail.png" alt="" />
            </a>
            <span>쪽지</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/Messanger.png" alt="" />
            </a>
            <span>메신저</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/reservation.png" alt="" />
            </a>
            <span>자원예약</span>
          </div>
          <div>
            <a href="#">
              <img src="/resources/images/board.png" alt="" />
            </a>
            <span>게시판</span>
          </div>
        </div>
      </nav>
    </header>
    <section>
      <article>
        <h2>전자결재</h2>
        <div>
          <a href="/views/approval/newApproval.html">
            <button className="btn">신규기안</button>
          </a>
        </div>
        <ul className="sub_list">
          <li>
            <div>
              <img src="/resources/images/Approval.png" alt="" />
              <span>
                <a href="/views/approval/approvalMain.html">결재할 문서</a>
              </span>
            </div>
          </li>
          <li className="sub_list_text">
            <div>
              <img src="/resources/images/Approval.png" alt="" />
              <span>
                <a href="/views/approval/approvaling.html">진행중인 문서</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/resources/images/Mydocumentbox.png" alt="" />
              <span>
                <a href="/views/approval/mydocument.html">내 문서함</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/resources//images/Temporarystoragebox.png" alt="" />
              <span>
                <a href="/views/approval/temporarystorage.html">임시보관함</a>
              </span>
            </div>
          </li>
          <li>
            <div>
              <img src="/resources/images/Shareddocumentbox.png" alt="" />
              <span>
                <a href="/views/approval/sharedinbox.html">공유받은 문서함</a>
              </span>
            </div>
          </li>
        </ul>
      </article>
    </section>
    <main>
      <div className="content">
        <div className="subject">
          <strong>신규 기안</strong>
          <div className="line">
            <div className="search_box">
              <span>
                <button>결재</button>
              </span>
              <span>
                <button>참조</button>
              </span>
              <span>
                <button>임시저장</button>
              </span>
              <span>
                <button>첨부파일</button>
              </span>
            </div>
          </div>
        </div>
        <div className="select_line">
          {/* 셀렉트 문*/}
          {/* <select name="messageLead">
            <option value="전체">전체</option>
            <option value="결재함">결재함</option>
            <option value="참조함">참조함</option>
            <option value="반려함">반려함</option>
        </select> */}
          {/* <div class="attention_Text">
          <img src="/resources/images/Exclamation.png" alt="">
          <span>보관하지 않은 쪽지는 3개월 후 자동 삭제됩니다</span>
        </div> */}
        </div>
        <div className="wrap2">
          <div className="approval">
            <span className="texttitle">기 안</span>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">
                <img src="" alt="" />
                도장
              </li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
            <span className="texttitle">결 재</span>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
            <ul className="approvalul">
              <li className="one">운영 이사/팀원</li>
              <li className="two">도장</li>
              <li className="three">축온청</li>
              <li className="four">날짜</li>
            </ul>
          </div>
          <table>
            <thead>
              <tr>
                <th className="title">
                  <h1>일반기안서</h1>
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
            </tbody>
          </table>
          <table className="selectdetail">
            <thead>
              <tr>
                <th colSpan={2}>제목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2}>
                  <input
                    type="text"
                    className="inputbox2"
                    placeholder="제목을 입력하세요"
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
                    name=""
                    id=""
                    cols={30}
                    rows={10}
                    placeholder="기안 목적 및 내용을 입력하세요"
                    className="inputbox3"
                    defaultValue={""}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn1">
            <button className="btn">기안</button>
          </div>
        </div>
      </div>
    </main>
    </div>
       );
    }
    
    export default GeneralDraft;