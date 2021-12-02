(() => {
  'use strict'; // リスト保存用
  // import purge from "./todos_stocks"; // npmない為うまく行かない

  // collection作成
  const collection = db.collection('messages');
  // 認証用のインスタンス
  const auth = firebase.auth();
  // #15 ユーザーID
  let me = null;

  // 曜日
  const cost = document.getElementById('pcost'); // <select>
  // console.log(days[new Date ().getDay()]); // 曜日
  for (let j = 1; j <= 7; j++) {
    let option = document.createElement("option");
    option.innerText = j + 'day'; // テキスト
    option.value = (new Date().getDay() + j) % 7; // ★曜日を数値化
    cost.appendChild(option);
  }

  // ログアウト時は非表示
  const hiddens = [
    messageform,
    cost, // <select>
    todos1, // <ul>
    logout,
    // save, purge, // <i>
  ];
  hiddens.forEach(el => {
    el.classList.add('hidden');
  });

  // #13 ログイン権限
  login.addEventListener('click', () => {
    auth.signInAnonymously();
  });
  logout.addEventListener('click', () => {
    auth.signOut();
  });
  // ログインした時
  auth.onAuthStateChanged(user => {
    if (user) { // ユーザーIDがあれば
      // ログイン状態
      me = user;
      while (todos1.firstChild) {
        todos1.removeChild(todos1.firstChild);
      }
      // #7 firebase格納データを表示（→ #11 onSnapshot: リアルタイムに表示）
      collection.orderBy('created').onSnapshot(snapshot => {
        console.log('dd'); // なぜ2回出る？？
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') { // データ追加された時、
            // const li = document.createElement('li');
            const d = change.doc.data(); // Field配列
            // li.textContent = d.uid.substr(0, 5) + ': ' + d.message; // 設定
            const li = `<li><input type="checkbox" id="${change.doc.id}"><label for="${change.doc.id}">${me.uid.substr(0, 3)}: ${d.message}</label><span>→${d.day}</span></li>`;
            // todos1.appendChild(li); // ※ブラウザに表示
            todos1.innerHTML += li;
          }
        });
        // (2/3) + color + Nothingクラス 置き場所が難しい。。
        new List(1);
      }, error => { }); // #17 書き込み権限エラー防止
      // ログイン状態
      console.log(`Logged in as: ${user.uid}`);
      login.classList.add('hidden');
      hiddens.forEach(el => {
        el.classList.remove('hidden');
      });
      minput.focus();
      return;
    }
    // ログアウト状態
    me = null;
    console.log('Logged out');
    login.classList.remove('hidden');
    hiddens.forEach(el => {
      el.classList.add('hidden');
    });
    // (2/3)削除
    document.querySelectorAll('.tab > li')[0].children[1].textContent = '';
  });

  // new List(1);
  const days = ["日", "月", "火", "水", "木", "金", "土"];

  // #6 追加
  messageform.addEventListener('submit', e => {
    e.preventDefault();
    // 入力値
    const val = escape(minput.value).trim();
    if (!val) {
      return;
    }
    minput.value = '';
    // h3色
    title1.classList.add('i9');
    title2.classList.remove('i9');

    // #5 フィールドデータ保存 + ユニークid自動生成
    collection.add({
      message: val, // 入力値
      created: firebase.firestore.FieldValue.serverTimestamp(), // 投稿日時
      uid: me ? me.uid : 'none', // nullの時はnone
      day: days[cost.value], // 期限
    })
      .then(doc => { // 成功時
        // console.log(`${doc.id} added`);
      })
      .catch(error => { // 書き込めなかった時
        console.log(error);
      });
    console.log('add'); // 1回
  });

  // ★削除
  const purge = document.querySelector('.fa-trash-alt');
  purge.addEventListener('click', () => {
    document.querySelectorAll(`#todos1 > li > .done`).forEach(list => {
      title1.classList.remove('i9');
      title2.classList.remove('i9');
      // ########## 見かけ上 削除 ###########
      list.parentElement.remove();
      // ########## firestore 削除 ###########
      collection.where('message', '==', list.textContent.substr(5)).get().then(snap => {
        console.log('a')
        snap.forEach(doc => {
          console.log('i')
          collection.doc(doc.id).delete();
        })
      })
        .then(function () {
          console.log(list.textContent, "delete!");
        })
        .catch(function (error) {
          console.error(error);
        });
    });
    countNone();
  });

  // ★更新
  const update = document.querySelector('.fa-pen-alt');
  update.addEventListener('click', () => {
    document.querySelectorAll(`#todos1 > li > .done`).forEach(list => {
      // ########## 見かけ上 更新 ###########
      const val = escape(minput.value).trim();
      list.textContent = me.uid.substr(0, 3) + ': ' + val;
      // ########## firestore 更新 ###########
      if (!val) {
        return;
      }
      title1.classList.add('i9');
      minput.value = '';
      collection.where('message', '==', list.textContent.substr(5)).get().then(snap => {
        console.log(list.textContent.substr(5));
        snap.forEach(doc => { // ここが反応しないのはなぜ？？？
          console.log('update');
          console.log(doc.id);
          // collection.doc(doc.id).update({
          //   "message": val, // 入力値
          //   "created": firebase.firestore.FieldValue.serverTimestamp(), // 投稿日時
          //   "uid": me ? me.uid : 'none', // nullの時はnone
          //   "day": days[cost.value], // 期限
          // });
        })
      })
    });
  });

})();
