'use strict'; // Todoリスト ドラッグ&ドロップ

{
  new Sortable(todos1, {
    animation: 150,
    chosenClass: 'light-green', // 選択中
    ghostClass: 'ghost', // ドラッグ中
    delay: 100,
    // scroll: true,

    // ########## ストレージ ###########
    group: "save",
    // store: {
    //   get: function (sortable) {
    //     let order = localStorage.getItem(sortable.options.group.name);
    //     return order ? order.split('|') : [];
    //   },
    //   set: function (sortable) {
    //     let order = sortable.toArray(); // ["kzt"|"djb"|"ein"]
    //     console.log(order); // 毎回変わる
    //     localStorage.setItem(sortable.options.group.name, order.join('|'));
    //   }
    // }
  });

  new Sortable(todos2, {
    animation: 150,
    chosenClass: 'light-green', // 選択中
    ghostClass: 'ghost', // ドラッグ中
    delay: 100,
    scroll: true,

    // ########## ストレージ ###########
    group: "save",
    // store: {
    //   get: function (sortable) {
    //     let order = localStorage.getItem(sortable.options.group.name);
    //     console.log(order); // 文字列 ["kzt"|"djb"|"ein"|...] 要素数分
    //     return order ? order.split('|') : [];
    //   },
    //   set: function (sortable) {
    //     let order = sortable.toArray(); // こちらは配列
    //     localStorage.setItem(sortable.options.group.name, order.join('|'));
    //   }
    // }
  });

}
