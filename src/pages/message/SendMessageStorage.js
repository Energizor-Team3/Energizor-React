    import "../../components/common/SubHeader.css";
    import MessageNavbar from "./MessageNavbar";

    import { useSelector, useDispatch } from "react-redux";
    import { useEffect, useState } from "react";

    import { decodeJwt } from "../../utils/tokenUtils";
    import { callMyPageAPI } from "../../apis/UserAPICalls";

    function SendMessageStorage() {
    // const dispatch = useDispatch();
    // const myInfo = useSelector((state) => state.userReducer);

    // useEffect(() => {
    //     dispatch(callMyPageAPI());
    // }, []);

    // console.log("로그인한유저정보확인!==========", myInfo);

    return (
        <div id="wrap">
        <MessageNavbar />

        <main className="subMain">
            <div className="content">
            <div className="subject">
                <strong>임시 보관함</strong>
                <div className="line">
                <div className="searchbox">
                    <input
                    type="search"
                    placeholder="보낸사람, 제목을 입력하세요."
                    />
                </div>
                </div>
            </div>

            {/* <div className="selectLine">
                    </div> */}

            <table className="subTable">
                <thead>
                <tr>
                    <th>
                    <input type="checkbox" />
                    </th>
                    <th className="wid_fix">받는사람</th>
                    <th>제목</th>
                    <th className="wid_fix">저장일자</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                    <input type="checkbox" />
                    </td>
                    <td></td>
                    <td></td>
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

    export default SendMessageStorage;
