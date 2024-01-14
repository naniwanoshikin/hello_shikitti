'use strict'; // アニメーション
// React.jsには対応していない？
{
  // option
  // 1
  let prof_about = {
    duration: 700, // アニメーションの長さ
    distance: '10%', // 移動距離
    origin: 'right', // From
    opacity: 0.7, // 薄さ
    scale: 1.2, // 初期サイズ
    viewFactor: 0.6, // どれくらい見えたら実行するか 0-1
    interval: 800, // 出だしの遅さ
    easing: 'ease-in-out',
    rotate: {
      x: 90,
      y: 90,
      z: 50, // 正面周り
    },
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
  // nodeArray
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

  // 顔写真
  let prof_img = document.getElementById('face');
  let nodeArray1 = [
    // お問い合わせフォーム
    document.getElementById('root0'),
  ];

  // 実行（Node, Option）
  ScrollReveal().reveal(prof_img, prof_about);
  // ScrollReveal().reveal(nodeArray1, slideUp); // 出現しない可能性がある為コメントアウトしている

}
