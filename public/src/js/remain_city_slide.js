'use strict'; // 地域部 スライド

{
  const next = document.getElementById('next');
  const prev = document.getElementById('prev');
  const ul_pic = document.querySelector('.city ul.pic'); // 写真
  const ul_des = document.querySelector('.city ul.desc'); // 説明
  const slides = ul_pic.children; // li
  const descs = ul_des.children;; // li
  const dots = []; // 丸ボタン
  let currentIndex = 0; // 表示中の画像番号

  // 説明文の表示状態
  function setDesc() {
    for (let i = 0; i < slides.length; i++) {
      descs[i].classList.add('hidden'); // 全て非表示
    }
    descs[currentIndex].classList.remove('hidden'); // 表示
  }

  // スライドボタンの表示状態
  function updateButtons() {
    prev.classList.remove('hidden'); // 表示
    next.classList.remove('hidden');
    if (currentIndex === 0) {
      prev.classList.add('hidden'); // 隠す
    }
    if (currentIndex === slides.length - 1) {
      next.classList.add('hidden');
    }
  }
  // スライドの移動
  function moveSlides() {
    const slideWidth = slides[0].getBoundingClientRect().width; //幅
    ul_pic.style.transform = // 移動距離
      `translateX(${-1 * slideWidth * currentIndex}px)`;
  }

  // 丸ボタン生成
  function setupDots() {
    for (let i = 0; i < slides.length; i++) {
      const button = document.createElement('button');
      button.addEventListener('click', () => {
        currentIndex = i;
        updateDots();
        updateButtons();
        moveSlides();
        setDesc();
      });
      dots.push(button);
      document.querySelector('.city > nav').appendChild(button);
    }
    dots[0].classList.add('current');
  }

  // ボタンの色
  function updateDots() {
    dots.forEach(dot => dot.classList.remove('current')); // 白
    dots[currentIndex].classList.add('current'); // 押したら黒
  }

  updateButtons();
  setupDots();
  setDesc();


  // 次へ
  next.addEventListener('click', () => {
    currentIndex++;
    updateButtons();
    moveSlides();
    updateDots();
    setDesc();
  });

  // 戻る
  prev.addEventListener('click', () => {
    currentIndex--;
    updateButtons();
    moveSlides();
    updateDots();
    setDesc();
  });

  // ウィンドウの大きさが変わったら、
  window.addEventListener('resize', () => {
    moveSlides(); // 画像幅ずれをなくす
  });
}
