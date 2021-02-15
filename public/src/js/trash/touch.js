'use strict'; { // 数字タッチゲーム #7〜

  class Panel { // li要素
    constructor(game) { // #16 gameプロパティを介す
      this.game = game; // #16 プロパティを修正（Gameメソッドへ）
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
    }
    getEl() {
      return this.el;
    }
    activate(num) { // #9 startボタン作動（色と文字を出す）
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }
    check() { // #11 panelボタン textContentで文字列になる
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) { // 合っていたら
        this.el.classList.add('pressed');
        this.game.addCurrentNum();
        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }

  class Board { // ul要素
    constructor(game) { // #16 game
      this.game = game;
      this.panels = []; // liを配列にする
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(game));
      }
      this.setUp();
    }
    setUp() { // #8 liをulに入れる
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        board.appendChild(panel.getEl()); // カプセル化
      });
    }
    activate() { // #9 Panelメソッド用
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i);
      }
      this.panels.forEach(panel => {
        // #10 spliceの返り値は配列
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  class Game { // #14 クラス化
    constructor(level) {
      this.level = level;
      this.board = new Board(this);
      this.currentNum = undefined; // #11 押し込むべき数値
      this.startTime = undefined; // #12 タイマー
      this.timeoutId = undefined;
      // console.log(this); // 「インスタンスのプロパティ」を出力

      const btn = document.getElementById('touchbtn');
      // #9 スタートボタン
      btn.addEventListener('click', () => {
        this.start();
      });
      this.setUp();
    } // constructor

    setUp() { // #18 CSSメソッド
      const touch = document.getElementById('touch');
      const pwidth = 50;
      const bp = 10;
      touch.style.width = pwidth * this.getLevel() + bp * 2 + 'px';
    }
    start() {
      // #13 すでにタイマーが走っていたら、そのtimeoutIdを止める
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }
      this.currentNum = 0;
      this.board.activate(); // Boardメソッドへ
      this.startTime = Date.now();
      this.runTimer(); // #12 走らせる
    }
    runTimer() {
      const time = document.getElementById('time');
      time.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }
    // #16 Panelクラスにあった変数たちを管理するのに持ってきた
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
      return this.level; // #17 パネルの数（1, 4, 9など）
    }
  }
  new Game(4); // #17 引数で難易度を決める

}
