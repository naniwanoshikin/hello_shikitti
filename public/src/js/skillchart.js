(function () {
  'use strict';

  let type = 'radar';
  // 値
  let data = {
    labels: ['HTML CSS', 'Sass', 'JScript', 'git','React', 'PHP', 'jQuery',],
    datasets: [
      {
        label: '@ 2020.9',
        data: [55, 30, 30, 5, 20, 10, 30,],
        backgroundColor: 'rgba(246, 255, 0, 0.2)',
        borderColor: 'yellow',
        borderWidth: 1,
        // fill: false,
        // lineTension: 0,
        // pointStyle: 'rect',
        pointRadius: 0,
      },
      {
        label: '@ 2020.10',
        data: [60, 35, 40, 10, 30, 20, 30,],
        backgroundColor: 'rgba(0, 255, 10, 0.2)',
        borderColor: 'green',
        borderWidth: 1,
        // fill: false,
        // lineTension: 0,
        // pointStyle: 'rect',
        pointRadius: 0,
      },
      {
        label: '@ 2020.11',
        data: [65, 50, 55, 20, 30, 25, 30,],
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'red',
        borderWidth: 1,
        // fill: false,
        // lineTension: 0,
        // pointStyle: 'rect',
        pointRadius: 0,
      },
      {
        label: '@ 2020.12',
        data: [70, 55, 60, 30, 30, 25, 30,],
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'orange',
        borderWidth: 1,
        // fill: false,
        // lineTension: 0,
        // pointStyle: 'rect',
        pointRadius: 0,
      },
      {
        label: '@ 2021.9',
        data: [90, 85, 90, 80, 70, 50, 50,],
        backgroundColor: 'rgba(0, 0, 255, 0)',
        borderColor: 'blue',
        borderWidth: 0.5,
        // pointStyle: 'triangle',
        pointRadius: 0,
      }
    ]
  };
  // 設定
  let options = {
    scale: {
      pointLabels: { // １つ１つ
        fontSize: 14,
        fontColor: 'purple',
      },
      // yAxes: [{
      ticks: {
        beginAtZero: true, // 自動最小
        max: 100, // 最大
        // suggestedmax: 100, // 自動最大
        stepSize: 20, // 刻み
        // fontSize: 30,
        callback: function (value, index, values) {
          return value + '-';
        }
      }
      // }]
    },
    title: {
      display: false,
      text: '言語',
      fontSize: 14,
    },
    animation: {
      // duration: 0
    },
    legend: { // 判例
      // display: false // なくす
      position: 'bottom',
      labels: {
        fontSize: 16,
      }
    },
    // responsive: true, // グラフサイズ用（理解できん、、
    // maintainAspectRatio: false, // （理解できん、、
  };
  let ctx = document.getElementById('my_chart').getContext('2d');

  let myChart = new Chart(ctx, {
    type: type,
    data: data,
    options: options,
  });

})();
