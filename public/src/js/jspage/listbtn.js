'use strict'; { // ボタン

  // List枠
  const lists = document.querySelector('.dom1 > ol');

  // リスト本文
  const createList = (e) => {
    const li = `<li>
  <span class="td">${e}</span>
  <span class="delete">[x]</span>
  </li>`;
    lists.innerHTML += li;
  };

  // btns
  // class変更
  document.querySelector('.btn1').addEventListener('click', () => {
    // テキスト変更
    const english = document.querySelector('#target');
    english.classList.toggle('targetcolor');
    // className属性: 既存のclass属性が書き換わる。
    // classList属性: class属性を追加。こちらの方が便利。
    english.textContent = english.dataset.translation; // data-
    // todo.textContent = todo.dataset.vani; // idとセットで使用

    document.querySelectorAll('li').forEach((q, index) => {
      q.textContent = `${index}番目です!`;
    });
    document.querySelectorAll('li')[1].textContent = "change!";
  });

  // 付与
  document.querySelector('.btn2').addEventListener('click', () => {
    const li = document.createElement('li'); // 1.li要素を作る
    li.textContent = 'Add!'; // 2.テキストかく
    document.querySelector('ol').appendChild(li); // 3.末尾に追加
  });

  // [Add] ボタン
  // const add = document.querySelector('.add');
  // add.classList.add('btn');
  // add.textContent = 'TV';
  // add.addEventListener('click', () => {
  //   new Todolist('TVを見る');
  //   countNone();
  // });
  // [save]ボタン
  // if (e.target.classList.contains('save')) {
  //   const save = document.getElementById('stocks');
  //   save.innerHTML += `<li class="list">${e.target.previousElementSibling.previousElementSibling.textContent}</li>`;
  // }
  // 複製挿入
  document.querySelector('.btn3').addEventListener('click', () => {
    const li1 = document.querySelectorAll('li')[0];
    const copy = li1.cloneNode(true); // 複製
    const ol = document.querySelector('ol'); // 親要素の取得
    const li2 = document.querySelectorAll('li')[2];
    ol.insertBefore(copy, li2); // __番目要素の前に挿入
  });
  // 削除
  document.querySelector('.btn4').addEventListener('click', () => {
    const li = document.querySelectorAll('li');
    // li.remove(); // 方法その1 ※古いブラウザでは使えない
    lists.removeChild(li[1]); // その2
  });
  // （年齢）選択
  document.querySelector('.btn6').addEventListener('click', () => {
    const li = document.createElement('li');
    const color = document.querySelector('select');
    li.textContent = `${color.value}は${color.selectedIndex}番目`; // 選択値、インデックス番号で値をセット
    lists.appendChild(li);
  });
  // 年齢選択をドロップダウン
  // iだとエラーが出たので、jでやった
  let age = document.getElementById("age");
  for (let j = 15; j <= 50; j++) {
    let option = document.createElement("option");
    // option.value = j;
    option.innerText = j + '歳'; // テキスト
    age.appendChild(option);
  }

  // ラジオボタン
  document.querySelector('.btn7').addEventListener('click', () => {
    const radio = document.querySelectorAll('.btns3 > input'); // selectのようにまとまっていないから全て取得
    let select; // 選択された値を保持 変数
    radio.forEach(color => {
      if (color.checked) { // 選択されていれば
        select = color.value; // その値を再代入する。
      }
    });
    const li = document.createElement('li');
    li.textContent = select; // 値をセット
    document.querySelector('ol').appendChild(li);
  });

  // チェック
  // document.querySelector('.button8').addEventListener('click', () => {
  //   const li = document.createElement('li');
  //   const colors = document.querySelectorAll('input');
  //   const selectedColors = []; // 複数選択可なので選択された値は配列で保持
  //   colors.forEach(color => {
  //     if (color.checked === true) {
  //       selectedColors.push(color.value); // 追加する（再代入ではない）。
  //     }
  //   });
  //   li.textContent = selectedColors.join('と'); // join
  //   document.querySelector('ol').appendChild(li);
  // });

  // 入力追加
  // document.querySelector('.button5').addEventListener('click', () => {
  //   const li = document.createElement('li');
  //   const text = document.querySelector('input');
  //   if (text.value) { // 入力欄があれば
  //     li.textContent = text.value; // value属性で入力された値をセット
  //     document.querySelector('ol').appendChild(li);
  //     // 入力後の入力欄は、
  //     text.value = ''; // 空
  //     text.focus(); // フォーカス
  //   }
  // });

  // リスト斜線
  // ul (e.currentTarget)
  lists.addEventListener('click', e => {
    if (e.target.nodeName === 'LI') { // nodeNameがliならば
      e.target.classList.toggle('done');
    }
    // labelを押した時
    if (e.target.classList.contains('list')) {
      e.target.classList.toggle('done');
    }
  });


  // TextForm
  const form = document.querySelector('.dom1 > form');
  const input = document.querySelector('form > input');

  form.addEventListener('submit', e => {
    e.preventDefault(); // ページ遷移をキャンセル
    const task = input.value; // 値が
    if (task) { // あれば追加
      createList(task);
      input.value = ''; // 空にする。←taskは反応なし。。？
    }
  });

  // ソート（WEB参考）
  document.querySelector('.btn_sort').addEventListener('click', () => {
    // (1) Nodeリストを取得
    let exid = document.getElementById("test");
    let list = exid.getElementsByTagName("li");
    // (2) 配列を得る
    let myArray = Array.prototype.slice.call(list);
    // (3) 配列をソート
    myArray.sort(function (a, b) {
      if (a.textContent > b.textContent)
        return 1;
      else if (a.textContent < b.textContent)
        return -1;
      return 0;
    }
    );
    // (4) 新しい順番を DOM ツリーに反映
    for (let i = 0; i < myArray.length; i++) {
      // 末尾に追加
      exid.appendChild(myArray[i]);
    }
  });

  // 配列の重複チェック
  let array = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5]
  // 重複を削除した配列（コールバック関数）
  // self.indexOf(x)はarrayの中でその要素が現れる最初のindexを返します。 つまり、その要素の前に同じ値の要素がある場合にfalseになる。
  let result = array.filter(function (x, i, self) { // (要素, 要素のindex, array自身)
    return self.indexOf(x) === i;
  });
  console.log(result); // [ 0, 1, 2, 3, 4, 5 ]


  // 指定したh2要素
  function update() {
    document.querySelectorAll('h2')[1].textContent = 'SetTime!';
  }
  setTimeout(update, 1500); // 自動切り替え

}
