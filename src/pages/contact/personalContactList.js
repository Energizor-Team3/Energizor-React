import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { callPersonalAPI, callPersonalPOSTAPI, callPersonalPUTAPI, callPersonalDELETEAPI } from '../../apis/ContactAPICalls';
import { decodeJwt } from '../../utils/tokenUtils';
import ContactDetailModal from './ContactDetailModal';

import contactReducer from '../../modules/ContactModule';
import styled from 'styled-components';
import './contact.css';

function PersonalContact() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const contactList = useSelector((state) => state.contactReducer);
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        pcName: '',
        pcCompany: '',
        pcRank: '',
        pcDept: '',
        pcPhone: '',
        pcEmail: '',
        userCode: decodeJwt(window.localStorage.getItem("accessToken")).userCode
    });

    useEffect(() => {
        dispatch(callPersonalAPI({ userCode: params.userCode}));
    }, []);

    const openModalHandler = () => {
        setIsOpen(true);
    };

    const closeModalHandler = () => {
        setIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    };

    const handleContactInsert = () => {
        dispatch(callPersonalPOSTAPI({ form: form }));
        closeModalHandler();
    };

    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [selectedContact, setSelectedContact] = useState(null);

    const openDetailModalHandler = (contact) => {
        setSelectedContact(contact);
        setIsDetailOpen(true);
    };

    const closeDetailModalHandler = () => {
        setSelectedContact(null);
        setIsDetailOpen(false);
    };

    const editContactHandler = (editedContact) => {
        dispatch(callPersonalPUTAPI({ pcCode: editedContact.pcCode, form: editedContact }));
        setIsDetailOpen(false);
    };

    const deleteContactHandler = () => {
        dispatch(callPersonalDELETEAPI(selectedContact.pcCode));
        setIsDetailOpen(false);
    };

    return (
        <div id='wrap'>
            <section>
                <article>
                    <h2 className='contact'>주소록</h2>
                    <a href="/contact/company-list">
                        <div id='company_contact'>
                            <img src='/contact/address.png' alt=''/>
                            <span>회사 주소록</span>
                        </div>
                    </a>
                    
                    <a href="/contact/personal-list/{userCode}">
                        <div id="personal_contact" style={{ color: "#415CBE" }}>
                            <img src='/contact/address.png' alt=''/>
                            <span>개인 주소록</span>
                        </div>
                    </a>
                </article>
            </section>

            <main>
                <div className="content">
                    <div className="subject">
                        <strong>개인 주소록</strong>
                        <div className="line"></div>
                    </div>

                    <table className='table_co' id='listArea'>
                        <thead>
                            <tr>
                                <th>이름</th>
                                <th>회사</th>
                                <th>직급</th>
                                <th>부서</th>
                                <th>연락처</th>
                                <th>이메일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(contactList) && contactList.map((personalList) => (
                                <tr key={personalList?.pcCode} onClick={() => openDetailModalHandler(personalList)}>
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

                    <div>
                         {/* 모달 열기 버튼 */}
                        <button onClick={openModalHandler} className="contact_insert">연락처 추가</button>
                        
                        {/* 모달 */}
                        {isOpen && (
                            <div>
                                {/* 새로운 연락처를 추가하기 위한 입력 폼 */}
                                <h3>연락처를 추가해주세요.</h3>
                                <input type="text" name="pcName" value={form.pcName} onChange={handleInputChange} placeholder="이름" />
                                <input type="text" name="pcCompany" value={form.pcCompany} onChange={handleInputChange} placeholder="회사" />
                                <input type="text" name="pcRank" value={form.pcRank} onChange={handleInputChange} placeholder="직급" />
                                <input type="text" name="pcDept" value={form.pcDept} onChange={handleInputChange} placeholder="부서" />
                                <input type="text" name="pcPhone" value={form.pcPhone} onChange={handleInputChange} placeholder="전화번호" />
                                <input type="email" name="pcEmail" value={form.pcEmail} onChange={handleInputChange} placeholder="이메일" />
                                <button onClick={handleContactInsert}>추가</button>
                                <button onClick={closeModalHandler}>취소</button>
                            </div>
                        )}
                    </div>

                    {/* 상세 정보 모달 */}
                    <ContactDetailModal
                        isOpen={isDetailOpen}
                        closeModal={closeDetailModalHandler}
                        contact={selectedContact}
                        handleEdit={editContactHandler}
                        handleDelete={deleteContactHandler}
                    />
                </div>
            </main>
        </div>
    );
}

export default PersonalContact;