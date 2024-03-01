    import "../../components/common/SubHeader.css";
    import MessageNavbar from "./MessageNavbar";

    import { useSelector, useDispatch } from "react-redux";
    import { useEffect, useState } from "react";

    import { decodeJwt } from "../../utils/tokenUtils";
    import { callMyPageAPI } from "../../apis/UserAPICalls";

    function SendMessage() {
    const dispatch = useDispatch();
    const myInfo = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(callMyPageAPI());
    }, []);

    console.log("로그인한유저정보확인!==========", myInfo);

    return (
        <div id="wrap">
        <MessageNavbar />

        <main className="subMain">
            <div className="content">
            <div className="subject">
                <strong>보낸 쪽지함</strong>
                <div className="line">
                <div className="search_box">
                    <input
                    type="search"
                    placeholder="보낸사람, 제목을 입력하세요."
                    />
                </div>
                </div>
            </div>

            <div className="select_line">
                {/* <select name="messageLead">
                                    <option value="전체">전체</option>
                                    <option value="읽음">읽음</option>
                                    <option value="안읽음">안읽음</option>
                                </select> 
                                <div className="attention_Text">
                                <img src="/resources/images/Exclamation.png" alt=""/>
                                <span>보관하지 않은 쪽지는 3개월 후 자동 삭제됩니다</span>
                                </div>  */}
            </div>

            <table className="subTable">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>받는사람</th>
                        <th>제목</th>
                        <th>보낸날짜</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="checkbox" />
                        </td>
                        <td></td>
                        <td className="table_subject"></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>

                <div className="pageNumberSelect">
                    <select id="pageNumberChoice">
                        <option value=""></option>
                    </select>
                    <label className="pageNumberChoiceText" htmlFor="pageNumberChoice">
                    페이지당 항목수
                    </label>
                </div>
            </div>
        </main>
        </div>
    );
    }

    export default SendMessage;
