import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

function ProgressChart({ todoCount, inProgressCount, doneCount }) {
  const data = {
      labels: ['To Do', 'In Progress', 'Done'],
      datasets: [
          {
              data: [todoCount, inProgressCount, doneCount],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
              ],
          },
      ],
  };

  const options = {
      plugins: {
          legend: {
              position: 'right', // 레전드를 차트의 오른쪽에 위치시킵니다.
          },
      },
  };

  return <Doughnut data={data} options={options} />;
}
export default ProgressChart;