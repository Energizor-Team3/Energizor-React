import React, { useState, useEffect} from 'react';
import { decodeJwt } from '../../utils/tokenUtils';
import { useDispatch, Provider } from 'react-redux';
import './contact.css';

function ContactDetailModal ({ isOpen, setIsOpen, contact, handleEdit, handleDelete, userCode }) {
    const dispatch = useDispatch();

    const closeModal = () => {
        setIsOpen(false);
    };

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const [form, setForm] = useState({
        pcName: '',
        pcCompany: '',
        pcRank: '',
        pcDept: '',
        pcPhone: '',
        pcEmail: '',
        userCode: token.userCode // 사용자 코드를 토큰에서 가져와 설정
    });

    useEffect(() => {
        if (contact) {
            setForm(contact);
        }
    }, [contact]);

    // useEffect(() => {
    //     if (isOpen) {
    //         // 모달이 열릴 때 body에 스크롤 막기
    //         document.body.style.overflow = 'hidden';
    //     } else {
    //         // 모달이 닫힐 때 body에 스크롤 허용
    //         document.body.style.overflow = 'auto';
    //     }

    //     // 모달이 unmount 될 때 body 스크롤 허용
    //     return () => {
    //         document.body.style.overflow = 'auto';
    //     };
    // }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEdit(form);
    };

    return (
        <>
            {isOpen && (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="e367_87">
                            <span className="e367_89" onClick={closeModal}></span> 
                            <h3 className="e367_88">연락처 상세 정보</h3>
                            <span className="e367_96">이름: <input type="text" name="pcName" value={form.pcName} onChange={handleChange} /></span>
                            <span className="e367_97">회사: <input type="text" name="pcCompany" value={form.pcCompany} onChange={handleChange} /></span>
                            <span className="e367_98">직급: <input type="text" name="pcRank" value={form.pcRank} onChange={handleChange} /></span>
                            <span className="e367_99">부서: <input type="text" name="pcDept" value={form.pcDept} onChange={handleChange} /></span>
                            <span className="e367_100">전화번호: <input type="text" name="pcPhone" value={form.pcPhone} onChange={handleChange} /></span>
                            <span className="e367_101">이메일: <input type="email" name="pcEmail" value={form.pcEmail} onChange={handleChange} /></span>
                            
                            <button className="e367_90">
                                <div className="e367_91" />
                                <span className="e367_92" type="submit">수정</span>
                                
                            </button>
                            <button className="e367_93">
                                <div className="e367_94" />
                                <span className="e367_95" onClick={handleDelete}>삭제</span>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );

};

export default ContactDetailModal;