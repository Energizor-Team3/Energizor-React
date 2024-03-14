


    import {
    callGetuserDetailAPI,
    callGetTeamDetailAPI,
    callGetDeptDetailAPI,
    } from '../../apis/GroupAPICalls';

    import { useSelector, useDispatch } from 'react-redux';
    import { useEffect, useState, useReducer } from 'react'

    function GroupDetail({clickCode}) {



    const dispatch = useDispatch();

    const groupUser = useSelector((state) => state.groupUserReducer);
    const groupTeam = useSelector((state) => state.groupTeamReducer);
    const groupDept = useSelector((state) => state.groupDeptReducer);

    console.log("handleUser????====", clickCode)

    const [showTeamInfo, setShowTeamInfo] = useState(false);
    const [showUserInfo, setShowUserInfo] = useState(false);
    const [showDeptInfo, setShowDeptInfo] = useState(false);


        useEffect(() => {
        if (clickCode) {
            switch (clickCode.codeType) {
            case 'user':
                dispatch(callGetuserDetailAPI(clickCode.code));
                setShowUserInfo(true);
                setShowTeamInfo(false);
                setShowDeptInfo(false);
                break;
            case 'team':
                dispatch(callGetTeamDetailAPI(clickCode.code));
                setShowTeamInfo(true);
                setShowUserInfo(false);
                setShowDeptInfo(false);
                break;
            case 'dept':
                dispatch(callGetDeptDetailAPI(clickCode.code));
                setShowDeptInfo(true);
                setShowTeamInfo(false);
                setShowUserInfo(false);
                break;
            default:
            }
        }
        }, [clickCode, dispatch]);

    return(

    <>
        {showUserInfo && (
            <div className="group_member_info_wrap  ">
                <a
                    className="note_btn"
                    href="#home"
                >
                    쪽지
                </a>
                <hr />
                <div className="group_info">
                    <ul className="group_member_info">
                        <li>
                            <strong>사용자 ID</strong>
                            <span>{groupUser?.userId}</span>
                        </li>
                        <li>
                            <strong>이름</strong>
                            <span>{groupUser?.userName}</span>
                        </li>
                        <li>
                            <strong>소속 부서</strong>
                            <span>{groupUser?.team?.teamName}</span>
                        </li>
                        <li>
                            <strong>직급</strong>
                            <span>{groupUser?.userRank}</span>
                        </li>
                        <li>
                            <strong>휴대폰 번호</strong>
                            <span>{groupUser?.phone}</span>
                        </li>
                        <li>
                            <strong>이메일</strong>
                            <span>{groupUser?.email}</span>
                        </li>
                    </ul>
                    <img
                        src={groupUser?.imgName}
                        alt=""
                    />
                </div>
            </div>
        )}
        {showTeamInfo && (
            <div className="group_team_info_wrap ">
                <ul className="group_team_dept_info">
                    <li>
                        <strong>팀명</strong>
                        <span>{groupTeam?.teamName}</span>
                    </li>
                    <li>
                        <strong>사원리스트</strong>
                        <div>
                            {groupTeam?.userList?.map((userList) => (
                                <span key={userList.userCode}>{userList?.userName}</span>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>
        )}
        {showDeptInfo && (
            <div className="group_department_info_wrap ">
                <ul className="group_team_dept_info">
                    <li>
                        <strong>부서명</strong>
                        <span>{groupDept?.deptName}</span>
                    </li>
                    <li>
                        <strong>팀리스트</strong>
                        <div>
                            {groupDept?.teamList?.map((teamList) => (
                                <span key={teamList.teamCode}>{teamList?.teamName}</span>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>
        )}
    </>
    )
    }

    export default GroupDetail;