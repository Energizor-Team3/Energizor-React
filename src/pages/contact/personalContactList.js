// Contact.js (컴포넌트 파일)

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import { callContactAPI } from '../../apis/ContactAPICalls';

import './contact.css';

function Contact() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const contact = useSelector((state) => state.contactReducer);

    console.log('contact', contact);

    useEffect(() => {
        dispatch(callContactAPI({
            userCode: params.userCode
        }));
    }, []);

    return (
        <div id='wrap'>
            <section>
                <article>
                    <h2 className='contact'>주소록</h2>
                    <div id='company_contact'>
                        <img src='/contact/address.png' alt=''/>
                        <span>회사 주소록</span>
                    </div>
                    <div id="personal_contact" style={{ color: "#415CBE" }}>
                        <img src='/contact/address.png' alt=''/>
                        <span>개인 주소록</span>
                    </div>
                    <div id='favorites_contact'>
                        <img src='/contact/address.png' alt=''/>
                        <span>즐겨찾기</span>
                    </div>
                </article>
            </section>

            <main>
                <div className="content">
                    <div className="subject">
                        <strong>개인 주소록</strong>
                        <div className="line"></div>
                    </div>

                    <div className="select_line">
                        <select name="messageLead">
                            <option value="전체">전체</option>
                            <option value="연차">연차</option>
                            <option value="병가">병가</option>
                            <option value="공가">공가</option>
                            <option value="경조사">경조사</option>
                        </select>

                        <select name="messageLead">
                            <option value="전체">전체</option>
                            <option value="승인">반려</option>
                            <option value="대기중">대기중</option>
                            <option value="대기중">등록</option>
                        </select>
                        <h3 style={{ textAlign: 'center' }}>2024-02</h3>
                    </div>

                    <table className='table table-hover' id='listArea'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>이름</th>
                                <th>회사</th>
                                <th>직급</th>
                                <th>부서</th>
                                <th>연락처</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(contact) && contact.map((personalList) => (
                                <tr key={personalList?.pcCode}>
                                    <td>{personalList?.pcCode}</td>
                                    <td>{personalList?.pcName}</td>
                                    <td>{personalList?.pcCompany}</td>
                                    <td>{personalList?.pcRank}</td>
                                    <td>{personalList?.pcDept}</td>
                                    <td>{personalList?.pcPhone}</td>
                                    <td>{personalList?.pcEmail}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <select name="page_number_choice" id="page_number_choice">
                        <option value=""></option>
                    </select>
                    <label className="page_number_choice_text" htmlFor="page_number_choice">페이지당 항목수</label>
                </div>
            </main>
        </div>
    );
}

export default Contact;