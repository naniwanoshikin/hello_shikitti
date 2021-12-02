'use strict'; // 数字タッチゲーム
// Panel: li要素
// Board: ul要素
// Game: ゲーム全体に関する処理
{
  class Panel {
    constructor(game) {
      this.game = game;
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
      // console.log(this);
    }
    getEl() {
      return this.el;
    }
    activate(num) { // 色とその番号をつける
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }
    check() { // 今押すべきボタンを押した時
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) { // 合っていたら
        this.el.classList.add('pressed');
        this.game.addCurrentNum();
        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) { // 最後の数値でタイマーを止める
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }

  class Board {
    constructor(game) {
      this.game = game;
      this.panels = []; // liを配列にする
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(game));
      }
      this.setUp();
      // console.log(this);
    }
    setUp() { // パネルをボードに入れる
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        board.appendChild(panel.getEl());
      });
    }
    activate() {
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i); // 配置する数値たち
      }
      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num); // 数値をランダムに配置
      });
    }
  }

  class Game {
    constructor(level) { // (難易度)
      this.level = level;
      this.board = new Board(this); // 引数をPanelへ渡す

      this.currentNum = undefined; // 押すべきボタンの数値
      this.startTime = undefined; // スタート時間
      this.timeoutId = undefined; // タイマーを止めるid
      // console.log(this);

      const btn = document.getElementById('start_btn');
      btn.addEventListener('click', () => { // スタートボタン
        this.start();
      });
      this.setUp();
      // console.log(this); // Game {level: 3, board: Board, ...}
    }

    setUp() { // Boardの幅
      const container = document.getElementById('touch');
      const PANEL_WIDTH = 50;   // (css)
      const BOARD_PADDING = 10; // (css)
      container.style.width = PANEL_WIDTH * this.getLevel() + BOARD_PADDING * 2 + 'px';
    }
    start() {
      // すでにタイマーが走っていた場合
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }
      this.currentNum = 0;
      this.board.activate();
      this.startTime = Date.now();
      this.runTimer(); // タイマーを走らせる
    }
    runTimer() {
      const time = document.getElementById('time');
      time.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }
    addCurrentNum() {
      this.currentNum++;
    }
    getCurrentNum() {
      return this.currentNum;
    }
    getTimeoutId() {
      return this.timeoutId;
    }
    getLevel() {
      return this.level;
    }
  }
  new Game(3); // 難易度

}
