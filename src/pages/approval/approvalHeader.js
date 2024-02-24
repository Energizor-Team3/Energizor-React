function ApprovalHeader(){

    return(
        <article>
          <h2>전자결재</h2>
          <div>
            <a href="./newapproval">
              <button className="btn">신규기안</button>
            </a>
          </div>
          <ul className="subList">
            <li>
              <div>
                <img src="/common/Approval.png" alt="" />
                <span>
                  <a href="./approvalmain">결재할 문서</a>
                </span>
                <span className="listlist">1</span>
              </div>
            </li>
            <li className="subListText">
              <div>
                <img src="/common/Approval.png" alt="" />
                <span>
                  <a href="/approvaling">진행중인 문서</a>
                </span>
                <span className="listlist1">1</span>
              </div>
            </li>
            <li>
              <div>
                <img src="/common/Mydocumentbox.png" alt="" />
                <span>
                  <a href="/inbox">내 문서함</a>
                </span>
              </div>
            </li>
            <li>
              <div>
                <img src="/common/Temporarystoragebox.png" alt="" />
                <span>
                  <a href="/saveinbox">임시보관함</a>
                </span>
              </div>
            </li>
            <li>
              <div>
                <img src="/common/Shareddocumentbox.png" alt="" />
                <span>
                  <a href="/sharedinbox">공유받은 문서함</a>
                </span>
              </div>
            </li>
            <li>
              <div>
                <img src="/common/Shareddocumentbox.png" alt="" />
                <span>
                  <a href="/proxyapprovalline">대리결재 위임</a>
                </span>
              </div>
            </li>
          </ul>
        </article>
    )
}

export default ApprovalHeader;

