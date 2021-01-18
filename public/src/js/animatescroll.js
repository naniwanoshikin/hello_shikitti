'use strict'; {
  // React.jsの中身には対応していない？

  // option
  // 1
  let node = {
    duration: 900, // アニメーションの長さ
    distance: '20%', // 移動距離
    origin: 'right', // From
    opacity: 0.7, // 薄さ
    scale: 1.2, // 初期サイズ
    viewFactor: 0.7, // どれくらい見えたら実行するか 0-1
    interval: 800, // 出だしの遅さ
    rotate: {
      x: 90,
      y: 90,
      z: 50, // 正面周り
    },
    easing: 'ease-in-out',
  };
  // 2
  let imgSlide = {
    duration: 800,
    distance: '30%',
    origin: 'left',
    opacity: 0.7,
    scale: 1.5,
    interval: 400,
    rotate: {
      x: 70,
      y: 80,
      z: 30,
    },
  };
  // 3
  let slideUp = {
    duration: 900,
    distance: '20%',
    origin: 'left',
    opacity: 0.7,
    scale: 2,
    viewFactor: 0.6,
    delay: 10, // アニメーションの遅延
    rotate: {
      x: 50,
      y: 90,
      z: 90,
    },
  };

  // Node
  let node1 = document.querySelector('#face'); // 写真
  let nodeArray1 = [
    // document.querySelector('#root0'),
    document.querySelector('#root1'), // react
  ];

  // 実行（Node, Option）
  ScrollReveal().reveal(node1, node);
  ScrollReveal().reveal(nodeArray1, slideUp);

}
