import { createActions, handleActions } from 'redux-actions';

// 초기값
const initialState = {};

// 액션 타입 정의
export const GET_PERSONAL_CONTACT = 'contact/personal-list/GET_PERSONAL_CONTACT';
export const GET_COMPANY_CONTACT = 'contact/company-list/GET_COMPANY_CONTACT';
export const POST_PERSONAL_CONTACT = 'contact/personal-insert/POST_PERSONAL_CONTACT';
export const PUT_PERSONAL_CONTACT = 'contact/personal-update/PUT_PERSONAL_CONTACT';
export const DELETE_PERSONAL_CONTACT = 'contact/personal-delete/DELETE_PERSONAL_CONTACT';

// 액션 생성자 함수 생성
const actions = createActions({
    [GET_PERSONAL_CONTACT]: () => {},
    [GET_COMPANY_CONTACT]: () => {},
    [POST_PERSONAL_CONTACT]: () => {},
    [PUT_PERSONAL_CONTACT]: () => {},
    [DELETE_PERSONAL_CONTACT]: () => {}
});

// 리듀서
const contactReducer = handleActions(
    {
        [GET_PERSONAL_CONTACT]: (state, { payload }) => {
            return payload;
        },
        [GET_COMPANY_CONTACT]: (state, { payload }) => {
            return payload;
        },
        [POST_PERSONAL_CONTACT]: (state, { payload }) => {
            return payload;
        },
        [PUT_PERSONAL_CONTACT]: (state, { payload }) => {
            return payload;
        },
        [DELETE_PERSONAL_CONTACT]: (state, { payload }) => {
            return payload;
        }
    }, initialState
);

export default contactReducer;