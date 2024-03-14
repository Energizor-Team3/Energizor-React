import { useEffect } from "react";
import "./GroupCUD.css";
import {
  callDeptDeletetAPI,
  callTeamDeletetAPI,
} from "../../apis/GroupAPICalls";
import { useSelector, useDispatch } from "react-redux";

import {
  addUniqueData,
  removeItem,
  clearData,
} from "../../modules/GroupDeleteModule";

function GroupDelete({ clickData, setUpdateCount, allGroup }) {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.groupDeleteReducer);

  console.log("삭제필터처리한prop===========================", data);
  console.log("삭제로넘어온pope===========================", clickData);
  console.log("삭제로넘어온전제조직도===========================", allGroup);

  useEffect(() => {
    dispatch(addUniqueData(clickData));
  }, [clickData, dispatch]);

  const handleRemove = (indexToRemove) => {
    dispatch(removeItem(indexToRemove));
  };

  const deptCode = "특정 코드";

  const deleteGroup = (deleteItem) => {
    console.log("최종삭제리스트", deleteItem.data);

    const deleteDept = allGroup.some((dept) =>
      deleteItem.data.some(
        (item) =>
          item.code === dept.deptCode &&
          dept.teamList &&
          dept.teamList.length > 0
      )
    );
    console.log("진실혹은거짓", deleteDept);

    if (deleteDept) {
      alert("팀이 속해있는 부서는 삭제할 수 없습니다.");
    }

    const deletePromises = deleteItem.data.map((deleteItem) => {
      if (deleteItem.codeType === "dept" || deleteItem.codeType === "team") {
        const deleteDept = allGroup.some(
          (dept) =>
            deleteItem.code === dept.deptCode &&
            dept.teamList &&
            dept.teamList.length > 0
        );
        console.log("진실혹은거짓", deleteDept);
        if (deleteItem.codeType === "dept" && !deleteDept) {
          return dispatch(callDeptDeletetAPI(deleteItem.code));
        } else if (deleteItem.codeType === "team") {
          return dispatch(callTeamDeletetAPI(deleteItem.code));
        }
      } else {
        return Promise.resolve(null); // 조건에 맞지 않는 경우 즉시 해결되는 Promise 반환
      }
    });

    Promise.all(deletePromises)
      .then((results) => {
        if (results.every((result) => result !== null && !deleteDept)) {
          alert("모든 부서 or 팀 삭제가 성공적으로 삭제되었습니다!");
        } else {
          alert("일부 삭제에 실패했습니다.");
        }
        dispatch(clearData());
        setUpdateCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.error("그룹 삭제 중 오류 발생", error);
        alert("그룹 삭제 중 오류가 발생했습니다.");
      });
  };

  return (
    <div className="group_delete">
      <p>삭제할 부서 or 팀을 우측 조직도에서 클릭하세요</p>
      <ul>
        {data.data.map((item, index) => (
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
        onClick={() => deleteGroup(data)}
      >
        그룹 삭제
      </button>
    </div>
  );
}
export default GroupDelete;
