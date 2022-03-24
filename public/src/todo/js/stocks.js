'use strict';
// {
// タブ
const lies = document.querySelectorAll('.tab > li');
// <h3>
const title1 = lies[0].children[0]; // 1つ目 h3
const title2 = lies[1].children[0]; // 2つ目 h3
// <ul>
const todos1 = document.getElementById('todos1');
const todos2 = document.getElementById('todos2');
// 内容 <div>
const content1 = document.getElementById('content_td1');

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// ########## ローカルストレージ ###########
// 使用出来るかチェック
if (!localStorage) {
  alert("お使いのブラウザはlocalstorageに対応してません");
}
// 初期化処理
(function () {
  // ローカルストレージに格納されている値を「取得」しリストを生成
  for (let key in localStorage) {
    let html = localStorage.getItem(key);
    if (html) {
      todos2.innerHTML += localStorage.getItem(key);
    }
  }
})();
function saveLocalStorage(task, html) {
  if (html) { // nullは保存しない
    // localStorage は、0 から始まる
    localStorage.setItem(task, html);
    return;
  }
  return;
};
function deleteLocalStorage(task) {
  localStorage.removeItem(task); // key
  return;
};

// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// エスケープ機能 <h1>など → addform
function escape(string) {
  return string.replace(/[<>]/g, function (aaa) {
    return {
      '<': '&lt;',
      '>': '&gt;',
    }[aaa]
  });
}
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// コンテント
// <form>
const messageform = document.getElementById('messageform');
const searchform = document.getElementById('searchform');
const addform = document.getElementById('addform');
const checkform = document.getElementById('checkform');
// <input>
const minput = messageform.children[0];
const addinput = addform.children[0];
// <i> color用
const filter = document.querySelector('.fa-filter');
const save = document.querySelector('.fa-save');
const purge = document.querySelector('.fa-trash-alt');
const update = document.querySelector('.fa-pen-alt');
const add = document.querySelector('.fa-user-plus');
const check = document.querySelector('.fa-user-check');
const sort = document.querySelector('.fa-sort-alpha-down');
const index = document.querySelector('.fa-undo-alt');
// <button>
const login = document.getElementById('login');
const logout = document.getElementById('logout');



// 初期値
// <form>非表示
[addform, checkform, searchform].forEach(el => {
  el.classList.add('hidden');
});
// アクティブ表示
title1.parentElement.classList.add('active'); // h3 p
content1.classList.add('active'); // div.content

// <form>表示、<i>色
add.addEventListener('click', () => {
  addform.classList.toggle('hidden');
  add.classList.toggle('i5');
});
filter.addEventListener('click', () => {
  searchform.classList.toggle('hidden');
  filter.classList.toggle('i6');
});
check.addEventListener('click', () => {
  checkform.classList.toggle('hidden');
  check.classList.toggle('i6');
});

// (2/3) + color + Nothing
class List {
  constructor(num) {
    this.textColor(num);
    this.none(num);
  }
  textColor(i) {
    // todos 残り（取消線なし）
    const left = document.querySelectorAll(`#todos${i} > li:not(.filtered)> label:not(.done)`);
    // todos 全体
    const all = document.querySelectorAll(`#todos${i} > li:not(.filtered)`);
    // (2/3) タグ <p>
    const count = lies[i - 1].children[1];
    // (2/3) テキスト
    count.textContent = '( ' + left.length + ' / ' + all.length + ' ) ';
    // (2/3) color
    if (left.length === 0) {
      count.classList.remove('i10');
    } else {
      count.classList.add('i10');
    }
  }
  // Nothing表示
  none(i) {
    const to = document.getElementById(`todos${i}`); // <ul>
    const p = document.querySelector(`#todos${i} > p`); // <p>Nothing<p>
    const all = document.querySelectorAll(`#todos${i} > li:not(.filtered)`);
    if (all.length === 0 && !p) {
      // console.log('Nothing to do!');
      to.innerHTML += `<p>Nothing to do!</p>`;
    } else if (all.length > 0 && p) {
      // console.log('Thing to do!');
      to.removeChild(p); // <p>削除
    }
    // console.log(todos1.childElementCount); // 子要素数
    // console.log(todos1.children); // なぜ<p>が表示される？
  };
};
// export default List;

function countNone() {
  if (content1.classList.contains('active')) {
    new List(1); // Todos | (2/3) + color + nothing
    new List(2); // Stocks
  } else {
    new List(2); // Stocks
  }
  // <i> color
  if (document.querySelectorAll(`#todos1 > li > .done`).length === 0) {
    save.classList.remove('i1');
    purge.classList.remove('i2');
    update.classList.remove('i3');
  } else {
    save.classList.add('i1');
    purge.classList.add('i2');
    update.classList.add('i3');
  }
  if (document.querySelectorAll(`#todos2 > li:not(.filtered)`).length === 0) {
    sort.classList.remove('i3');
    index.classList.remove('i4');
  } else {
    sort.classList.add('i3');
    index.classList.add('i4');
  }
}

countNone();


// 取り消し線 <label>
strikeDone(1);
strikeDone(2);
function strikeDone(i) {
  document.getElementById(`todos${i}`).addEventListener('click', e => {
    if (e.target.nodeName === 'INPUT') {
      // console.log(e.target); // input
      e.target.nextElementSibling.classList.toggle('done');
    }
    countNone();
  });
}

// 削除 <li>
todos2.addEventListener('click', e => {
  if (e.target.classList.contains('fa-trash-alt')) {
    e.target.parentElement.remove();
    countNone();
    // h3色
    title1.classList.remove('i9');
    title2.classList.remove('i9');
    // ########## ストレージ削除 ###########
    const task = e.target.parentElement.textContent.trim();
    // console.log(task);
    deleteLocalStorage(task);
  }
});

  // ★[Stock] ボタン
  save.addEventListener('click', e => {
    document.querySelectorAll('#todos1 > li > .done').forEach(list => {
      // console.log(list); // <label>
      // console.log(list.parentElement); // <li>
      new Todolist(list.textContent); // Todo
      list.parentElement.remove();
      title1.classList.remove('i5');
      title2.classList.add('i5');
      // ########## 追加 ###########
      // saveLocalStorage(e, li); // todo, html // keyが不明？？？
    });
    countNone();
  });

  // li要素生成
  class Todolist {
    constructor(task, day) {
      this.createList(task.trim());
      this.getId();
      // h3色
      title1.classList.remove('i9');
      title2.classList.add('i9');
    }
    createList(e, day) {
      const li = `<li><input type="checkbox" id="${this.getId()}"><label for="${this.getId()}">${e}</label><i class="delete fas fa-trash-alt"></i></li>`;
      todos2.innerHTML += li;

      // console.log(todos2.childNodes); // [li, li, li,...]
      // ########## 追加 ###########
      saveLocalStorage(e, li); // todo, html
    };
    // ユニークid生成: 現在時刻-乱数 36進数
    getId() {
      return new Date().getTime().toString(36);
      // return new Date().getTime().toString(36) + '-' + Math.random().toString(36);
    };
  }
  // addform 入力
  addform.addEventListener('submit', e => {
    e.preventDefault();
    const task = escape(addinput.value).trim(); // エスケープ機能
    if (task) { // 値があれば追加
      new Todolist(task); // Todo
    }
    addinput.value = ''; // 空にする。←taskは反応なし。。？
    countNone();
  });
  // checkbox 選択
  document.getElementById('checkform').addEventListener('submit', e => {
    e.preventDefault();
    const checkform = document.querySelectorAll('#checkform > input');
    const box = []; // 配列（複数選択可）
    checkform.forEach(e => {
      if (e.checked === true) {
        box.push(e.value); // 配列に入れる
      }
    });
    if (box.length) { // 配列要素をリスト化
      new Todolist(box.join('、'));
      checkform.forEach(e => {
        e.checked = false; // check外す
      });
    }
    countNone();
  });

  // フィルタ（見かけ上は削除）: 入力値（空, 大文字問わず）
  searchform.addEventListener('keyup', e => {
    e.preventDefault();
    const task = searchform.children[0].value.trim().toLowerCase(); // input.value
    filterTask(task);
    countNone();
  });
  function filterTask(task) {
    // フィルタリング
    Array.from(todos1.children)
      .filter((li) => !li.textContent.toLowerCase().includes(task))
      .forEach((li) => li.classList.add('filtered'));
    // 元に戻す
    Array.from(todos1.children)
      .filter((li) => li.textContent.toLowerCase().includes(task))
      .forEach((li) => li.classList.remove('filtered'));
  };

  // [sort] ボタン
  sort.addEventListener('click', () => {
    let li = document.querySelectorAll('#todos2 > li');
    // 配列を得る
    let array = Array.prototype.slice.call(li);
    // console.log(array);
    // 配列をソート
    array.sort(function (a, b) {
      // console.log(a);
      if (a.textContent > b.textContent)
        return 1;
      else if (a.textContent < b.textContent)
        return -1;
      return 0;
    });
    // 新しい順番を DOM ツリーに反映
    for (let i = 0; i < array.length; i++) {
      todos2.appendChild(array[i]);
    }
  });
  // [Reverse] ボタン
  index.addEventListener('click', () => {
    document.querySelectorAll('#todos2 > li > label').forEach((list, index) => {
      list.textContent = `${index + 1}番目です`;
    });
    let li = document.querySelectorAll('#todos2 > li');
    let array = Array.prototype.slice.call(li);
    array.reverse();
    for (let i = 0; i < array.length; i++) {
      todos2.appendChild(array[i]);
    }
  });

// }
