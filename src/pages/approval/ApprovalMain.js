import './ApprovalMain.css';
import { callInboxApprovalAPI } from '../../apis/ApprovalAPICalls';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import ApprovalHeader from './approvalHeader';
import ApprovalMainStatus from './ApprovalMainStatus';
import Pagination from './Pagination'; // Pagination 컴포넌트 추가

function ApprovalMain() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inboxDocument = useSelector((state) => state.approvalReducer);
  const [selectedDocumentCode, setSelectedDocumentCode] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const itemsPerPage = 10; // 페이지 당 아이템 수 설정

  useEffect(() => {
    dispatch(callInboxApprovalAPI());
  }, []);

  const onClickHandler = (documentCode, form) => {
    switch (form) {
      case '휴가신청서':
        navigate('/vacationform', { state: { documentCode } });
        break;
      case '교육신청서':
        navigate('/educationform', { state: { documentCode } });
        break;
      case '출장신청서':
        navigate('/businesstripform', { state: { documentCode } });
        break;
      case '기안신청서':
        navigate('/generaldraftform', { state: { documentCode } });
        break;
      default:
        break;
    }
  };

  const toggleContent = (documentCode) => {
    setSelectedDocumentCode(documentCode);
    var contentBox = document.getElementById('contentBox');
    contentBox.classList.toggle('active');
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div id="wrap">
      <section>
        <ApprovalHeader />
      </section>
      <main>
        <div className="content">
          <div className="subject">
            <strong>결재할 문서</strong>
            <div className="line">
              <div className="search_box">
                <input type="search" placeholder="제목,기안자,양식명을 입력하세요." />
              </div>
            </div>
          </div>
          <div className="select_line"></div>
          <div className="approvaltable">
            <table>
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>분류</th>
                  <th>제목</th>
                  <th>기안자</th>
                  <th>기안일</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(inboxDocument) &&
                  inboxDocument
                    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                    .map((document) => (
                      <React.Fragment key={document?.documentCode}>
                        <tr>
                          <td>
                            <input type="checkbox" value={document?.documentCode} />
                          </td>
                          <td>{document?.form}</td>
                          <td>
                            <a
                              href="/"
                              onClick={(e) => {
                                e.preventDefault();
                                onClickHandler(document?.documentCode, document?.form);
                              }}
                            >
                              {document?.documentTitle}
                            </a>
                          </td>
                          <td>{document?.userDTO?.userName}</td>
                          <td>{document?.draftDay}</td>
                          <td>
                          <button className="btnStatus" onClick={(e) =>{e.preventDefault(); toggleContent(document?.documentCode)}}>
                              진행중
                            </button>
                          </td>
                        </tr>
                        <tr className="contentBox" id="contentBox">
                          <td colSpan="6" className="cblist">
                            <ApprovalMainStatus documentCode={selectedDocumentCode} />
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
              </tbody>
            </table>
          </div>
          <div className="pagination-container">
          <Pagination // Pagination 컴포넌트 추가
            itemsPerPage={itemsPerPage}
            totalItems={inboxDocument.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          </div>
        </div>
      </main>
    </div>
  );
}

export default ApprovalMain;
