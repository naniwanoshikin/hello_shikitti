'use strict'; // クイズ

{
  const randolt = document.getElementById('randolt');
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p'); // 結果

  // (0番目を正解とする)
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
  function checkAnswer(li) {
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
    }

    btn.classList.remove('disabled');
  }


  // 初期状態の画面をセット
  function setQuiz() {
    isAnswered = false;

    // C画像
    randolt.innerHTML = `<img src="img/${quizSet[currentNum].q}" width="${c_width}px">`;

    // 回答済の選択肢を消す
    while (choices.firstChild) {
      choices.firstChild.remove(choices.firstChild);
    }

    // 選択肢（シャッフル済）
    const shuflChoices = shuffle([...quizSet[currentNum].c]);
    shuflChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
        li.textContent = "";
      });
      choices.appendChild(li); // 選択肢を詰め替え
    });

    if (currentNum === quizSet.length - 1) { // 最終問題
      btn.textContent = 'Show Result';
    }
  }

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
      setQuiz();
    }
  });
}
