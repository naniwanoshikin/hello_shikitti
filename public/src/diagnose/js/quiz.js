'use strict'; // クイズ

{
  const randolt = document.getElementById('randolt');
  // 質問
  // const question = document.getElementById('question');
  // 回答一覧 ul
  const choices = document.getElementById('choices');
  // 次へボタン
  const btn = document.getElementById('btn');
  // 結果
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p'); // 結果

  // c: 0番目を正解とする
  const patern = [
    { q: '1.png', c: ['↑', '→', '↓', '←'] },
    { q: '2.png', c: ['→', '↓', '←', '↑'] },
    { q: '3.png', c: ['↓', '←', '↑', '→'] },
    { q: '4.png', c: ['←', '↑', '→', '↓'] },
  ];
  const addNum = 2; // 追加問題数
  for (let i = 0; i < addNum; i++) {
    patern.push(patern[2]);
  }
  // console.log(patern.length); // 問題数

  const quizSet = shuffle(patern); // 出題順シャッフル


  let currentNum = 0; // 今何問目？
  let isAnswered; // 回答したか？ (true/false)
  // Cの大きさ(width)
  const max = 7;
  const min = 5;
  let c_width = Math.floor(Math.random() * (max + 1 - min)) + min


  // 配列を渡して、シャッフルした配列を返す。
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // 0 ~ i
      [arr[i], arr[j]] = [arr[j], arr[i]] // 入れ替え
    }
    return arr;
  }

  // 正誤判定（1問につき1度きり）
  function checkAnswer(li, shuffledChoices) {
    // trueならば
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      c_width--; // 難しくなる
    } else {
      li.classList.add('wrong');
      c_width++; // 簡単になる
      // console.log(quizSet[currentNum].c[0]); // → 正解
      // console.log(shuffledChoices); // 新しい配列
      // console.log(shuffledChoices.indexOf(quizSet[currentNum].c[0])); // 正解のindex
      // 正解に色をつける
      choices.children[shuffledChoices.indexOf(quizSet[currentNum].c[0])].classList.add('correct');
    }

    btn.classList.remove('disabled');
  }


  // 画面をセット
  function setQuiz() {
    isAnswered = false;

    // C画像
    randolt.innerHTML = `<img src="img/${quizSet[currentNum].q}" width="${c_width}px">`;

    // 回答済の選択肢を消す
    while (choices.firstChild) {
      choices.firstChild.remove(choices.firstChild);
    }

    // シャッフル済の選択肢 配列
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li, shuffledChoices);
      });
      choices.appendChild(li); // 選択肢を詰め替え
    });

    // 最終問題ならば
    if (currentNum === quizSet.length - 1) {
      btn.textContent = 'Show Result';
    }
  }

  // 初期設定
  setQuiz();


  // 次へ
  btn.addEventListener('click', () => {
    if (isAnswered) { // 回答済みならば
      btn.classList.add('disabled');
      console.log(c_width);
      // 最終問題ならば
      if (currentNum === quizSet.length - 1 || c_width === 0) {
        // 視力判定
        let sight;
        switch (c_width) {
          case 1:
          case 2:
            sight = '正常';
            break;
          case 3:
          case 4:
            sight = '普通';
            break;
          case 5:
          case 6:
            sight = 'ちょい近視';
            break;
          case 7:
          case 8:
            sight = '近視';
            break;
          default:
            sight = 'ひどい';
            break;
        }
        scoreLabel.textContent = `${sight}です`;
        result.classList.remove('hidden');
        return;
      }
      currentNum++;
      setQuiz(); // 次の設定
    }
  });
}
