

import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function TreeNode({
  name,
  children,
  depth = 1,
  onClickCode,
  userCode,
  teamCode,
  deptCode,
  searchOpen,
}) {
  const [isOpen, setIsOpen] = useState(depth === 1);
  const hasChildren = children && children.length > 0;
  const dispatch = useDispatch();
  const [highlighted, setHighlighted] = useState(false);

  console.log("TreeNode로 넘어온 검색값====", searchOpen);


  useEffect(() => {
    let isOpenValue = false;

    if (children) {
      isOpenValue = children.some((child) => {
        // some : 콜백함수조건 만족여부에 따라 불리언값을 반환
        if (child.name === searchOpen) { // 부서명과 일치시 트루값 반환
          return true;
        } else if (child.children) {
          return child.children.some((grandchild) => {
            if (grandchild.name === searchOpen) { // 팀명과 일치시 트루 반환
              return true;
            } else if (grandchild.children) {
              return grandchild.children.some( // === 연산자를 통해 유저명과일치시 불리언값 반환
                (greatGrandchild) => greatGrandchild.name === searchOpen);
            }
            return false;
          });
        }
        return false;
      });
    }

    console.log("child=====", children)

      // prevState : 번역하면 상태라는 뜻이며 , useState 훅 사용시 현재 상태값이 true , false 인지 확인할떄 사용함
    setIsOpen((prevState) => { 
      // prevState가 false로 들어오면서(닫힌노드) isOpenValue가 트루일때만(조직도 == 검색명 일치) if문실행
      if (!prevState && isOpenValue) { 
        return true;
      }
      return prevState; // 노드가 열려있으면 그대로 반환(열린노드는 열린상태 유지)
    });
    setHighlighted(name === searchOpen); // 조직도 == 검색명 일치시엔 텍스트 색상 변경위해 트루반환
  }, [searchOpen, children, name, depth]); 
  // 이펙트를 사용하여 여기 셋 중 상태 변경시마다 코드실행 , searchOpen(검색)이 바뀔때마다 코드실행됨
  // 만약 검색한 부서 , 팀 , 유저 중 노드가 닫혀있는 경우에만 노드토글이 열림

  const toggleOpen = () => {
    if (hasChildren) {
      setIsOpen((prevIsOpen) => !prevIsOpen);
    }
  };

  const handleClick = (e) => {
    e.stopPropagation();

    if (userCode !== undefined && !teamCode && !deptCode) {
      onClickCode(userCode, 'user');
    } else if (teamCode !== undefined && !userCode && !deptCode) {
      onClickCode(teamCode, 'team');
    } else if (deptCode !== undefined && !userCode && !teamCode) {
      onClickCode(deptCode, 'dept');
    }
  };

  return (
    <div style={{ paddingLeft: `${depth * 15}px` }}>
      {hasChildren && (
        <span style={{ cursor: "pointer" }} onClick={toggleOpen}>
          {isOpen ? "▼" : "▶"}
        </span>
      )}
      <span
        onClick={handleClick}
        style={{ cursor: "pointer", color: highlighted ? "red" : "black" }}
      >
        {name}
      </span>
      {isOpen && hasChildren && (
        <div className="group_style">
          {children.map((child, index) => (
            <TreeNode
              key={index}
              name={child.name}
              children={child.children}
              depth={depth + 1}
              onClickCode={onClickCode}
              userCode={child.userCode}
              teamCode={child.teamCode}
              deptCode={child.deptCode}
              searchOpen={searchOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default TreeNode;


