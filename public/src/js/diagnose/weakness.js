'use strict'; // 神経衰弱 (dotinstall_古いJSの書き方?)

{

  let pairs = 2; // ペア数 * 2 = カード枚数
  let cards = []; // カードのペア格納

  // めくったカード
  let flipCount = 0; // めくった回数
  let firstCard = null;  // 1枚目のカード
  let secondCard = null; // 2枚目のカード

  let startTime; // めくった時刻
  let isRunning = false; // タイマーが動いているかどうか
  let correctCount = 0; // 揃えたペア数
  let timeoutId;

  // 初期状態
  function init() {
    let i; // 1 - ?番
    let card; // 取り出すカード
    for (i = 1; i <= pairs; i++) { // ペア追加
      cards.push(createCard(i));
      cards.push(createCard(i));
    }
    while (cards.length) {
      card = cards.splice(Math.floor(Math.random() * cards.length), 1)[0];
      document.getElementById('stage').appendChild(card);
    }
    // document.getElementById('restart').addEventListener('click', e => {
    //   e.preventDefault(); // 追加（なぜ効かない？）
    // });
  }
  init();


  // カード生成
  function createCard(num) { // 番号
    let container; // <div class="card-container">  -> 子要素がcard
    let card; // <div class="card"> -> 子要素がinner
    let inner; // front, back
    inner = '<div class="card-front">' + num + '</div><div class="card-back">?</div>';
    card = document.createElement('div');
    card.innerHTML = inner;
    card.className = 'card';
    card.addEventListener('click', function () {
      flipCard(this); // thisって番号のこと??
      if (isRunning === true) { // すでにタイマーが走っていれば
        return;
      }
      isRunning = true;
      startTime = Date.now(); // 時刻
      runTimer();
      document.getElementById('restart').className = ''; // ボタン
    })
    container = document.createElement('div');
    container.className = 'card-container';
    container.appendChild(card);
    return container;
  }

  // カードをめくる
  function flipCard(card) {
    if (firstCard !== null && secondCard !== null) {
      return; // めくれなくする
    }
    // 同じカードのクリックを防止（ここわかんない。。）
    if (card.className.indexOf('open') !== -1) { // openがあれば
      return;
    }
    card.className = 'card open';
    flipCount++;
    if (flipCount % 2 === 1) {
      firstCard = card;
    } else {
      secondCard = card;
      secondCard.addEventListener('transitionend', check);
    }
  }

  // 正誤判定
  function check() {
    if ( // ペアが揃わなければ、
      firstCard.children[0].textContent !==
      secondCard.children[0].textContent
    ) {
      firstCard.className = 'card'; // 閉じる
      secondCard.className = 'card';
    } else { // 揃ったら、
      correctCount++;
      if (correctCount === pairs) {
        clearTimeout(timeoutId); // タイマーを止める
      }
    }
    // 判定後
    secondCard.removeEventListener('transitionend', check); // 解除
    firstCard = null;
    secondCard = null;
  }

  // タイマーを走らせる
  function runTimer() {
    document.getElementById('score').textContent = ((Date.now() - startTime) / 1000).toFixed(2);
    timeoutId = setTimeout(function () {
      runTimer();
    }, 10); // 呼び出し間隔
  }

}