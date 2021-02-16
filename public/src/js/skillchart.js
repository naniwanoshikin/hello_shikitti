(function () {
  'use strict';

  // ラベル名
  const languages = ['Html Css', 'Sass', 'JScript', 'git', 'React', 'PHP', 'jQuery',];
  // 値
  const skills = [
    { data: [55, 30, 30, 10, 20, 10, 30,], label: "2020.09", bgc: "rgba(246, 255, 0, 0.1)", bc: "yellow", bw: 1 },
    { data: [60, 35, 40, 10, 30, 20, 30,], label: "2020.10", bgc: "rgba(255, 160, 0, 0.3)", bc: "orange", bw: 1 },
    { data: [65, 50, 55, 20, 30, 25, 30,], label: "2020.11", bgc: "rgba(50, 255, 50, 0.4)", bc: "green", bw: 1 },
    { data: [70, 55, 60, 30, 30, 25, 30,], label: "2020.12", bgc: "rgba(178, 34, 34, 0.4)", bc: "red", bw: 1 },
    { data: [90, 85, 90, 80, 70, 50, 50,], label: "2021.09", bgc: "rgba(0, 0, 255, 0)", bc: "blue", bw: 0.5 },
  ]

  const data = {
    labels: languages,
    datasets: [
      {
        label: skills[0].label,
        data: skills[0].data,
        backgroundColor: skills[0].bgc,
        borderColor: skills[0].bc,
        borderWidth: skills[0].bw,
        pointRadius: 0,
        // fill: false,
        // lineTension: 0,
        // pointStyle: 'rect',
      },
      {
        label: skills[1].label,
        data: skills[1].data,
        backgroundColor: skills[1].bgc,
        borderColor: skills[1].bc,
        borderWidth: skills[1].bw,
        pointRadius: 0,
      },
      {
        label: skills[2].label,
        data: skills[2].data,
        backgroundColor: skills[2].bgc,
        borderColor: skills[2].bc,
        borderWidth: skills[2].bw,
        pointRadius: 0,
      },
      {
        label: skills[3].label,
        data: skills[3].data,
        backgroundColor: skills[3].bgc,
        borderColor: skills[3].bc,
        borderWidth: skills[3].bw,
        pointRadius: 0,
      },
      {
        label: skills[4].label,
        data: skills[4].data,
        backgroundColor: skills[4].bgc,
        borderColor: skills[4].bc,
        borderWidth: skills[4].bw,
        pointRadius: 0,
        // pointStyle: 'triangle',
      }
    ]
  };
  // 設定
  const options = {
    scale: {
      pointLabels: { // ラベル
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
    // グラフサイズ用
    // maintainAspectRatio: false, // heightのみ指定
    // responsive: true, // width指定
  };
  let ctx = document.getElementById('my_chart').getContext('2d');

  let myChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options,
  });

})();
