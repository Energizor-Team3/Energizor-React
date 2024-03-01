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
    const [isOpeninsert, setIsOpeninsert] = useState(false);
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
    }, [isOpeninsert]);

    const openModalHandler = () => {
        setIsOpeninsert(true);
    };

    const closeModalHandler = () => {
        setIsOpeninsert(false);
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
        window.location.reload();
    };

    const deleteContactHandler = () => {
        dispatch(callPersonalDELETEAPI(selectedContact.pcCode));
        setIsDetailOpen(false);
        window.location.reload();
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
                    
                    <a href="/contact/personal-list/1">
                        <div id="personal_contact" style={{ color: "#415CBE" }}>
                            <img src='/contact/address.png' alt=''/>
                            <span>개인 주소록</span>
                        </div>
                    </a>
                </article>
            </section>

            <main>
                <div className="content1">
                    <div className="subject1">
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
                        {isOpeninsert && (
                            <div className="e367_87">
                                {/* 새로운 연락처를 추가하기 위한 입력 폼 */}
                                <span className="e367_89" onClick={closeModalHandler}></span>
                                <h3 className="e367_88">연락처를 추가해주세요.</h3>
                                <input className="e367_96" type="text" name="pcName" value={form.pcName} onChange={handleInputChange} placeholder="이름" />
                                <input className="e367_97" type="text" name="pcCompany" value={form.pcCompany} onChange={handleInputChange} placeholder="회사" />
                                <input className="e367_98" type="text" name="pcRank" value={form.pcRank} onChange={handleInputChange} placeholder="직급" />
                                <input className="e367_99" type="text" name="pcDept" value={form.pcDept} onChange={handleInputChange} placeholder="부서" />
                                <input className="e367_100" type="text" name="pcPhone" value={form.pcPhone} onChange={handleInputChange} placeholder="전화번호" />
                                <input className="e367_101" type="email" name="pcEmail" value={form.pcEmail} onChange={handleInputChange} placeholder="이메일" />
                                
                                <button className="e367_90">
                                    <div className="e367_91" />
                                    <span className="e367_92" onClick={handleContactInsert}>추가</span>
                                </button>
                                
                                <button className="e367_93">
                                    <div className="e367_94" />
                                    <span className="e367_95" onClick={closeModalHandler}>취소</span>
                                </button>
                            </div>
                        )}
                        
                    </div>

                    {/* 상세 정보 모달 */}
                    <ContactDetailModal
                        isOpen={isDetailOpen}
                        setIsOpen={setIsDetailOpen}
                        // setIsOpen={setIsOpen}
                        setIsOpeninsert={setIsOpeninsert}
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