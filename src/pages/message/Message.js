

import "./Message.css"


function Message()  {




    return(


        <div id="wrap">
            <div id="wrap">
            <section>
                <article>
                <h2>쪽지</h2>
                <div>
                    <a href="#group" className="btn">
                    쪽지쓰기
                    </a>
                </div>
                <ul className="subList">
                    <li>
                    <div>
                        <img src="/common/Inbox.png" alt="" />
                        <span>받은쪽지함</span>
                    </div>
                    </li>
                    <li className="subListText">
                    <div>
                        <img src="/common/Outbox.png" alt="" />
                        <span>보낸쪽지함</span>
                    </div>
                    <button>수신확인</button>
                    </li>
                </ul>
                </article>
            </section>
            </div>


            <main className="subMain">
                <div className="content">
                    <div className="subject">
                        <strong>받은 쪽지함</strong>
                        <div className="line">
                        <div className="searchbox">
                            <input
                            type="search"
                            placeholder="보낸사람, 제목을 입력하세요."
                            />
                        </div>
                        </div>
                    </div>

                    <div className="selectLine">
                        <select name="messageLead">
                        <option value="전체">전체</option>
                        <option value="읽음">읽음</option>
                        <option value="안읽음">안읽음</option>
                        </select>
                        {/* <!-- <div className="attention_Text">
                                    <img src="/resources/images/Exclamation.png" alt="">
                                    <span>보관하지 않은 쪽지는 3개월 후 자동 삭제됩니다</span>
                                </div> --> */}
                    </div>

                    <table>
                        <thead>
                        <th>
                            <input type="checkbox" />
                        </th>
                        <th>보낸사람</th>
                        <th>제목</th>
                        <th>받은날짜</th>
                        <th>읽은날짜</th>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                            <input type="checkbox" />
                            </td>
                            <td></td>
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
                        <label className="pageNumberChoiceText" for="pageNumberChoice">
                            페이지당 항목수
                        </label>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Message;