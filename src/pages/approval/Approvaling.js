import './Approvaling.css';
import { callApprovalingAPI, callRfDocumentAPI, callLineDocumentAPI } from '../../apis/ApprovalAPICalls';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import ApprovalHeader from './approvalHeader';
import Pagination from './Pagination'; // Pagination 컴포넌트 import
import ApprovalMainStatus from './ApprovalMainStatus';

function Approvaling() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const approvalingstate = useSelector((state) => state.approvalReducer);
  const rfdocument = useSelector((state) => state.approvalRfReducer);
  const linedocument = useSelector((state) => state.approvalReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDocumentCode, setSelectedDocumentCode] = useState(null);
  const [selected, setSelected] = useState('전체');
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
  const itemsPerPage = 10; // 페이지 당 아이템 수 설정

  const onSelectChange = (e) => {
    setSelected(e.target.value); // 선택된 값으로 상태를 업데이트합니다.
    setCurrentPage(1); // 선택 시 페이지 초기화
  };

  const allDocuments = [
    ...(approvalingstate || []),
    ...(linedocument || []),
    ...(rfdocument || [])
  ];

  useEffect(() => {
    async function fetchData() {
      // 여러 데이터를 가져오는 비동기 함수들을 호출합니다.
      await dispatch(callApprovalingAPI());
      await dispatch(callRfDocumentAPI());
      await dispatch(callLineDocumentAPI());
      // 데이터 로딩이 완료되면 로딩 상태를 false로 설정합니다.
      setIsLoading(false);
    }

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 선택된 문서 목록을 필터링합니다.
  let filteredDocuments = [];
  switch (selected) {
    case '전체':
      filteredDocuments = allDocuments;
      break;
    case '기안':
      filteredDocuments = approvalingstate;
      break;
    case '참조':
      filteredDocuments = rfdocument;
      break;
    case '결재':
      filteredDocuments = linedocument;
      break;
    default:
      filteredDocuments = allDocuments;
  }

  // 현재 페이지에 해당하는 아이템들을 가져옵니다.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDocuments.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 변경 시 실행되는 함수
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedDocumentCode(null); // 페이지 변경 시 선택된 문서 초기화
  };

  const onClickHandler = (documentCode, form) => {
    console.log(documentCode, 'documentCode');

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
        // 다른 양식일 경우의 처리
        break;
    }
  };

  // 선택된 문서를 토글하는 함수
  const toggleContent = (documentCode) => {
    setSelectedDocumentCode(documentCode);
    var contentBox = document.getElementById('contentBox');
    contentBox.classList.toggle('active');
  };

  return (
    <div id="wrap">
      <section>
        <ApprovalHeader />
      </section>
      <main>
        <div className="content">
          <div className="subject">
            <strong>진행중인 문서</strong>
            <div className="line">
              <div className="search_box">
                <input type="search" placeholder="제목,기안자,문서번호,양식명을 입력하세요." />
              </div>
            </div>
          </div>
          <div className="select_line">
            <select name="messageLead" value={selected} onChange={onSelectChange}>
              <option value="전체">전체</option>
              <option value="결재">결재함</option>
              <option value="참조">참조함</option>
              <option value="기안">기안함</option>
            </select>
          </div>
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
                {currentItems.map((document) => (
                  <React.Fragment key={document.documentCode}>
                    <tr>
                      <td>
                        <input type="checkbox" value={document.documentCode} />
                      </td>
                      <td>{document.form}</td>
                      <td>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            onClickHandler(document.documentCode, document.form);
                          }}
                        >
                          {document.documentTitle}
                        </a>
                      </td>
                      <td>{document.userDTO.userName}</td>
                      <td>{document.draftDay}</td>
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
            totalItems={filteredDocuments.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Approvaling;
