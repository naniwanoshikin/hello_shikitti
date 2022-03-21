(function () { // 自己紹介 chart.js
  'use strict';

  // ラベル名
  const languages = [
    'HTMLCSS',
    'Sass',
    'JS',
    'git',
    'React',
    'PHP',
    'jQuery',
  ];

  // 値 {data, label, bgcolor, bordercolor, borderwidth}
  const skills = [
    [[55, 30, 30, 10, 20, 10, 30,], '2020.09', 'rgba(246, 255, 0, 0.1)', 'yellow', 1],
    [[60, 35, 40, 10, 30, 20, 30,], '2020.10', 'rgba(255, 160, 0, 0.3)', 'orange', 1],
    [[65, 50, 55, 20, 30, 25, 30,], '2020.11', 'rgba(50, 255, 50, 0.4)', 'green', 1],
    [[70, 55, 60, 30, 30, 25, 30,], '2020.12', 'rgba(178, 34, 34, 0.4)', 'red', 1],
    [[90, 85, 90, 80, 70, 50, 50,], '2021.09', 'rgba(0, 0, 255, 0)', 'blue', 0.5],
  ]

  // -> 配列にオブジェクトを入れる
  const skillchart = [];
  for (let i = 0; i < skills.length; i++) {
    skillchart[i] = {
      data: skills[i][0],
      label: skills[i][1],
      backgroundColor: skills[i][2],
      borderColor: skills[i][3],
      borderWidth: skills[i][4],
      pointRadius: 0,
    };
  }


  const data = {
    labels: languages,
    datasets: skillchart,
  };

  const options = {
    scale: {
      pointLabels: {
        fontSize: 14,
        fontColor: 'purple',
      },
      ticks: {
        beginAtZero: true,
        suggestedmax: 100,
        stepSize: 20,
        callback: function (value, index, values) {
          return value + '-';
        }
      }
    },
    title: {
      display: false,
      text: '言語',
      fontSize: 14,
    },
    animation: {
      duration: 0
    },
    legend: { // 判例
      position: 'bottom',
      labels: {
        fontSize: 16,
      }
    },
  };

  let ctx = document.getElementById('my_chart').getContext('2d');

  let myChart = new Chart(ctx, {
    type: 'radar',
    data: data,
    options: options,
  });

})();
