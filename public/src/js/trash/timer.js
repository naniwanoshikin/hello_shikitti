'use strict'; {

const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

let startTime;
let timeoutId;
let elapsedTime = 0; // タイマーが走っていた時間

function countUp() {
  // 経過時間：1970年（現在時刻 - 開始時刻）
  const d = new Date(Date.now() - startTime + elapsedTime);
  const m = String(d.getMinutes()).padStart(2, '0'); // 必ず文字列
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0'); // ミリ秒 1000/s
  timer.textContent = `${m}:${s}.${ms}`;

  // 10mm秒後毎に呼び出す（そのたびにtimeoutIdが上書きされる）
  timeoutId = setTimeout(() => {
    countUp();
  }, 10);
}

// 機能
start.addEventListener('click', () => {
  if (start.classList.contains('inactive')) {
    return;
  }
  stateRunning();
  startTime = Date.now(); // 経過時間をリセット
  countUp();
});
stop.addEventListener('click', () => {
  if (stop.classList.contains('inactive')) {
    return;
  }
  stateStopped();
  // （ボタンを押したその時のtimeoutIdに対して）タイマーを止める
  clearTimeout(timeoutId); // 次のsettimeOutをキャンセル
  // タイマーが走っていた時間の合計（stop押した時刻 - start押した時刻）
  elapsedTime += Date.now() - startTime;
});
reset.addEventListener('click', () => {
  if (reset.classList.contains('inactive')) {
    return;
  }
  stateInitial();
  timer.textContent = `00:00.000`;
  elapsedTime = 0;
});

// #7, 8 初期状態
stateInitial();
function stateInitial() {
  start.classList.remove('inactive'); // 押せる
  stop.classList.add('inactive'); // 押せない
  reset.classList.add('inactive');
}
function stateRunning() {
  start.classList.add('inactive');
  stop.classList.remove('inactive');
  reset.classList.add('inactive');
}
function stateStopped() {
  start.classList.remove('inactive');
  stop.classList.add('inactive');
  reset.classList.remove('inactive');
}

}