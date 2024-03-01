import './SharedInBox.css';
import {
    callApprovalCompleteAPI,
    callRfdocumentcompleteAPI,
    callLineDocumentCompleteAPI,
    callRejection2API
} from '../../apis/ApprovalAPICalls';

import { useNavigate, useLocation } from 'react-router-dom'; // useNavigate만 사용하므로 useLocation은 삭제
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import ApprovalHeader from './approvalHeader';
import Pagination from './Pagination'; // Pagination 컴포넌트 추가

function InBox() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const SharedInBoxState = useSelector((state) => state.approvalReducer);
    const completeRfDocument = useSelector((state) => state.approvalRfReducer);
    const completeLineDocument = useSelector((state) => state.approvalLineReducer);
    const rejectionDocument = useSelector((state) => state.approvalSubReducer);
    const SharedInBoxStateList = SharedInBoxState?.data?.content;
    const rejectionDocumentList = rejectionDocument?.data?.content;

    const [selected, setSelected] = useState('전체');
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태 추가
    const itemsPerPage = 10; // 페이지 당 아이템 수 설정

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    useEffect(() => {
        dispatch(callApprovalCompleteAPI())
        dispatch(callRfdocumentcompleteAPI())
        dispatch(callLineDocumentCompleteAPI())
        dispatch(callRejection2API())
    }, [])

    const onSelectChange = (e) => {
        setSelected(e.target.value); // 선택된 값으로 상태를 업데이트합니다.
        setCurrentPage(1); // 선택 시 페이지 초기화
    };

    const onClickHandler = (documentCode, form) => {
        console.log(documentCode, 'documentCode')

        switch (form) {
            case "휴가신청서":
                navigate('/vacationform', { state: { documentCode } });
                break;
            case "교육신청서":
                navigate('/educationform', { state: { documentCode } });
                break;
            case "출장신청서":
                navigate('/businesstripform', { state: { documentCode } });
                break;
            case "기안신청서":
                navigate('/generaldraftform', { state: { documentCode } });
                break;
        }
    }

    const filteredDocuments = () => {
        switch (selected) {
            case '전체':
                return [
                    ...(SharedInBoxStateList || []),
                    ...(completeRfDocument || []),
                    ...(completeLineDocument || []),
                    ...(rejectionDocumentList || [])
                ];
            case '기안':
                return SharedInBoxStateList || [];
            case '참조':
                return completeRfDocument || [];
            case '결재':
                return completeLineDocument || [];
            case '반려':
                return rejectionDocumentList || [];
            default:
                return [];
        }
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
                        <strong>내 문서함</strong>
                        <div className="line">
                            <div className="search_box">
                                <input type="search" placeholder="제목,분류를 입력하세요." />
                            </div>
                        </div>
                    </div>
                    <div className="select_line">
                        <select name="messageLead" value={selected} onChange={onSelectChange} >
                            <option value="전체" >전체</option>
                            <option value="결재">결재함</option>
                            <option value="참조">참조함</option>
                            <option value="기안">기안함</option>
                            <option value="반려">반려함</option>
                        </select>
                    </div>
                    <div className='approvaltables'>
                        <thead>
                            <tr>
                                <th className='check'>
                                    <input type="checkbox" />
                                </th>
                                <th>분류</th>
                                <th>제목</th>
                                <th>기안일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocuments().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((document) => (
                                <tr key={document?.documentCode} >
                                    <td><input type="checkbox" value={document?.documentCode} /></td>
                                    <td >{document?.form}</td>
                                    <td><a href="#" onClick={(e) => {
                                        e.preventDefault(); // 기본 이벤트를 방지합니다.
                                        onClickHandler(document?.documentCode, document?.form);
                                    }}>{document?.documentTitle}</a></td>
                                    <td>{document?.draftDay}</td>
                                </tr>
                            ))}
                        </tbody>
                    </div>
                    <div className="pagination-container">
                    <Pagination // Pagination 컴포넌트 추가
                        itemsPerPage={itemsPerPage}
                        totalItems={filteredDocuments().length}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default InBox;
