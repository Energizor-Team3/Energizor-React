import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import {callSchedulesAPI } from '../../apis/CalendarAPICalls'
import scheduleReducer from '../../modules/ScheduleModule';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decodeJwt } from '../../utils/tokenUtils';
import moment from 'moment';
import MainCSS from './Main.module.css';


function MainPageCalendar() {
    const dispatch = useDispatch();
    
// 캘린더
    // 캘린더 일정 상태
    const schedule = useSelector(state => state.scheduleReducer);
    const [todaySchedules, setTodaySchedules] = useState([]);
   
    const [isSchedulesLoaded, setIsSchedulesLoaded] = useState(false);
    const [yesterdaySchedules, setYesterdaySchedules] = useState([]);
    const [tomorrowSchedules, setTomorrowSchedules] = useState([]);
    useEffect(() => {
      // API 호출을 통해 일정 가져오기
      const token = window.localStorage.getItem('accessToken');
      if (token) {
          const userCode = decodeJwt(token).userCode;
          dispatch(callSchedulesAPI({ userCode: userCode }));
          setIsSchedulesLoaded(true);
      }
  }, [dispatch]);

 

    // 오늘의 일정 필터링

    useEffect(() => {
      const today = moment().startOf('day');
      const yesterday = moment().subtract(1, 'days').startOf('day');
      const tomorrow = moment().add(1, 'days').startOf('day');

      const filteredTodaySchedules = filterSchedules(schedule.data, today, today);
      const filteredYesterdaySchedules = filterSchedules(schedule.data, yesterday, yesterday);
      const filteredTomorrowSchedules = filterSchedules(schedule.data, tomorrow, tomorrow);

      setTodaySchedules(filteredTodaySchedules);
      setYesterdaySchedules(filteredYesterdaySchedules);
      setTomorrowSchedules(filteredTomorrowSchedules);

      console.log("오늘의 날짜:", today.format("YYYY-MM-DD"));
      console.log("오늘의 일정:", filteredTodaySchedules);
      console.log("어제의 일정:", filteredYesterdaySchedules);
      console.log("내일의 일정:", filteredTomorrowSchedules);

      
  }, [schedule.data]);


      function filterSchedules(schedules, startOfDay, endOfDay) {
        return schedules.filter(({ schStartDate, schEndDate }) => {
            const startDate = moment([schStartDate[0], schStartDate[1] - 1, schStartDate[2], schStartDate[3], schStartDate[4]]);
            const endDate = schEndDate ? moment([schEndDate[0], schEndDate[1] - 1, schEndDate[2], schEndDate[3], schEndDate[4]]) : startDate.clone().endOf('day');
            
            return startDate.isSameOrBefore(endOfDay.endOf('day')) && endDate.isSameOrAfter(startOfDay.startOf('day'));
        });
    }

    // 현재 날짜와 요일
    const currentDate = moment().utcOffset('+0900');
    const dayNumber = currentDate.date();
    const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][currentDate.day()];
    // 어제의 날짜와 요일 계산
      const yesterday = moment().subtract(1, 'days');
      const yesterdayDayNumber = yesterday.date();
      const yesterdayDayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][yesterday.day()];

      // 내일의 날짜와 요일 계산
      const tomorrow = moment().add(1, 'days');
      const tomorrowDayNumber = tomorrow.date();
      const tomorrowDayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][tomorrow.day()];



    return (
        <>
        <div className={MainCSS.maincal} style={{ width: '500px' }} >
        <FullCalendar
            plugins={[dayGridPlugin]}
            contentHeight='400px'

        />
        </div>
        <h1>일정</h1>
        <div className={MainCSS.schedulezone}>
            {/* 어제  일정  */}
        <div className={MainCSS.yesterdayschcon}>
              <div className={MainCSS.dayzone}  >
                <div className={MainCSS.daynumber} style={{ marginLeft:'-5px'}}>{yesterdayDayNumber}</div>
                <div className={MainCSS.dayweek}  style={{ marginLeft:'-5px'}}>{yesterdayDayOfWeek}요일</div>
              </div>
              <div className={MainCSS.separator}></div>
              <div className={MainCSS.schzone}    > 
          
          {yesterdaySchedules.length > 0 ? (
              yesterdaySchedules.map((schedule) => (
                  <div className={MainCSS.schcon} key={schedule.schNo}>
                      <div className={MainCSS.schname}>
                          {schedule.schTitle}
                      </div>
                      <div className={MainCSS.schdate}>
                          {moment(schedule.schStartDate).subtract(1, 'months').format('MM월 DD일 HH:mm')}
                          {schedule.schEndDate && ` ~ ${moment(schedule.schEndDate).subtract(1, 'months').format('MM월 DD일 HH:mm')}`}
                      </div>
                  </div>
              ))
          ) : (
              <div className={MainCSS.noschedule}  >어제의 일정이 없습니다.</div>
          )}</div>
         </div>
         {/* 오늘  일정  */}
        <div className={MainCSS.todayschcon}>
            <div className={MainCSS.dayzone} style={{ borderLeft: '5px solid #94a9ff', backgroundColor: '#F2F6FF' }}>
                <div className={MainCSS.daynumber} style={{ marginLeft:'-5px'}}>{dayNumber}</div>
                <div className={MainCSS.dayweek}  style={{ marginLeft:'-5px'}}>{dayOfWeek}요일</div>
            </div>
            <div className={MainCSS.separator}></div>
            <div className={MainCSS.schzone}  style={{ backgroundColor:'#F2F6FF'}}> 
                {todaySchedules.length > 0 ? (
                    todaySchedules.map((schedule) => (
                        <div className={MainCSS.schcon} key={schedule.schNo}>
                            <div className={MainCSS.schname}>
                                {schedule.schTitle}
                            </div>
                            <div className={MainCSS.schdate}>
                                {moment(schedule.schStartDate).subtract(1, 'months').format('MM월 DD일 HH:mm')}
                                {schedule.schEndDate && ` ~ ${moment(schedule.schEndDate).subtract(1, 'months').format('MM월 DD일 HH:mm')}`}
                            </div>
                        </div>
                    ))
                ) : (
                    <div  className={MainCSS.noschedule}  >오늘의 일정이 없습니다.</div>
                )}</div>
        </div>
  {/* 내일  일정   */}
        <div className={MainCSS.tomorrowschcon}>
            <div className={MainCSS.dayzone} >
                <div className={MainCSS.daynumber} style={{ marginLeft:'-5px'}}>{tomorrowDayNumber}</div>
                <div className={MainCSS.dayweek}  style={{ marginLeft:'-5px'}}>{tomorrowDayOfWeek}요일</div>
            </div>
            <div className={MainCSS.separator}></div>
            <div className={MainCSS.schzone}  > 
          
            {tomorrowSchedules.length > 0 ? (
                tomorrowSchedules.map((schedule) => (
                    <div className={MainCSS.schcon} key={schedule.schNo}>
                        <div className={MainCSS.schname}>
                            {schedule.schTitle}
                        </div>
                        <div className={MainCSS.schdate}>
                          {moment(schedule.schStartDate).subtract(1, 'months').format('MM월 DD일 HH:mm')}
                          {schedule.schEndDate && ` ~ ${moment(schedule.schEndDate).subtract(1, 'months').format('MM월 DD일 HH:mm')}`}
                      </div>
                    </div>
                ))
            ) : (
                <div className={MainCSS.noschedule}  >내일의 일정이 없습니다.</div>
            )}</div>
        </div>
        </div>
        </>
    );
}
export default MainPageCalendar;