import { useEffect } from "react";
import "./GroupCUD.css";
import { callDeptUpdateAPI, callTeamUpdateAPI } from "../../apis/GroupAPICalls";
import { useSelector, useDispatch } from "react-redux";
import {
  addUniqueData,
  updateItemName,
  removeItem,
  clearData,
} from "../../modules/GroupUpdateModule";

function GroupUpdate({ clickData, setUpdateCount }) {
  const dispatch = useDispatch();

  const datas = useSelector((state) => state.groupUpdateReducer);

  console.log("필터처리한prop===========================", datas);
  console.log("업데이트로넘어온pope===========================", clickData);

  useEffect(() => {
    dispatch(addUniqueData(clickData));
  }, [clickData, dispatch]);

  const handleChange = (index, newName) => {
    dispatch(updateItemName(index, newName));
  };

  const handleRemove = (indexToRemove) => {
    dispatch(removeItem(indexToRemove));
  };

  console.log("최종추가할리스트들", datas);


  const updateGroup = (update) => {
    const updatePromises = update.data.map((updateItem) => {
      const trimmedName = updateItem.newName.trim();
  
      if (trimmedName && (updateItem.codeType === "dept" || updateItem.codeType === "team")) {
        if (updateItem.codeType === "dept") {
          return dispatch(callDeptUpdateAPI(trimmedName, updateItem.code));
        } else if (updateItem.codeType === "team") {
          return dispatch(callTeamUpdateAPI(trimmedName, updateItem.code));
        }
      } else {
        return Promise.resolve(null); // 조건에 맞지 않는 경우 즉시 해결되는 Promise 반환
      }
    });
  
    Promise.all(updatePromises).then((results) => {
      // API 호출이 모두 성공적으로 완료되었는지 확인
      // 여기서 results는 각 API 호출의 결과를 담은 배열
      if (results.every(result => result !== null)) {
        alert("모든 부서 or 팀 수정이 성공적으로 완료되었습니다!");
      } else {
        alert("일부 수정에 실패했습니다.");
      }
      dispatch(clearData());
      setUpdateCount((prevCount) => prevCount + 1);
    }).catch((error) => {
      console.error("그룹 수정 중 오류 발생", error);
      alert("그룹 수정 중 오류가 발생했습니다.");
    });
  };
  
  

  return (
    <div className="group_update">
      <p>수정할 부서 or 팀을 우측 조직도에서 클릭하세요</p>
      <ul>
        {datas.data.map((item, index) => (
          <li key={index}>
            <label>
              {item?.codeType === "dept"
                ? "부서명"
                : item?.codeType === "team"
                ? "팀명"
                : ""}{" "}
              :
            </label>
            <strong>{item?.name}</strong>
            <span>=&gt;</span>
            <input
              type="text"
              placeholder="수정할 이름 입력"
              value={item?.newName || ""}
              onChange={(e) => handleChange(index, e.target.value)}
            />
            <button className="remove_btn" onClick={() => handleRemove(index)}>
              X
            </button>
            <hr />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="dept_team_btn"
        onClick={() => updateGroup(datas)}
      >
        그룹 수정
      </button>
    </div>
  );
}

export default GroupUpdate;
