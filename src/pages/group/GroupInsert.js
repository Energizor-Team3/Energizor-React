import { useEffect, useState } from "react";
import "./GroupCUD.css";
import { useSelector, useDispatch } from "react-redux";
import { callDeptInsertAPI } from "../../apis/GroupAPICalls";
import { callTeamInsertAPI } from "../../apis/GroupAPICalls";

function GroupInsert({ allGroup , setUpdateCount, setSearchOpen}) {
  const [deptValue, setDeptValue] = useState("");
  const [depts, setDepts] = useState([]);
  const allDept = useSelector((state) => state.groupAdminReducer);
  const dispatch = useDispatch();

  const handleDeptInputChange = (event) => {
    setDeptValue(event.target.value);
  };

  const handleDeptKeyPress = (event) => {
    if (event.key === "Enter") {
      addDept();
    }
  };

  const addDept = () => {
    if (deptValue.trim() !== "") {
      if(allGroup.some(dept => dept.deptName === deptValue.trim())) {
        alert(`이미 존재하는 부서가 있습니다`);
        return;
      } 
        setDepts([...depts, deptValue.trim()]);
        setDeptValue("");
    }
  };

  // 추가할 부서 리스트안에서 삭제
  const removeDept = (indexToRemove) => {
    setDepts(depts.filter((_, index) => index !== indexToRemove));
  };

  // 부서추가버튼 클릭시 insert 코드
  const insertDept = (deptNames) => {
  
    deptNames.forEach(inputdeptName => {
      console.log(`Inserting department: ${inputdeptName}`);
      dispatch(callDeptInsertAPI(inputdeptName));
      console.log("새로운 부서!!", inputdeptName); 
    });
  
  // 모든 부서 이름을 하나의 문자열로 결합
  const addedDeptsText = deptNames.join(",\n");
  alert(`새로운 부서 :\n${addedDeptsText}\n가 추가되었습니다`)
  setUpdateCount(prevCount => prevCount + 1); // useState는 비동기적으로 일어나기 때문에 현재 상태기반 업데이트하는것이 안전함
  setDepts([]);
  };




  /* 팀추가 */

  // 1) 추가할팀의 부서 존재 여부 확인
  const [checkDeptValue, setCheckDeptValue] = useState("");
  const [isDeptChecked, setIsDeptChecked] = useState(false);
  const [checkDeptCode, setCheckDeptCode] = useState("");

  const handleCheckDeptKeyPress = (e) => {
    if (e.key === "Enter") {
      check();
    }
  };

  console.log("checkDeptValue===", checkDeptValue)

  const check = () => {
    if (checkDeptValue.trim() !== "") {
      const deptObject = allGroup.find(dept => dept.deptName === checkDeptValue.trim());
  
      if (!deptObject) {
        alert(`"${checkDeptValue}" 는 없는 부서입니다.`);
        setIsDeptChecked(false);
      } else {
        // 부서 이름이 일치하는 경우, 해당 부서의 deptCode를 사용할 수 있습니다.
        const deptCode = deptObject.deptCode;
        alert(`부서 확인 성공!`);
        setIsDeptChecked(true);
        setCheckDeptCode(deptCode);
        setSearchOpen(checkDeptValue.trim());
      }
    }
  };
  
  


  // 2) 팀 추가 코드
  const [teamValue, setTeamValue] = useState("");
  const [teams, setTeams] = useState([]);

  const handleTeamKeyPress = (e) => {
    if (e.key === "Enter") {
      addTeam();
    }
  };

  const addTeam = () => {
    if (teamValue.trim() !== "") {
      let isTeamExists = false;
  
      // 모든 부서를 순회하면서 팀 이름이 이미 존재하는지 확인
      allGroup.forEach(dept => {
        dept.teamList.forEach(team => {
          if (team.teamName === teamValue.trim()) {
            alert("이미 존재하는 팀 이름입니다.");
            isTeamExists = true;
            return;
          }
        });
      });
  
      // 팀 이름이 중복되지 않는 경우에만 팀을 추가
      if (!isTeamExists) {
        setTeams([...teams, teamValue.trim()]);
        setTeamValue("");
      }
    }
  };
  
  // 추가할 팀 리스트안에서 삭제
  const removeTeam = (indexToRemove) => {
    setTeams(teams.filter((_, index) => index !== indexToRemove));
  };


    // 팀 추가버튼 클릭시 insert 코드
    const insertTeam = (teamNames) => {
  
      teamNames.forEach(inputTeamName => {
        console.log(`Inserting department: ${inputTeamName}`);
        dispatch(callTeamInsertAPI(inputTeamName , checkDeptCode));
        console.log("새로운 팀 추가성공!!", inputTeamName , checkDeptValue); 
      });
    
    const addedTeamsText = teamNames.join(",\n");
    alert(`새로운 팀 :\n${addedTeamsText}\n가 추가되었습니다`)
    setUpdateCount(prevCount => prevCount + 1); 
    setTeams([]);
    };

  return (
    <div className="group_insert">
      <div className='group_dept'>
        <label>부서명</label>
        <input
          placeholder="추가할 부서명을 입력하세요"
          type="text"
          value={deptValue}
          onChange={handleDeptInputChange}
          onKeyPress={handleDeptKeyPress}
        />
        <ul className="dept_team_view">
          {depts.map((department, index) => (
            <li key={index}>
              {department}
              <button className='remove_btn' onClick={() => removeDept(index)}>X</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => insertDept(depts)} className='dept_team_btn'>
          부서추가
        </button>
      </div>
      <hr/>
      <div>
        <div>
          <label>부서명</label>
          <input
          type='text'
          placeholder='팀을 추가할 부서를 입력하세요.'
          value={checkDeptValue}
          onChange={(event) => setCheckDeptValue(event.target.value)}
          onKeyPress={handleCheckDeptKeyPress}
          />
        </div>
        <label>팀명</label>
        <input
          placeholder="추가할 팀명을 입력하세요"
          type="text"
          value={teamValue}
          onChange={(e) => setTeamValue(e.target.value)}
          onKeyPress={handleTeamKeyPress}
          disabled={!isDeptChecked} 
        />
        <ul className="dept_team_view">
          {teams.map((team, index) => (
            <li key={index}>
              {team}
              <button className='remove_btn' onClick={() => removeTeam(index)}>X</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => insertTeam(teams)} className='dept_team_btn'>
          팀추가
        </button>
      </div>
    </div>
  );
}

export default GroupInsert;
