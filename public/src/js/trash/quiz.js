'use strict';
{
  // 各idを定義し取得する
  const vimg = document.getElementById('vimg');
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const nextbtn = document.getElementById('nextbtn');
  const result = document.getElementById('result');
  // スコア表示（こちらの方が柔軟に表示可）
  const scoreLabel = document.querySelector('#result > p');

  // クイズデータ（シャッフル機能あり：関数の巻き上げ挙動）
  const quizSet = shuffle([
    { q: '<img src="img/↑.png">', c: ['水曜日', '木曜日', '土曜日', '土曜日'] },
    { q: '<img src="img/→.png">', c: ['パスタ', 'ドリンク', 'モーニング', '土曜日'] },
    { q: '<img src="img/↓.png">', c: ['白色', '青色', '茶色', '土曜日'] },
    // 正解はA0番目とする
    // {q: 'what is A?', c: ['A0', 'A1', 'A2']}, // 何このエラー？？
  ]);

  // 今何問目？
  let currentNum = 0;
  // 回答したか
  let isAnswered;
  // スコア
  let score = 0;


  // シャッフル 機能
  function shuffle(arr) {
    // 最後のindex番号（要素数 - 1）。１ずつ減らしていく。
    for (let i = arr.length - 1; i > 0; i--) {
      // 0からiまでのランダムな整数（インデックス番号）
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]] // 入れ替え
    }
    return arr;
  }

  // 選択ボタンおした時（正誤判定）
  function checkAnswer(li) {
    if (isAnswered) { // 回答済なら以降処理しない
      return;
    }
    if (li.textContent === quizSet[currentNum].c[0]) { // 正解すれば
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }
    isAnswered = true; // 回答したよ

    nextbtn.classList.remove('disabled'); // nextボタンが青色になる
  }

  // 画面表示
  function setQuiz() {
    isAnswered = false; // 未回答だよ
    // 画像表示
    vimg.textContent = quizSet[currentNum].q;

    // （問題文）
    question.textContent = quizSet[currentNum].q;

    while (choices.firstChild) { // 選択肢：最初の子要素を消す
      choices.firstChild.remove(choices.firstChild);
    }
    // （選択肢）
    // 大元の配列は変えたくない→引数に...スプレッド演算子により配列の値のコピーとする
    const shuflChoices = shuffle([...quizSet[currentNum].c]);
    // console.log(quizSet[currentNum].c); // 元の配列
    // console.log(...quizSet[currentNum].c); // 要素
    // console.log([...quizSet[currentNum].c]); // 大括弧による新しい配列

    // （選択肢）
    shuflChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice; // 新しい配列をli要素として表示

      // （正誤判定）クリックしたliの判定
      li.addEventListener('click', () => {
        checkAnswer(li);
      });

      // liをulに追加（設定を全部済ませてから追加してやるのがいい）
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length - 1) { // 最終問題にて
      nextbtn.textContent = 'Show Score';
    }
  }

  setQuiz(); // 初回の画面を表示。

  // （次の画面へいく時）
  nextbtn.addEventListener('click', () => {
    // if (nextbtn.classList.contains('disabled')) {
    //   return; // グレーなら以降は処理しない
    // }
    if (isAnswered) { // 回答したら
      nextbtn.classList.add('disabled');
      if (currentNum === quizSet.length - 1) { // 最終問題なら、
        scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
        result.classList.remove('hidden'); // 結果を表示。
      } else { // まだなら次の画面を表示。
        currentNum++;
        setQuiz();
      }
    }
  });

}
