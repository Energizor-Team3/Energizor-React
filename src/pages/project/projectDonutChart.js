function projectDonutChart({ todo, inProgress, done }) {
    const total = todo + inProgress + done;
    const todoPercentage = (todo / total) * 100;
    const inProgressPercentage = (inProgress / total) * 100;
    const donePercentage = 100 - todoPercentage - inProgressPercentage; // 자동 계산
  
    // SVG 도넛 차트의 둘레 및 세그먼트 계산
    const radius = 36; // 반지름
    const strokeWidth = 12; // 선의 두께
    const circumference = 2 * Math.PI * radius;
  
    const todoOffset = circumference * ((100 - todoPercentage) / 100);
    const inProgressOffset = circumference * ((100 - todoPercentage - inProgressPercentage) / 100);
  
    return (
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="#eee" // 배경 원 색상
          strokeWidth={strokeWidth}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="red" // todo 색상
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={todoOffset}
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="green" // inProgress 색상
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={inProgressOffset}
        />
        {/* Done 세그먼트는 자동으로 남은 부분을 차지합니다. */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="blue" // done 색상
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (donePercentage / 100)}
        />
      </svg>
    );
  }
  

  export default projectDonutChart;