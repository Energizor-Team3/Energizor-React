import ApprovalHeader from './approvalHeader'
import ApprovalGroup2 from './ApprovalGroup2'

function ProxyApprovalLine(){

  const handleUserSelect = (code) => {
    // 로그인 사용자와 선택된 사용자가 동일한지 검사
    
    console.log(code);
    

    }

    const toggleContent =() =>{
      var og = document.getElementById("og");
      og.classList.toggle("active");
      }
    return(
      <div id="wrap">
        <section>
    <ApprovalHeader/>

        </section>
      <main>
        <div className="content">
          <div className="subject">
            <strong>대리결재 위임</strong>
            <div className="line">
              <div className="search_box">
                <span>
                  <button onClick={toggleContent}>위임</button>
              </span>
              <span>          
              </span>
              </div>
            </div>
            
          </div>
          <div className="select_line">
          </div>
          <div className='side'>
          <div className="wrap2" id='pdf-content'>
            
              
           
            
            <div className="btn1">
               
            </div>
          </div>
          <div className='og' id='og' >
        <ApprovalGroup2 onUserSelect={handleUserSelect} />

          </div>
          </div>
          </div>
      </main>
      </div>
    )
}

export default ProxyApprovalLine;