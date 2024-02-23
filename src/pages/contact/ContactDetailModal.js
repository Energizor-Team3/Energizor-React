import React, { useState, useEffect } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

const ContactDetailModal = ({ isOpen, closeModal, contact, handleEdit, handleDelete }) => {
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
                    <h3>연락처 상세 정보</h3>
                    <form onSubmit={handleSubmit}>
                        <label>
                            이름:
                            <input type="text" name="pcName" value={form.pcName} onChange={handleChange} />
                        </label>
                        <label>
                            회사:
                            <input type="text" name="pcCompany" value={form.pcCompany} onChange={handleChange} />
                        </label>
                        <label>
                            직급:
                            <input type="text" name="pcRank" value={form.pcRank} onChange={handleChange} />
                        </label>
                        <label>
                            부서:
                            <input type="text" name="pcDept" value={form.pcDept} onChange={handleChange} />
                        </label>
                        <label>
                            전화번호:
                            <input type="text" name="pcPhone" value={form.pcPhone} onChange={handleChange} />
                        </label>
                        <label>
                            이메일:
                            <input type="email" name="pcEmail" value={form.pcEmail} onChange={handleChange} />
                        </label>
                        <button type="submit">수정</button>
                    </form>
                    <button onClick={handleDelete}>삭제</button>
                    <button onClick={closeModal}>닫기</button>
                </div>
            )}
        </>
    );
};

export default ContactDetailModal;