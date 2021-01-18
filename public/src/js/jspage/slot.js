'use strict'; {

class Panel { // #6
  constructor() {
    const sec = document.createElement('section');
    sec.classList.add('panel');
    // this（インスタンス）はclass内のみ（外のメソッドから呼び出す）
    this.img = document.createElement('img');
    this.img.src = this.getImg();
    // this.timeoutId = undefined; // なくても動作する
    this.stop = document.createElement('div');
    this.stop.textContent = 'STOP';
    this.stop.classList.add('stop', 'inactive');
    // #9 STOPボタン
    this.stop.addEventListener('click', () => {
      if (this.stop.classList.contains('inactive')) {
        return;
      }
      this.stop.classList.add('inactive');
      clearTimeout(this.timeoutId); // idを指定する
      panelsLeft--;
      if (panelsLeft === 0) {
        check();
        spin.classList.remove('inactive');
        panelsLeft = 3; // 代入
        num++;
      }
    });
    // タグ挿入
    sec.appendChild(this.img);
    sec.appendChild(this.stop);
    const main = document.querySelector('.mainslot');
    main.appendChild(sec);

  } // constructor ここまで

  // return 画像3つのどれか
  getImg() {
    const images = [
      '../src/img/jspage/seven.png',
      '../src/img/jspage/bell.png',
      '../src/img/jspage/cherry.png',
    ];
    return images[Math.floor(Math.random() * images.length)];
  }
  spin() { // class外より
    this.img.src = this.getImg();
    // #9 return id
    this.timeoutId = setTimeout(() => {
      this.spin();
    }, 500);
  }
  // #11 return boolean ここが重要
  isUnmatched(a, b) { // マッチしなければtrue
    return this.img.src !== a.img.src && this.img.src !== b.img.src;
  }
  unmatch() {// class外より
    this.img.classList.add('unmatched');
  }
  activate() { // #13 SPINボタンによるリセット機能 class外より
    this.img.classList.remove('unmatched');
    this.stop.classList.remove('inactive');
  }
} // class終了

let panelsLeft = 3;

// 得点
let points = 0;
const point = document.getElementById('points')
// 試行回数
let num = 1;

function check() { // #10 STOPボタンの機能
  if (panels[0].isUnmatched(panels[1], panels[2])) {
    panels[0].unmatch(); // class
  }
  if (panels[1].isUnmatched(panels[0], panels[2])) {
    panels[1].unmatch();
  }
  if (panels[2].isUnmatched(panels[0], panels[1])) {
    panels[2].unmatch();
  }
  if (panels[0].img.src === panels[1].img.src && panels[1].img.src === panels[2].img.src) {
    points++;
  }
  point.textContent = points + '点 ' + num + '回' + ' 確率 ' + (points/num*100).toFixed(1) + '%'; // 得点 ここ自作。
}

const panels = [ // #7 インスタンス
  new Panel(),
  new Panel(),
  new Panel(),
];

// #8 SPINNNボタン
const spin = document.getElementById('spin');
spin.addEventListener('click', () => {
  if (spin.classList.contains('inactive')) {
    return; // #12
  }
  spin.classList.add('inactive');
  panels.forEach(p => {
    p.spin(); // classメソッド
    p.activate(); // classメソッド
  });
});


}
